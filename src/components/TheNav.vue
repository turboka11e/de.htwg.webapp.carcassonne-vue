<template>
  <v-app-bar dark app>
    <v-toolbar-title>
      <img
        src="../../public/images/Logo-Carcassonne_IMGP.png"
        alt=""
        width="40"
        height="40"
      />
      <img
        class="invert mx-2"
        src="../../public/images/CarcassonneText_IMGP.png"
        alt=""
        width="168"
        height="30"
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn disabled text plain>{{ username }}</v-btn>

    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn white icon v-bind="attrs" v-on="on">
          <v-icon :color="websocketStateColor">mdi-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="$parent.newWebsocket">
          <v-list-item-title>Reconnect</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn :disabled="websocketState" @click="newGame" class="mx-3" color="#009688"> New Game </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheNav",
  data() {
    return {};
  },
  props: ["username", "connection"],
  methods: {
    newGame() {
      this.$parent.showRules = false;
      let lobby = this.$parent.lobby;
      lobby.gameStarted = false;
      let msg = {
        updateLobby: lobby,
      };
      this.connection.send(JSON.stringify(msg));
    },
  },
  computed: {
    websocketState() {
      switch (this.$parent.readyState) {
        case 0:
          // return "CONNECTING";
          return true;
        case 1:
          // return "OPEN";
          return false;
        case 2:
          // return "CLOSING";
          return true;
        case 3:
          // return "CLOSED";
          return true;
      }
      return "";
    },
    websocketStateColor() {
      switch (this.$parent.readyState) {
        case 0:
          return "yellow";
        case 1:
          return "green";
        case 2:
          return "red";
        case 3:
          return "red";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.invert {
  -webkit-filter: invert(1);
  filter: invert(1)
}
</style>