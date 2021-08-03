<template>
  
          <div class="post">
            
            <v-container class="mb-16">

              <v-layout column >
                <template>
                  
          <v-container>
            <v-row justify="space-around" >
              <v-card width="800" 
              v-for="post in posts" 
              :key="post.id" 
              class="mb-16 mt-10 elevation-24">
              <v-hover v-slot:default="{ hover }">
                <v-img
                  height="500px"
                  :src="post.fileUrl"
                  lazy-src="https://picsum.photos/510/300?random"
                  :aspect-ratio="16/9"
                  @click="getOnePost(post.id)"
                >
                
                <v-expand-transition>
                  <div 
                    v-if="hover"
                    class="text-center text-h5 d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                    style="bottom: 0%; top: 0%;"
                    
                  >
                    {{ post.content }}
                  </div>
                </v-expand-transition>
                
                  <v-app-bar flat color="rgba(0, 0, 0, 0)" height="940px">

                  <v-app-bar-nav-icon color="white">
                    <span class="font-weight-black ml-15">{{ post.likes.length }} <v-icon color="error">mdi-heart</v-icon>    {{ post.comments.length }} <v-icon color="success">mdi-message</v-icon></span>
                  </v-app-bar-nav-icon>
                  
                    <v-spacer></v-spacer>

                  <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark icon v-bind="attrs" v-on="on" @click="getOnePost(post.id)">
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-btn>
                    </template>
                  </v-menu>
                  </v-app-bar>   
                  <div>
                    
                  </div>             
                </v-img>
                </v-hover>

                  <v-fab-transition>
                    <v-btn
                      color="transparent"
                      top
                      fab
                      absolute
                      x-large
                      class="ml-10 mt-5"
                    >
                    
                    <v-avatar size="100" class=" elevation-15">

                      <v-img v-if="post.User.imageURL" :src="post.User.imageURL"></v-img>
                      <v-img v-else src="../assets/icon.png"></v-img>

                    </v-avatar>
                    </v-btn>
                    </v-fab-transition>
                    
                    


                    <v-fab-transition>
                      <v-btn class="mr-10"
                        color="error"
                        dark
                        absolute
                        bottom
                        right
                        fab
                        small
                        @click="likePost(post.id)"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-fab-transition>






              </v-card>
            </v-row>
          </v-container>
          
        </template>
      </v-layout>

    </v-container>
    
  </div>
  
</template>

<script>

import PostService from "../services/PostService";
export default {

  name: "Post",


  data: function() {
    return {
      messageRetour: null,
      errorMessage: null,
    };
  },
  computed: {
      posts() {
      return this.$store.getters.posts;
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
          return "success";
      } else {
          return "";
      }
    }, 


  },

  beforeMount() {
    this.$store.dispatch("getPosts");
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
  },

  methods: {
    async getAll() {
      try {
        const response = await PostService.getPosts();
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getOnePost(id) {
      this.$router.push(`post/${id}`);
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
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .6;
  position: absolute;
  width: 100%;
}
</style>