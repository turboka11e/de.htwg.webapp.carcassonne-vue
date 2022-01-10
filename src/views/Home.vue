<template>
  <v-container>
    <div class="home">
      <the-nav-drawer></the-nav-drawer>
      <the-nav :connection="connection" :username="username"></the-nav>

      <v-container v-if="readyState === 1 && !showRules">
        <the-game
          v-if="lobby.gameStarted"
          :connection="connection"
          :grid="grid"
          :fresh-card="freshCard"
          :players="players"
          :game-over="gameOver"
          :active-user="activeUser"
        ></the-game>
        <the-lobby
          v-else
          :lobby="lobby"
          :connection="connection"
          :username="username"
        ></the-lobby>

        <the-chat
          :chat="chat"
          :connection="connection"
          :username="username"
        ></the-chat>
      </v-container>
      <the-rules v-else-if="showRules"></the-rules>
      <v-container v-else>
        <v-row justify="center" align="center">
          <v-col class="d-flex justify-center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="white"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import TheChat from "@/components/TheChat";
import TheNav from "@/components/TheNav";
import TheGame from "@/components/TheGame";
import TheLobby from "@/components/TheLobby";
import TheRules from "@/components/TheRules";
import TheNavDrawer from "@/components/TheNavDrawer";

export default {
  name: "home",
  data() {
    return {
      showRules: false,
      drawer: true,
      mini: true,
      username: "",
      connection: new WebSocket(
        "wss://" + process.env.VUE_APP_SERVER_URL + "/websocket"
      ),
      grid: [],
      freshCard: null,
      players: [],
      chat: [],
      readyState: 3,
      gameOver: false,
      activeUser: false,
      usernameIsNotSet: true,
      lobby: {
        inhabitants: [],
        gamefieldsize: 6,
        gameStarted: false,
        joined: false,
      },
      user: null,
    };
  },
  methods: {
    logout: function () {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.replace("login");
      });
    },
    newWebsocket() {
      if (this.connection.readyState === WebSocket.CLOSED) {
        console.log("Websocket reconnecting...");
        this.connection = new WebSocket(
          "wss://" + process.env.VUE_APP_SERVER_URL + "/websocket"
        );
      }
      this.connection.onopen = () => {
        this.readyState = this.connection.readyState;
        // console.log("Connected to Websocket");
        let msg = {
          loadLobby: "success",
        };
        this.connection.send(JSON.stringify(msg));
      };
      this.connection.onclose = () => {
        this.readyState = this.connection.readyState;
        // console.log("Connection with Websocket Closed!");
        setTimeout(() => {
          this.newWebsocket()
        }, 1000);
      };

      this.connection.onerror = (error) => {
        this.readyState = this.connection.readyState;
        console.error("Error in Websocket Occured: " + error);
        this.newWebsocket();
      };

      this.connection.onmessage = (e) => {
        this.readyState = this.connection.readyState;
        if (typeof e.data === "string") {
          let json = JSON.parse(e.data);

          for (let [key, value] of Object.entries(json)) {
            // console.log(`Received ${key}: ${value}`);
            if (key === "username") {
              //this.username = value;
            }
            if (key === "stats") {
              this.players = value.players;
            }
            if (key === "freshCard") {
              this.freshCard = value;
            }
            if (key === "grid") {
              this.grid = value;
            }
            if (key === "gameOver") {
              this.gameOver = true;
            }
            if (key === "chat") {
              this.chat = value;
            }
            if (key === "activeUser") {
              this.activeUser = this.username === value;
            }
            if (key === "lobby") {
              this.lobby = value;
              if (!this.lobby.inhabitants.includes(this.username)) {
                this.username = "";
                this.usernameIsNotSet = true;
              }
            }
            if (key === "joinGame") {
              this.lobby.gameStarted = true;
              this.connection.send(
                JSON.stringify({ loadAll: "load all requested" })
              );
            }
          }
        }
      };
    },
  },
  created() {
    this.newWebsocket();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.$router.replace("login");
      }
    });
  },
  components: {
    TheLobby,
    TheGame,
    TheNav,
    TheChat,
    TheRules,
    TheNavDrawer,
  },
};
</script>
