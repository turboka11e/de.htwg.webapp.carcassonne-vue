<template>
  <table>
    <tbody>
    <template v-for="(rows, index) in grid.rows">
      <tr :key="'row' + index">
        <template v-for="(col, index) in rows.cols">
          <td :key="'col' + index">
            <div :key="col.col + col.row" style="height: 80px; width: 80px;">
              <input v-if="col.empty" type="image" v-on:click="placeCard(col.row, col.col)" :disabled="!activeUser"
                     :src="'https://' + server_url + col.src">
              <div v-else class="cardPlaceholder">
                <img style="pointer-events: none;" class="cardImage" :src="'https://' + server_url + col.src"
                     :style="{ transform: 'rotate(' + col.rotation + 'deg)'}">
                <template v-for="manican in col.manicans">
                  <img style="pointer-events: none" :key="'grid' + manican.dir" :class="manican.dir" :src="'https://' + server_url + manican.src">
                </template>
              </div>
            </div>
          </td>
        </template>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TheGrid',
  data() {
    return {
      server_url: process.env.VUE_APP_SERVER_URL
    }
  },
  props: {
    grid: {
      rows: [{
        cols:
            [
              {
                col: Number,
                row: Number,
                src: String,
                manicans: [{
                  dir: String,
                  src: String
                }],
                empty: Boolean,
                rotation: Number
              }
            ],
      }
      ]
    },
    activeUser: Boolean,
    connection: WebSocket
  },
  methods: {
    placeCard(row, col) {
      let request = {
        "placeCard": {
          "row": row,
          "col": col,
        }
      };
      this.connection.send(JSON.stringify(request));
    },
  }
}
</script>

<style>
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