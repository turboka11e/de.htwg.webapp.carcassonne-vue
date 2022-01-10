<template>
  <v-row align-content="center" align="center" justify="center">
    <v-btn
      outlined
      icon
      color="black"
      @click="rotateLeft()"
      :disabled="!activeUser"
      x-large
      elevation="2"
    >
      <v-icon>mdi-rotate-left</v-icon>
    </v-btn>

    <div style="height: 100px; max-width: 100px" class="col">
      <div v-if="freshCard != null" class="cardPlaceholder">
        <img
          class="cardImage rotate"
          :src="'http://' + server_url + freshCard.src"
          :key="'https://' + server_url + freshCard.src"
          :style="rotationFreshCard"
          style="pointer-events: none; border-radius: 5px"
        />
        <transition-group name="fade">
          <div :key="'freshCard'" v-if="freshCard.manicansShow">
            <div
              :key="'freshCard' + manican.dir"
              v-for="manican in freshCard.manicans"
            >
              <input
                type="image"
                :disabled="manican.disabled || !activeUser"
                @click="selectManican(manican.dir)"
                :class="manican.dir"
                :src="'https://' + server_url + manican.path"
              />
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <v-btn
      outlined
      icon
      color="black"
      @click="rotateRight"
      :disabled="!activeUser"
      x-large
      elevation="2"
    >
      <v-icon>mdi-rotate-right</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: "TheControls",
  data() {
    return {
      server_url: process.env.VUE_APP_SERVER_URL,
    };
  },
  props: {
    freshCard: {
      src: String,
      rotation: Number,
      manicans: [
        {
          dir: String,
          path: String,
          disabled: Boolean,
        },
      ],
      manicansShow: Boolean,
    },
    activeUser: Boolean,
    connection: WebSocket,
  },
  methods: {
    selectManican(dir) {
      this.connection.send(JSON.stringify({ manican: dir }));
    },
    rotateRight() {
      this.freshCard.manicansShow = false;
      this.connection.send(JSON.stringify({ rotate: "Right" }));
    },
    rotateLeft() {
      this.freshCard.manicansShow = false;
      this.connection.send(JSON.stringify({ rotate: "Left" }));
    },
  },
  computed: {
    rotationFreshCard() {
      return {
        transform: "rotate(" + this.freshCard.rotation + "deg)",
        transition: "all 0.2s",
      };
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>