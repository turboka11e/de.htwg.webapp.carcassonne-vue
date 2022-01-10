<template>
  <v-list>
    <v-list-item v-for="player in players" :key="player.color">
      <v-list-item-content :style="{ color: player.color }">
        <v-list-item-title>
          {{ player.player }}
          <span v-if="player.isOn" class="badge bg-success">Am Zug</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "ThePlayerStats",
  props: ["players"],
};
</script>