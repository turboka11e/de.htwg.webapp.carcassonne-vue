<template>
  <v-row justify="center" align="center">
    <v-col class="d-flex justify-center">
      <v-card class="pa-5">
        <v-img src="../../public/images/CarcassonneText.png"> </v-img>

        <v-card-title> Create Account </v-card-title>

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
            Create
          </v-btn>
        </v-form>

        <v-card-text>
          <p class="text-center">
            or go back to <router-link to="/login">login</router-link>.
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

 <script>
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default {
  name: "signUp",
  data() {
    return {
      valid: false,
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
        this.signUp();
      }
    },
    signUp: function () {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password).then(
        () => {
          this.$router.replace("home");
        },
        (err) => {
          alert("Oops. " + err.message);
        }
      );
    },
  },
};
</script>

 <style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>