<template>
  <div class="my-5 container-sm">
    <div class="row justify-content-center align-items-center">
      <div class="mb-2 col-md-auto">
        <the-grid
          :grid="grid"
          :active-user="activeUser"
          :connection="connection"
        ></the-grid>
      </div>

      <div class="col-md-auto">
        <v-card style="width: 18rem">
          <v-card-title> Spielerinfos </v-card-title>

          <the-player-stats :players="players"></the-player-stats>
          <the-controls
            :fresh-card="freshCard"
            :active-user="activeUser"
            :connection="connection"
          ></the-controls>
        </v-card>

        <div
          v-if="this.gameOver"
          class="modal fade show"
          tabindex="-1"
          style="display: block"
          aria-model="true"
          role="dialog"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Game Over!</h5>
              </div>
              <div class="modal-body">
                <p>Spiel ist vorbei.</p>
              </div>
              <div class="modal-footer">
                <v-btn @click="endGame"> Beenden </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheGrid from "@/components/game/TheGrid";
import TheControls from "@/components/game/TheControls";
import ThePlayerStats from "@/components/game/ThePlayerStats";

export default {
  name: "TheGame",
  props: [
    "connection",
    "grid",
    "freshCard",
    "players",
    "gameOver",
    "activeUser",
  ],
  methods: {
    endGame() {
      this.$parent.showRules = false;
      let lobby = this.$parent.lobby;
      lobby.gameStarted = false;
      let msg = {
        updateLobby: lobby,
      };
      this.connection.send(JSON.stringify(msg));
    }
  },
  components: {
    TheGrid,
    TheControls,
    ThePlayerStats,
  },
};
</script>