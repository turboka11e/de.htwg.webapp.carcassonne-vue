<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light bg-gradient border-bottom justify-content-end shadow-lg">
    <div class="container-sm">
      <a class="mx-2 navbar-brand flex-grow-1" href="#">
        <img src="../../public/images/Logo-Carcassonne_IMGP.png" alt="" width="40" height="40">
        <img src="../../public/images/CarcassonneText_IMGP.png" alt="" width="168" height="30">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <ul class="navbar-nav text-right">
          <li class="nav-item">
            <a class="mx-2 nav-link disabled" aria-disabled="true">{{ username }}</a>
          </li>
          <!--            <li class="nav-item">
                        <a class="mx-2 nav-link" href="/rules">Regeln</a>
                      </li>-->
        </ul>
      </div>
<!--      <a class="mx-2 btn btn-outline-success ml-auto mr-1" href="/hardNewGame">Neues Spiel</a>-->
      <div class="dropdown">
        <button :class="websocketStateColor" class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
          {{ websocketState }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a v-on:click="$parent.newWebsocket" class="dropdown-item" href="#">Refresh</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNav',
  props: [
    "username",
  ],
  computed: {
    websocketState() {
      switch (this.$parent.readyState) {
        case 0:
          return "CONNECTING"
        case 1:
          return "OPEN"
        case 2:
          return "CLOSING"
        case 3:
          return "CLOSED"
      }
      return ""
    },
    websocketStateColor() {
      switch (this.$parent.readyState) {
        case 0:
          return "bg-success"
        case 1:
          return "bg-success"
        case 2:
          return "bg-danger"
        case 3:
          return "bg-danger"
      }
      return ""
    },
  },
}
</script>