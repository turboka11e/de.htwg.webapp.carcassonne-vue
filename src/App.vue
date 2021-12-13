<template>
  <div id="app" class="bg-brown vh-100">
    <the-nav :connection="connection" :username="username"></the-nav>

    <v-container v-if="readyState === 1">
      <the-game v-if="lobby.gameStarted" :connection="connection" :grid="grid" :fresh-card="freshCard" :players="players"
                :game-over="gameOver" :active-user="activeUser"></the-game>
      <the-lobby v-else :lobby="lobby" :connection="connection" :username="username"></the-lobby>

      <the-chat :chat="chat" :connection="connection" :username="username"></the-chat>
    </v-container>

    <the-rules></the-rules>
  </div>
</template>

<script>

import TheChat from "@/components/lobby/TheChat";
import TheNav from "@/components/TheNav";
import TheGame from "@/components/TheGame";
import TheLobby from "@/components/TheLobby";
import TheRules from "@/components/TheRules";

export default {
  name: 'App',
  data() {
    return {
      username: "",
      connection: new WebSocket("ws://" + location.hostname + ":9000/websocket"),
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
        joined: false
      },
    }
  },
  methods: {
    newWebsocket() {
      console.log("Connecting to WebSocket...");
      if (this.connection.readyState === WebSocket.CLOSED) {
        this.connection = new WebSocket("ws://" + location.hostname + ":9000/websocket");
      }
      this.connection.onopen = () => {
        this.readyState = this.connection.readyState
        console.log("Connected to Websocket");
        let msg = {
          "loadLobby": "success"
        }
        this.connection.send(JSON.stringify(msg));
      };
      this.connection.onclose = () => {
        this.readyState = this.connection.readyState
        console.log("Connection with Websocket Closed!");
      };

      this.connection.onerror = (error) => {
        this.readyState = this.connection.readyState
        console.log("Error in Websocket Occured: " + error);
        this.newWebsocket()
      };

      this.connection.onmessage = (e) => {
        this.readyState = this.connection.readyState
        console.log("received message " + e)

        if (typeof e.data === "string") {
          let json = JSON.parse(e.data)

          for (let [key, value] of Object.entries(json)) {
            console.log(`Received ${key}: ${value}`)
            if (key === 'username') {
              //this.username = value;
            }
            if (key === 'stats') {
              this.players = value.players;
            }
            if (key === 'freshCard') {
              this.freshCard = value
            }
            if (key === 'grid') {
              console.log(value);
              this.grid = value;
            }
            if (key === 'gameOver') {
              this.gameOver = true;
            }
            if (key === 'chat') {
              console.log(value);
              this.chat = value;
            }
            if (key === 'activeUser') {
              this.activeUser = this.username === value;
            }
            if (key === 'lobby') {
              this.lobby = value;
              if(!this.lobby.inhabitants.includes(this.username)) {
                   console.log(this.username);
                   this.username = '';
              }
            }
            if (key === 'joinGame') {
              this.lobby.gameStarted = true;
              this.connection.send(JSON.stringify({"loadAll": "load all requested"}))
            }
          }
        }
      };
    },
  },
  components: {
    TheLobby,
    TheGame,
    TheNav,
    TheChat,
    TheRules,
  },
  created() {
    this.newWebsocket()
  }
}
</script>

<style>

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.bg-brown {
  background-color: rgb(139, 69, 19);
}

.center-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
