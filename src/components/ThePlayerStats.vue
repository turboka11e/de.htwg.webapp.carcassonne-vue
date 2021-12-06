<template>
  <ul class="list-group list-group-flush">
    <div :key="player.color" v-for="player in players">
      <li :style="{color: player.color}" class="list-group-item fw-bold">
        {{player.player}} <span v-if="player.isOn" class="badge bg-success">Am Zug</span>
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'ThePlayerStats',
  // props: {
  //     players: [
  //       {
  //         player: String,
  //         color: String,
  //         isOn: Boolean,
  //       }
  //     ]
  // }
  props: [
      "players"
  ]
}
</script>