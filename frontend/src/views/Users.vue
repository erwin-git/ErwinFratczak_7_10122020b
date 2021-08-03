<template>
  <v-container>
            <v-row justify="space-around" >

  <v-card 
    max-width="400"
    class="mx-auto"
    v-for="user of users"
    :key="user.id"
    :user="user"
  >
      <v-app-bar
      absolute
      flat
      color="rgba(0, 0, 0, 0)"
      >

      <v-spacer></v-spacer>

        <v-menu bottom left>
          <template 
          


          v-slot:activator="{ on, attrs }"
          >
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list v-if="
          $store.state.user.id === user.id ||
          $store.state.user.admin === true
          ">
            <DeleteUsers />
          </v-list >


        </v-menu>
    </v-app-bar>

    <v-img
    max-height="300px"
    dark 
    v-if="user.imageURL" :src="user.imageURL"></v-img>
    <v-img 
    max-height="300px"
    dark 
    v-else src="../assets/icon.png"></v-img>

    <v-list two-line>
      
    <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            person
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">Name</v-list-item-title>
          <v-list-item-subtitle>{{user.firstName}} {{user.lastName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>


      

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            mdi-email
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">e-Mail</v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            info
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">Biography</v-list-item-title>
          <p class="text-justify body-2">{{user.biography}}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
            </v-row  >
            </v-container>
</template>


<script>
import DeleteUsers from '../components/DeleteUsers.vue'
import Auth from "../services/Auth";
export default {
components: { DeleteUsers },
  name: "Users",



  data() {
    return {      
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
    let id = this.$route.params.id;
    this.$store.dispatch("getUserById", id);
  },
  methods: {
    async getAll() {
      try {
      const response = await Auth.getUsers();
        this.users = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getOneUser(id) {
      this.$router.push(`auth/${id}`);
    },

  },
};
</script>