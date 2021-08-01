//One Post 

<template>
  
          <div class="post">
            
            <v-container>

              <v-layout column >
                <template>
                  <v-hover v-slot:default="{ hover }">
          <v-container>
            <v-row justify="space-around" >
              <v-card width="800" 
              
              class="mb-16 mt-10 elevation-15">
                <v-img
                  height="500px"
                  :src="post.fileUrl"
                  :aspect-ratio="16/9"
                >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                    style="height: 20%;"
                    
                  >
                    Like it ?
                  </div>
                </v-expand-transition>
                
                  <v-app-bar color="rgba(0, 0, 0, 0)" >

                    <v-btn dark icon @click="getBackToPosts()">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                  <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark icon v-bind="attrs" v-on="on" @click="getOnePost(post.id)">
                        <v-icon>mdi-dots-vertical</v-icon>
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

                    <p class="mt-6 mr-2">{{ post.likes.length }} Likes</p>
                    <v-btn class="mx-2" fab dark large :color="isLiked" @click="likePost(post.id)">
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <p class="mt-6 mr-2">{{ post.comments.length }} Comments</p>
                    <v-btn class="mx-2" fab dark large :color="isCommented">
                      <v-icon dark>mdi-message</v-icon>
                    </v-btn>

                </v-card-title>


                <v-card-text >
                  <div>
                    
                    <p class="mt-4 mb-4 text-h6 text-justify"><v-icon class="mr-5 ml-11">message</v-icon>{{ post.content }}</p>
                    <p class="caption text-right mr-5" ><v-icon class="mr-3 ml-10">mdi-calendar</v-icon>{{ post.createdAt | moment("calendar")}}</p>
                  </div>
                </v-card-text>
                <div>
                  <Comments />
                </div>

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
import Comments from '../components/Comments.vue'

export default {
  components: { EditPost, DeletePost, Comments },
  


  data() {
    return {
      
    }
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
    isLiked() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.likes.map((a) => a.idUser);
      if (userLike.includes(userId)) {
        return "pink";
      } else {
        return "";
      }
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
