<template>
  <div class="col-6">
    <div class="card shadow-lg">
      <div class="card-header">
        <h3 class="fst-italic fw-bold">Chat</h3>
      </div>

      <div class="card-body">
        <div class="row justify-content-center align-items-center">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheChat',
  data: function() {
    return {
      message: "",
    }
  },
  // props: {
  //   chat: [{
  //     username: String,
  //     msg: String,
  //     timestamp: String,
  //   }],
  //   connection: WebSocket
  // },
  props: [
      'chat',
      'connection'
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