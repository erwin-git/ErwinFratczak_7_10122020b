<!-- likes tab -->
<template>
<v-row justify="space-around" >
    <v-card flat width="700" >
    <v-list>
      <v-list-item
            v-for="like in post.likes"
            :key="like.id"
      >
<!-- users photos -->
        <v-list-item-avatar>
          
          <v-img v-if="like.User.imageURL" :src="like.User.imageURL"></v-img>
          <v-img v-else src="../assets/icon.png"></v-img>

        </v-list-item-avatar>

        
<!-- users info -->
        <v-list-item-content>
            <v-list-item-title>{{ like.User.firstName }} {{ like.User.lastName }}</v-list-item-title>
        </v-list-item-content>

        
<!-- when was liked -->
        <v-list-item-content>
            <v-list-item-title class="caption text-right mr-5" ><v-icon color="grey" class="mr-3 ml-10">mdi-clock</v-icon>{{ like.createdAt | moment("calendar")}}</v-list-item-title>
        </v-list-item-content>

<!-- dislike if it is your like -->
        <v-list-item-icon>
        <template
          v-if="
            $store.state.user.id === like.idUser "
        >
          <v-btn fab color="warning" x-small @click="likePost(post.id)"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </template>

        <template
          v-else
        >
          <v-btn fab color="error" x-small> 
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        </v-list-item-icon>

      </v-list-item>
    </v-list>
    </v-card>
    </v-row>
</template>

<script>

export default {
  name: "likes",
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
    getBackToPosts() {
      this.$router.push("/post");
    },
    likePost(id) {
      const data = 1;
      this.$store.dispatch("likePost", {
        id: id,
        data: data,
      });
      this.$store.dispatch("getPosts");
    },
    
  },
}
</script>
