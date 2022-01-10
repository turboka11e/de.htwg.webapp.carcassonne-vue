 <template>
  <v-navigation-drawer app permanent v-model="drawer" :mini-variant.sync="mini">
    <v-list-item v-if="user !== null" class="px-2">
      <v-list-item-avatar v-if="user.photoURL !== null">
        <v-img :src="user.photoURL" :alt="user.photoURL"></v-img>
      </v-list-item-avatar>
      <v-list-item-avatar v-else>
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ user.displayName }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link @click="$parent.showRules = false">
        <v-list-item-icon>
          <v-icon>mdi-border-outside</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Gameboard</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$parent.showRules = true">
        <v-list-item-icon>
          <v-icon>mdi-note</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Regeln</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "TheNavDrawer",
  data() {
    return {
      drawer: true,
      mini: true,
      user: null,
    };
  },
  methods: {
    logout: function () {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.replace("login");
      });
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.$router.replace("login");
      }
    });
  },
  components: {},
};
</script>