// file name and buttons alerts
<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
      transition="dialog-top-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon left class="white--text">edit</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Edit Profil</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>
      <v-card width="400px" >
      <v-form
          ref="form"
          v-model="form">
      
        <v-app-bar color="warning" flat>
            <v-card-title>
                <v-icon left class="white--text" >edit</v-icon>
                <span class="white--text heading">Edit Profil</span>
            </v-card-title>
        </v-app-bar>
    <v-card-text class="mt-10">
      <v-text-field
        ref="firstName"
        v-model="firstName"
        :rules="FirstNameRules"
        :error-messages="errorMessages"
        label="First Name"
        :placeholder="user.firstName"
        
        hint="Le FirstName doit avoir 3 caractères min et 30 max"
      ></v-text-field>
      <v-text-field
        ref="lastName"
        v-model="lastName"
        :rules="LastNameRules"
        :error-messages="errorMessages"
        label="Last Name"
        :placeholder="user.lastName"
        hint="Le FirstName doit avoir 3 caractères min et 30 max"
      ></v-text-field>

      



      <label for="image" class="body-1" >Photo: </label>
      <input
        @change="uploadImage"
        type="file"
        accept="image/png, image/jpeg, image/bmp, image/gif"
        ref="file"
        name="image"
      >



      <v-textarea
        counter="400"
        label="Biography"
        :value="value"
        v-model="biography"
        :rules="BiographyRules"
        :placeholder="user.biography"
      ></v-textarea>
    </v-card-text>



    <v-alert :value="alert" type="info" text dense v-html="messageRetour || errorMessage"></v-alert>
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
        
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        :disabled="!form" 
        v-on:click.prevent="onSubmit"
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
export default {
  name: "EditProfil",
  data() {
    return {
      alert: false,
      dialog: false,
      isValid: true,
      biography: "",
      firstName: "",
      lastName: "",
      file: "",
      messageRetour: "",
      errorMessage: "",
      FirstNameRules: [
        (v) => v.length <= 30 || "Max 30 caractères",
        
      ],
      LastNameRules: [
        (v) => v.length <= 30 || "Max 30 caractères",
        
      ],
      BiographyRules: [(v) => v.length <= 400 || "Max 400 caractères"],

    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },

  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("biography", this.biography);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("getUsers");
      this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("updateAccount", formData);
      this.$store.dispatch("getUserById", this.user.id);

      let router = this.$router;
      setTimeout(function() {
        router.push("/posts");
      }, 3500);
      setTimeout(() => {
          this.alert=false;
          this.dialog=false;

        }, 3000)
    },
  
  },
};
</script>