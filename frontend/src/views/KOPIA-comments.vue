<template>

      <v-timeline>
          <v-timeline-item
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            large
          >
            <template v-slot:icon >
              <v-avatar>
                <img :src="comment.User.imageURL">
              </v-avatar>
            </template>
            <template v-slot:opposite>
              <span>{{ comment.createdAt | moment("calendar")}}</span>
            </template>

            <v-card class="elevation-6">
              <v-card-title class="text-h5">
                {{ comment.User.firstName }} {{ comment.User.lastName }}
                <v-spacer></v-spacer>

              <template
                      v-if="
                        $store.state.user.id === comment.idUser ||
                          $store.state.user.admin === true
                      "
              >
                <v-btn fab primary x-small @click="deleteComment(comment.id)"> 
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              
              </v-card-title>

              <v-card-text>{{ comment.content }}</v-card-text>
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
