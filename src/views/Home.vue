<template>
  <div class="home">
    <v-app-bar app>
      <v-toolbar-title>Carcassonne</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="user.photoURL" :alt="user.photoURL"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-border-outside</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Gameboard</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Rules</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <the-nav :connection="connection" :username="username"></the-nav>
    <v-container v-if="readyState === 1">
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

    <the-rules></the-rules>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import TheChat from "@/components/lobby/TheChat";
import TheNav from "@/components/TheNav";
import TheGame from "@/components/TheGame";
import TheLobby from "@/components/TheLobby";
import TheRules from "@/components/TheRules";

export default {
  name: "home",
  data() {
    return {
      username: "",
      connection: new WebSocket(
        "ws://" + process.env.VUE_APP_SERVER_URL + ":9000/websocket"
      ),
      grid: [],
      freshCard: null,
      players: [],
      chat: [],
      readyState: 3,
      gameOver: false,
      activeUser: false,
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
      console.log("Connecting to WebSocket... ");
      if (this.connection.readyState === WebSocket.CLOSED) {
        this.connection = new WebSocket(
          "ws://" +  process.env.VUE_APP_SERVER_URL + "/websocket"
        );
      }
      this.connection.onopen = () => {
        this.readyState = this.connection.readyState;
        console.log("Connected to Websocket");
        let msg = {
          loadLobby: "success",
        };
        this.connection.send(JSON.stringify(msg));
      };
      this.connection.onclose = () => {
        this.readyState = this.connection.readyState;
        console.log("Connection with Websocket Closed!");
      };

      this.connection.onerror = (error) => {
        this.readyState = this.connection.readyState;
        console.log("Error in Websocket Occured: " + error);
        this.newWebsocket();
      };

      this.connection.onmessage = (e) => {
        this.readyState = this.connection.readyState;
        console.log("received message " + e);

        if (typeof e.data === "string") {
          let json = JSON.parse(e.data);

          for (let [key, value] of Object.entries(json)) {
            console.log(`Received ${key}: ${value}`);
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
              console.log(value);
              this.grid = value;
            }
            if (key === "gameOver") {
              this.gameOver = true;
            }
            if (key === "chat") {
              console.log(value);
              this.chat = value;
            }
            if (key === "activeUser") {
              this.activeUser = this.username === value;
            }
            if (key === "lobby") {
              this.lobby = value;
              if (!this.lobby.inhabitants.includes(this.username)) {
                console.log(this.username);
                this.username = "";
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
        user.photoURL;
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
  },
};
</script>
