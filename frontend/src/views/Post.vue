<template>
  
          <div class="post">
            
            <v-container>

              <v-layout column >
                <template>
                  <v-hover v-slot:default="{ hover }">
          <v-container>
            <v-row justify="space-around" >
              <v-card width="800" 
              v-for="post in posts" 
              :key="post.id" 
              class="mb-16 mt-10 elevation-15">
                <v-img
                  height="300px"
                  :src="post.fileUrl"
                  :aspect-ratio="16/9"
                >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                    style="height: 30%;"
                    
                  >
                    Like it ?
                  </div>
                </v-expand-transition>
                
                  <v-app-bar flat prominent color="rgba(0, 0, 0, 0)" height="600px">
                    <v-spacer></v-spacer>

                  <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark icon v-bind="attrs" v-on="on" @click="getOnePost(post.id)">
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <EditPost />
                      <DeletePost />
                      
                            
                            
                    </v-list>
                  </v-menu>
                  </v-app-bar>
                    


                </v-img>

                <v-card-title>
                    <v-avatar size="100" class="ml-1 elevation-15">
                      <img
                        
                        alt="user"
                        :src="post.User.imageURL"
                      >
                    </v-avatar>
                    <v-layout column align-left class="ml-5">
                        <h1 class="heading">{{ post.User.firstName }}</h1>
                        <h2 class="heading">{{ post.User.lastName }}</h2>
                    </v-layout>

                    <p class="mt-6 mr-2">0</p>
                    <v-btn class="mx-2" fab dark large color="pink">
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>

                </v-card-title>


                <v-card-text>
                  <div>
                    
                    <p class="mt-4 mb-4 text-h6 text-justify"><v-icon class="mr-5 ml-11">message</v-icon>{{ post.content }}</p>
                    <p class="caption text-right mr-5" ><v-icon class="mr-3 ml-10">mdi-calendar</v-icon>{{ new Date(post.createdAt).toLocaleString()}}</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>
          </v-hover>
        </template>
      </v-layout>

    </v-container>
    
  </div>
  
</template>

<script>
import EditPost from '../components/EditPost.vue'
import DeletePost from '../components/DeletePost.vue'
import PostService from "../services/PostService";
export default {
  components: { EditPost, DeletePost,},
  name: "Post",

  props: {
    post: {
      type: Object,
    },
  },
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
  },

  beforeMount() {
    this.$store.dispatch("getPosts");
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