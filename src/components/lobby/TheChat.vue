<template>
  <v-container
      fixed
      color="#033"
  >
    <div class="container-md rounded-3">
      <div class="row justify-content-center align-items-center">
        <v-card
            flat
            tile
            width="60%"
            class="mb-3"
        >
          <v-card-title>Chat</v-card-title>
          <v-card-text>
            <div class="overflow-auto" style="height: 6rem;">
              <ul class="list-group list-group-flush">
                <li v-for="item in chat" :key="item.timestamp" style="list-style-type: none;" class="list-group-item">
                  <span class="badge bg-info">{{ item.username }} {{ item.timestamp }}</span>
                  {{ item.msg }}
                </li>
              </ul>
            </div>
            <hr>
            <div class="row">
              <div class="col-10">
                <div class="input-group">
                  <input class="form-control" type="text" v-on:keyup.enter="sendMessage" v-model="message">
                </div>
              </div>
              <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" v-on:click="sendMessage">Send</button>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'TheChat',
  data: function () {
    return {
      message: "",
    }
  },
  props: [
    'chat',
    'connection',
    'username'
  ],
  methods: {
    sendMessage() {
      if (!(this.message.trim() === '')) {
        this.connection.send(JSON.stringify({
          "chat": {
            "username": this.username,
            "msg": this.message,
            "timestamp": new Date().toLocaleTimeString('en-US', {hour12: false}),
          }
        }))
        this.message = ''
      }
    },
  },
}
</script>

<style>
.bg-brown {
  background-color: rgb(131, 61, 11);
}
</style>