<template>
  <div id="app" class="bg-brown vh-100">
    <v-app>
      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fill-height fluid class="bg-brown">
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app dark padless>
        <v-card flat tile width="100%" class="black lighten-1 white--text text-center fluid">
          <v-card-text class="white--text">
            @ {{ new Date().getFullYear() }} — <strong>Lukas Kaluscha & Nail Özmen</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<style>
.bg-brown {
  background-color: rgb(139, 69, 19);
}

.center-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
