
<template>

  <div>
    
    <v-dialog
      v-model="dialog"
      width="400"
      transition="dialog-top-transition"
      overlay-opacity="1"
      overlay-color="primary"
    >
      
      <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" >Sign Up</v-btn>
      </template>


      <v-card
        class="mx-auto"
        style="max-width: 500px;"
      >
          
        
        <v-app-bar color="success" flat>
          
            <v-card-title>
                <v-icon left class="white--text" >add</v-icon>
                <span class="white--text heading">Sign Up</span>
            </v-card-title>
        </v-app-bar>
        
        <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
          
        >

          <v-text-field
            v-model="firstName"
            label="First Name"
            type="text"
            :rules="[(v) => !!v || 'First Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last Name"
            type="text"
            :rules="[(v) => !!v || 'Last Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            label="Email address"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.password, rules.length(6)]"
            counter="6"
            label="Password"
            style="min-height: 96px"
            type="password"
            required
          ></v-text-field>

        <v-alert :value="alert" type="info" text dense v-html="message || errorMessage"></v-alert>

        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
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
            color="success"
            depressed
            v-on:click.prevent="signup"
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
import Auth from "../services/Auth.js";
  export default {
    name: "Signup",
    data: () => ({
      alert: false,
      agreement: false,
      dialog: false,
      email: undefined,
      form: true,
      isLoading: false,
      password: undefined,
      firstName: undefined,
      lastName: undefined,
      errorMessage: null,
      message: null,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
    methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          
        });
        this.message = response.data.message;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);

      let router = this.$router;
      setTimeout(function() {
        router.push("/posts");
      }, 3500);
      setTimeout(() => {
          this.alert=false;
        }, 3000)


      } catch (error) {
        this.errorMessage = error.response.data.error;
        
        setTimeout(() => {
          this.alert=false;
          this.errorMessage = "";
          
        }, 3000);
      }
    },
  },
  }
</script>
