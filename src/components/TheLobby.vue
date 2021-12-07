<template>
  <v-container>
    <v-row>
      <v-col :key="inhabitant" v-for="(inhabitant, index) in lobby.inhabitants">
        <v-card
            class="mx-auto"
            max-width="200"
            outlined
        >
          <v-img
              contain
              width="200"
              :src="getPicture(index)"
          ></v-img>
          <v-card-title>{{ inhabitant }}</v-card-title>

          <v-card-actions v-if="inhabitant === $parent.username">
            <v-btn
                @click="leaveLobby(inhabitant)"
                outlined
                rounded
                text
            >
              Lobby verlassen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>


    </v-row>
    <v-row class="d-flex justify-content-center">
      <v-col cols="auto">
        <v-btn
            @click="startGame"
            class="mx-2"
            fab
            dark
            large
            color="purple"
        >
          Start game
        </v-btn>
      </v-col>
      <v-col data-app cols="auto" v-if="lobby.inhabitants.length < 4">
        <v-btn
            v-if="this.$parent.username === ''"
            class="mx-2"
            fab
            dark
            large
            color="purple"
            @click.stop="dialog = true"
        >
          Beitreten
        </v-btn>
          <v-dialog
              v-model="dialog"
              max-width="290"
          >
            <v-card>
              <v-img
                  height="250"
                  :src="getPicture(this.lobby.inhabitants.length)"
              ></v-img>

              <v-card-title class="text-h5">
                Lobby beitreten
              </v-card-title>

              <v-card-text>
                <v-text-field
                    autofocus
                    label="Wähle deinen Namen"
                    v-model="$parent.username"
                    @keyup.enter="joinLobby"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                    color="green darken-1"
                    text
                    @click.stop="joinLobby"
                >
                  Beitreten
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
export default {
  name: 'TheLobby',
  data() {
    return {
      dialog: false
    }
  },
  props: [
    'lobby',
    'connection',
  ],
  methods: {
    getPicture(index) {
      console.log(index)
      switch (index) {
        case 0: return require("../../public/images/characters/0.jpg");
        case 1: return require("../../public/images/characters/1.jpg");
        case 2: return require("../../public/images/characters/2.jpg");
        case 3: return require("../../public/images/characters/3.jpg");
      }
      return ""
    },
    leaveLobby(name) {
      this.$parent.username = '';
      this.lobby.inhabitants = this.lobby.inhabitants.filter((item) => item !== name)
      let msg = {
        "updateLobby": this.lobby
      }
      console.log(msg)
      this.connection.send(JSON.stringify(msg));
    },
    joinLobby() {
      if(this.$parent.username === '') {
        return;
      }
      this.dialog = false
      this.lobby.inhabitants.push(this.$parent.username)
      let msg = {
        "updateLobby": this.lobby
      }
      console.log(msg)
      this.connection.send(JSON.stringify(msg));
    },
    startGame() {
      this.lobby.gameStarted = true
      let msg = {
        "updateLobby": this.lobby
      }
      this.connection.send(JSON.stringify(msg));
      let startGame = {
        "newGame": {
          players: this.lobby.inhabitants,
          gamesize: this.lobby.gamefieldsize,
        }
      };
      this.connection.send(JSON.stringify(startGame));
    }
  }
}

</script>