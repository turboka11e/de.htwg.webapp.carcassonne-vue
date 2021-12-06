<template>
  <table>
    <tbody>
    <template v-for="(rows, index) in grid.rows">
      <tr :key="'row' + index">
        <template v-for="(col, index) in rows.cols">
          <td :key="'col' + index">
            <div :key="col.col + col.row" style="height: 80px; width: 80px;">
              <input v-if="col.empty" type="image" v-on:click="placeCard(col.row, col.col)" :disabled="!activeUser"
                     :src="'http://' + connection.url.substr(5, 14) + col.src">
              <div v-else class="cardPlaceholder">
                <img style="pointer-events: none;" class="cardImage" :src="'http://' + connection.url.substr(5, 14) + col.src"
                     :style="{ transform: 'rotate(' + col.rotation + 'deg)'}">
                <template v-for="manican in col.manicans">
                  <img style="pointer-events: none" :key="'grid' + manican.dir" :class="manican.dir" :src="'http://' + connection.url.substr(5, 14) + manican.src">
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
        "refresh": {
          "row": row,
          "col": col,
        }
      };
      this.connection.send(JSON.stringify(request));
    },
  }
}
</script>