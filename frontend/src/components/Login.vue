<template>
  <div>
    
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
      overlay-opacity="0.50"
      overlay-color="primary"
      
      
    >


      <v-card >
        <v-app-bar color="primary" flat>
            <v-card-title>
                <v-icon left class="white--text" >login</v-icon>
                <span class="white--text heading">Login</span>
            </v-card-title>
        </v-app-bar>
    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
      
    >

    <v-card-text class="mt-10">
            <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
    </v-card-text>
    <v-alert :value="alert" type="info" text dense v-html="message || errorMessage"></v-alert>
  </v-form>
<v-divider></v-divider>
    <v-card-actions>
      
      <Signup />
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        v-on:click.prevent="login"
        @click="alert = true, $refs.form.reset()"
      >
        Submit
      </v-btn>
    </v-card-actions>
    
    </v-card>
    </v-dialog>
  </div>
</template>






	<script>
import Signup from './Signup.vue'
import Auth from "../services/Auth.js";
export default {
  components: { Signup },
  data() {
    return {
        dialog: true,
        alert: false,
        message: null,
        errorMessage: null,
        agreement: false,
        email: undefined,
        form: false,
        isLoading: false,
        password: undefined,
        rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }
  },
  methods: {
    async login() {
      try {
        const response = await Auth.login({
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
  
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(() => {
          router.push({ path: '/posts', })
        }, 3000);
        setTimeout(() => {
          this.alert=false;
        }, 3000)
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.alert=false;
          this.email= "";
          this.password= "";
          this.errorMessage = "";
        }, 3000);
      }
    },
  },
  
  
}
</script>
