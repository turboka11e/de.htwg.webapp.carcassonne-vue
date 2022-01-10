<template>
  <v-container fill-height fluid class="align-content-center h-50">
    <v-row class="justify-content-center">
      <v-col :key="inhabitant" v-for="(inhabitant, index) in lobby.inhabitants">
        <v-card
          class="mx-auto"
          max-width="200"
          elevation="24"
          :color="cardColor(inhabitant)"
        >
          <v-img contain width="200" :src="getPicture(index)"></v-img>
          <v-card-title>
            {{ inhabitant }}
            <v-btn
              v-if="inhabitant !== $parent.username"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
              @click="leaveLobby(inhabitant)"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-content-center">
      <v-col cols="auto">
        <v-btn
          @click="startGame"
          :disabled="this.lobby.inhabitants.length < 1"
          class="mx-2"
          fab
          dark
          large
        >
          Start game
        </v-btn>
      </v-col>
      <v-col data-app cols="auto" v-if="lobby.inhabitants.length < 4">
        <v-dialog v-model="dialog" max-width="290" v-if="this.$parent.usernameIsNotSet">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark large v-bind="attrs" v-on="on">
              Beitreten
            </v-btn>
          </template>

          <v-card>
            <v-img
              height="250"
              :src="getPicture(this.lobby.inhabitants.length)"
            ></v-img>

            <v-card-title class="text-h5"> Lobby beitreten </v-card-title>

            <v-card-text>
              <v-text-field
                autofocus
                label="Wähle deinen Namen"
                v-model="$parent.username"
                @keyup.enter="joinLobby"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn color="green darken-1" text @click.stop="joinLobby">
                Beitreten
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          v-if="this.$parent.username !== ''"
          class="mx-2"
          fab
          dark
          large
          @click="leaveLobby($parent.username)"
        >
          Verlassen
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TheLobby",
  data() {
    return {
      dialog: false,
    };
  },
  props: ["lobby", "connection"],
  methods: {
    cardColor(name) {
      if (name === this.$parent.username) {
        return "#385F73";
      } else {
        return "#ffffff";
      }
    },
    getPicture(index) {
      switch (index) {
        case 0:
          return require("../../public/images/characters/0.jpg");
        case 1:
          return require("../../public/images/characters/1.jpg");
        case 2:
          return require("../../public/images/characters/2.jpg");
        case 3:
          return require("../../public/images/characters/3.jpg");
      }
      return "";
    },
    leaveLobby(name) {
      (this.usernameIsNotSet = true),
        (this.lobby.inhabitants = this.lobby.inhabitants.filter(
          (item) => item !== name
        ));
      let msg = {
        updateLobby: this.lobby,
      };
      if (name === this.$parent.username) {
        this.$parent.username = "";
      }
      this.connection.send(JSON.stringify(msg));
    },
    joinLobby() {
      if (this.$parent.username === "") {
        return;
      }
      (this.$parent.usernameIsNotSet = false), (this.dialog = false);
      this.lobby.inhabitants.push(this.$parent.username);
      let msg = {
        updateLobby: this.lobby,
      };
      this.connection.send(JSON.stringify(msg));
    },
    startGame() {
      this.lobby.gameStarted = true;
      let msg = {
        updateLobby: this.lobby,
      };
      this.connection.send(JSON.stringify(msg));
      let startGame = {
        newGame: {
          players: this.lobby.inhabitants,
          gamesize: this.lobby.gamefieldsize,
        },
      };
      this.connection.send(JSON.stringify(startGame));
    },
  },
  created() {
    if (this.$parent.username !== "") {
      this.usernameIsNotSet = false;
    }
  },
};
</script>