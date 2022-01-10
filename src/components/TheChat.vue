<template>
  <v-container fixed color="#033">
    <v-row justify="center" align="center">
      <v-card width="60%" class="mb-3" elevation="2" shaped dark>
        <v-card-title>Chat</v-card-title>
        <v-card-text>
          <v-scroll-y-reverse-transition>
            <v-list
              outlined
              dense
              style="height: 100px"
              class="overflow-y-auto"
            >
              <v-list-item v-for="item in chat" :key="item.timestamp">
                <v-list-item-content>
                  <v-list-item-title color="yellow"
                    >{{ item.username }} {{ item.timestamp }}</v-list-item-title
                  >
                  {{ item.msg }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-scroll-y-reverse-transition>

          <!-- <div class="overflow-auto" style="height: 6rem">
              <ul class="list-group list-group-flush">
                <li
                  v-for="item in chat"
                  :key="item.timestamp"
                  style="list-style-type: none"
                  class="list-group-item"
                >
                  <span class="badge bg-info"
                    ></span
                  >
                  
                </li>
              </ul>
            </div> -->
          <hr />
          <div class="row">
            <div class="col-10">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-on:keyup.enter="sendMessage"
                  v-model="message"
                />
              </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
              <v-btn color="primary" @click="sendMessage">Send</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TheChat",
  data: function () {
    return {
      message: "",
    };
  },
  props: ["chat", "connection", "username"],
  methods: {
    sendMessage() {
      if (!(this.message.trim() === "")) {
        this.connection.send(
          JSON.stringify({
            chat: {
              username: this.username,
              msg: this.message,
              timestamp: new Date().toLocaleTimeString("en-US", {
                hour12: false,
              }),
            },
          })
        );
        this.message = "";
      }
    },
  },
};
</script>

<style>
.bg-brown {
  background-color: rgb(131, 61, 11);
}
</style>