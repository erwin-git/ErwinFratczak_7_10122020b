
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
                <v-icon>delete</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Delete Post</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

      <v-card width="500" ref="form">
        <v-app-bar color="error" flat>
            <v-card-title>
                <v-icon left class="white--text" >delete</v-icon>
                <span class="white--text heading">Delete Post</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="agreement = true, dialog = false, deletePost(post.id)"
            
          >
            YES
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="primary"
            @click="agreement = false, dialog = false"
          >
            NO
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
    }
  },
  computed: {
    post() {
      return this.$store.getters.post;
    }    
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
  }
}
</script>
