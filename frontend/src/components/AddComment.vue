<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
              <v-fab-transition>
                <v-btn 
                  v-bind="attrs" v-on="on"
                  :color="isCommented"
                  dark
                  absolute
                  top
                  right
                  fab
                  small
                  
                >
                  <v-icon>mdi-message</v-icon>
                  
                </v-btn>
              </v-fab-transition>

      </template>

      <v-card >
        <v-app-bar color="success" flat>
            <v-card-title>
                <v-icon left class="white--text" >add</v-icon>
                <span class="white--text heading">Add Comment</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">

      <v-form
        ref="form"
        v-model="form"
        @submit.prevent="onSubmitComment(post.id)"
      >




        <v-textarea
        counter=400
        label="Content"
        v-model="data.content"
        :rules="[rules.required, rules.length(100)]"
        clearable
        ></v-textarea>

      </v-form>



      </v-card-text>


    



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
        class="white--text"
        color="primary"
        depressed
        @click="onSubmitComment(post.id)"
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
  data() {
    return {
        dialog: false,
        form: true,
        data: {content: "",},
        rules: {
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        required: v => !!v || 'This field is required',
      },
    }
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
    isCommented() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.comments.map((a) => a.idUser);
      if (userLike.includes(userId)) {
        return "green";
      } else {
        return "";
      }
    },
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
    },

  methods: {
    onSubmitComment(id) {
      this.$store.dispatch("getPosts");
      this.$store.dispatch("commentPost", {
        id: id,
        data: this.data,
      });
      this.data.commentMessage = "";
      this.$store.dispatch("getPosts");
      this.$store.dispatch("getPostById", this.post.id);

      setTimeout(() => {
        this.alert=false;
        this.dialog=false;
      }, 1000)
    },
  },
}
</script>
