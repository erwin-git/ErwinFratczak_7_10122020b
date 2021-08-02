
<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon left class="white--text">message</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Add Post</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>


      <v-card >
      <v-form
        ref="form"
        v-model="form">
      
        <v-app-bar color="success" flat>
            <v-card-title>
                <v-icon left class="white--text" >message</v-icon>
                <span class="white--text heading">Add Post</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">

      <label for="image" class="body-1 pr-2">Image</label>
        <input
          @change="uploadImage"
          type="file"
          accept="image/png, image/jpeg, image/bmp, image/gif"
          ref="file"
          name="image"
          class="input-group--focused"
        />
        <div class="text-right">
          <v-btn fab color="error" x-small @click="deleteImage()"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </div>



      <v-textarea
      counter="400"
      label="Content"
      v-model="content"
      :rules="[rules.required, rules.length(100)]"
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
        v-on:click.prevent="onSubmit"
        :disabled="!form"
        class="white--text"
        color="primary"
        depressed
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
  name: "AddPost",

  data() {
    return {
      dialog: false,
      alert: false,
      form: true,
      content: "",
      file: "",
      rules: {
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        required: v => !!v || 'This field is required',
      },
    };
  },
  computed: {
    messageRetour() {
      return this.$store.getters.messageRetour;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
  },
  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    deleteImage() {
      this.file = null;
      this.$refs.file.value = ''
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("content", this.content);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push("/post");
      
      setTimeout(() => {
          this.alert=false;
          this.dialog=false;
        }, 3000)
    },
  },
};
</script>

