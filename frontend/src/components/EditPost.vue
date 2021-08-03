<!-- edit post popup -->
<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on" >
            <v-list-item-action>
                <v-icon >edit</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Edit Post</v-list-item-title>
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
                <span class="white--text heading">Edit Post</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">
<!-- change post imh -->
      <label for="image" class="body-1 pr-2">Image</label>
        <input
          @change="uploadImage"
          type="file"
          accept="image/png, image/jpeg,
          image/bmp, image/gif"
          ref="file"
          name="image"
          class="input-group--focused"
        />
        <div class="text-right">
          <v-btn fab color="error" x-small @click="deleteImage()"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
<!-- change post text -->
      <v-textarea
      counter="400"
      label="Content"
      v-model="content"
      :rules="[rules.required, rules.length(100)]"
      :placeholder="post.content"
      clearable
      ></v-textarea>

    </v-card-text>

    
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
  name: "EditPost",

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
    post() {
      return this.$store.getters.post;
    },
  
  },
  beforeMount() {
  let id = this.$route.params.id;
  this.$store.dispatch("getPostById", id);
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
      let id = this.$route.params.id;
      const formData = new FormData();
      if (this.content !== null) {
        formData.append("content", this.content);
      }

      formData.append("image", this.file);
      this.$store.dispatch("getPosts");
      this.$store.dispatch("updatePost", formData);
      this.$store.dispatch("getPostById", id);
      this.$router.push("/post");
      
      setTimeout(() => {
          this.alert=false;
          this.dialog=false;
        }, 3000)
    },
  },
};
</script>
