<template>
  <v-row justify="center" align="center">
    <v-col class="d-flex justify-center">
      <v-card class="pa-5">
        <v-img src="../../public/images/CarcassonneText.png"> </v-img>

        <v-card-title> Sign In </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            type="text"
            :rules="emailRules"
            label="E-mail"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            :rules="passwordRules"
            required
            @keyup.enter="validate"
          ></v-text-field>

          <v-btn
            class="ms-1"
            large
            color="success"
            elevation="2"
            text
            rounded
            outlined
            @click="validate"
          >
            Login
          </v-btn>
        </v-form>

        <v-card-text>
          <p class="text-center">
            You don't have an account ? You can
            <router-link to="/sign-up">create one</router-link>
            or Sign in with Google <br />
            <button @click="socialLogin" class="social-button">
              <img
                alt="Google Logo"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </button>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default {
  name: "login",
  data() {
    return {
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => (v && v.length > 0) || "Password can not be empty",
      ],
      email: "",
      password: "",
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login: function () {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password).then(
        () => {
          this.$router.replace("home");
        },
        (err) => {
          alert("Oops. " + err.message);
        }
      );
    },
    socialLogin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(() => {
          this.$router.replace("home");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}

.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}

.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 100%;
}
</style>