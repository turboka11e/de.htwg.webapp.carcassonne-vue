<template>
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
    "activeUser"
  ],
  components: {
    TheGrid,
    TheControls,
    ThePlayerStats,
  }
}
</script>