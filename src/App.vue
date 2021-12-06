<template>
  <div id="app" class="bg-brown vh-100">
    <the-nav></the-nav>

    <div class="my-5 container-sm">
      <div class="row justify-content-center align-items-center">
        <div class="mb-2 col-md-auto">
          <the-grid :grid="grid" :active-user="activeUser" :connection="connection"></the-grid>
        </div>

        <div class=col-md-auto>

          <div class="card shadow-lg" style="width: 18rem;">
            <div class="card-header">
              <h3 class="fst-italic fw-bold">Spielerinfos</h3>
            </div>
            <the-player-stats :players="players"></the-player-stats>
            <div class="card-body">
              <the-controls :fresh-card="freshCard" :active-user="activeUser" :connection="connection"></the-controls>
            </div>
          </div>
        </div>
        <div class="row justify-content-center align-items-center">
          <the-chat :chat="chat" :connection="connection"></the-chat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TheGrid from "@/components/TheGrid";
import TheControls from "@/components/TheControls";
import ThePlayerStats from "@/components/ThePlayerStats";
import TheChat from "@/components/TheChat";
import TheNav from "@/components/TheNav";

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
          "connect": "success"
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
              this.username = value;
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
              this.activeUser = value;
            }
          }
        }
      };
    },
  },
  components: {
    TheNav,
    TheGrid,
    TheControls,
    ThePlayerStats,
    TheChat,
  },
  created() {
    this.newWebsocket()
  }
}
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

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

.cardPlaceholder {
  position: relative;
  top: 0;
  left: 0;
}

.cardImage {
  position: relative;
  top: 0;
  left: 0;
  border-radius: 5px;
}

.north {
  position: absolute;
  top: 1px;
  left: 27px;
}

.east {
  position: absolute;
  top: 25px;
  left: 54px;
}

.south {
  position: absolute;
  top: 54px;
  left: 27px;
}

.west {
  position: absolute;
  top: 25px;
  left: 1px;
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
