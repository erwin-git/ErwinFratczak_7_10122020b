<template>
<!-- show comments in time line -->
  <v-timeline 
    align-top
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item 
      v-for="comment in post.comments"
      :key="comment.id"
      :comment="comment"
      color="grey"
      
      fill-dot
    >
      <template v-slot:icon >
        <v-avatar size="40px">
          <v-img v-if="comment.User.imageURL" :src="comment.User.imageURL"></v-img>
          <v-img v-else src="../assets/icon.png"></v-img>
        </v-avatar>
      </template>
      <v-card
        color="success"
        dark
        class="elevation-20"
      >
        <v-card-title class="py-1 text-h6 justify-center" >
          {{ comment.User.firstName }} {{ comment.User.lastName }}
<!-- delete if u r admin or author -->
        <v-spacer></v-spacer>
        <template
          v-if="
            $store.state.user.id === comment.idUser ||
              $store.state.user.admin === true
          "
        >
          <v-btn fab color="error" x-small @click="deleteComment(comment.id)"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </template>


        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text class="white text--primary">
          <p class="text-body-1">{{ comment.content }}</p>



            
              <div class="caption text-right mr-5" ><v-icon color="grey" class="mr-3 ml-10">mdi-clock</v-icon>{{ comment.createdAt | moment("calendar")}}</div>






        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>

export default {
  name: "comments",
  data() {
    return {
    }
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
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
  },
}
</script>