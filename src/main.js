import Vue from 'vue'
import App from './App.vue'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from '@/router/router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'vuetify/dist/vuetify.min.css'
import vuetify from "@/plugins/vuetify";
import './registerServiceWorker'

Vue.config.productionTip = false;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, () => {
  if (app) {
    /* eslint-disable no-new */
    new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});

