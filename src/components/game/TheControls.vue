<template>
  <div class="row align-items-center">
    <div class="col">
      <button @click="rotateLeft()" class="btn btn-lg btn-outline-dark rounded-circle" :disabled="!activeUser"><i class='fas fa-undo'></i></button>
    </div>

    <div style="height: 100px;" class="col">

      <div v-if="freshCard != null" class="cardPlaceholder">
        <img class="cardImage rotate"
             :src="'http://' + connection.url.substr(5, 14) + freshCard.src" :key="'http://' + connection.url.substr(5, 14) + freshCard.src" :style="rotationFreshCard"
             style='pointer-events: none; border-radius: 5px;' />
        <transition-group name="fade">
          <div :key="'freshCard'" v-if="freshCard.manicansShow">
            <div :key="'freshCard' + manican.dir" v-for="manican in freshCard.manicans">
              <input type="image" :disabled="manican.disabled || !activeUser" @click="selectManican(manican.dir)" :class="manican.dir" :src="'http://' + connection.url.substr(5, 14) + manican.path">
            </div>
          </div>
        </transition-group>
      </div>

    </div>

    <div class="col">
      <button @click="rotateRight" class="btn btn-lg btn-outline-dark rounded-circle" :disabled="!activeUser"><i
          class='fas fa-redo'></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheControls',
  props: {
    freshCard: {
      src: String,
      rotation: Number,
      manicans: [
        {
          dir: String,
          path: String,
          disabled: Boolean,
        }
      ],
      manicansShow: Boolean
    },
    activeUser: Boolean,
    connection: WebSocket,
  },
  methods: {
    selectManican(dir) {
      this.connection.send(JSON.stringify({"manican": dir}))
    },
    rotateRight() {
      this.freshCard.manicansShow = false;
      this.connection.send(JSON.stringify({"rotate": "Right"}));
    },
    rotateLeft() {
      console.log("legtz")
      this.freshCard.manicansShow = false;
      this.connection.send(JSON.stringify({"rotate": "Left"}))
    }
  },
  computed: {
    rotationFreshCard() {
      return {
        transform: 'rotate(' + this.freshCard.rotation + 'deg)',
        transition: 'all 0.2s'
      }
    },
  }
}
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