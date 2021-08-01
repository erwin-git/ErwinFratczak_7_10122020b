// alerts
<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
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
      <v-card >
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
        :rules="[rules.required, rules.length(3), rules.name]"
        counter="30"
        label="First Name"
        :placeholder="user.firstName"
        input="user.firstName"
        clearable
        hint="Le FirstName doit avoir 3 caractères min et 30 max"
      ></v-text-field>
      <v-text-field
        ref="lastName"
        v-model="lastName"
        :rules="[rules.required, rules.length(3), rules.name]"
        counter="30"
        label="Last Name"
        :placeholder="user.lastName"
        hint="Le FirstName doit avoir 3 caractères min et 30 max"
        clearable
      ></v-text-field>

      



      <label for="image" class="body-1 pr-2" >Photo: </label>
      <input
        @change="uploadImage"
        type="file"
        accept="image/png, image/jpeg, image/bmp, image/gif"
        ref="file"
        name="image"
        class="input-group--focused"

      >
      <div class="text-right">
        <v-btn fab color="error" x-small @click="deleteImage()"> 
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
      



      <v-textarea
        counter="400"
        label="Biography"
        v-model="biography"
        :rules="[rules.required, rules.length(100)]"
        :placeholder="user.biography"
        clearable
      ></v-textarea>
    </v-card-text>



    <v-alert :value="alert" type="info" text dense v-html="messageRetour || errorMessage"></v-alert>
</v-form>
<v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset(), deleteImage()"
        
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        
        class="white--text"
        color="primary"
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
      form: true,
      biography: "",
      firstName: "",
      lastName: "",
      file: "",
      messageRetour: "",
      errorMessage: "",
      rules: {
        name: v => !!(v || '').match(/^[a-zA-Z]{3,30}$/) || 'Please enter a valid Name',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        required: v => !!v || 'This field is required',
      },
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
    deleteImage() {
      this.file = null;
      this.$refs.file.value = ''
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
        router.push("/post");
      }, 2500);
      setTimeout(() => {
          this.alert=false;
          this.dialog=false;

        }, 2000)
    },
    },
};
</script>