<!-- all users  -->
<template>
  <v-container>
            <v-row justify="space-around" >
<!-- single user card -->
  <v-card 
    max-width="400"
    class="mx-auto"
    v-for="user of users"
    :key="user.id"
    
  >
      <v-app-bar
      absolute
      flat
      color="rgba(0, 0, 0, 0)"
      >

      <v-spacer></v-spacer>
<!-- if admin or loged user - delete -->
        <v-menu bottom left v-if="
          $store.state.user.id === user.id ||
          $store.state.user.admin === true
          ">
          <template 
          


          v-slot:activator="{ on, attrs }"
          >
            <v-btn icon color="error" v-bind="attrs" v-on="on" @click="deleteAccount(user.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>

        



        </v-menu>
    </v-app-bar>
<!-- user profil pic -->
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
<!-- user first and last name -->
        <v-list-item-content>
          <v-list-item-title class="mb-3">Name</v-list-item-title>
          <v-list-item-subtitle>{{user.firstName}} {{user.lastName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>


      
<!-- user e-mail -->
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
<!-- user biography -->
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


export default {

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
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    deleteAccount(id) {     
      if(this.$store.state.user.admin === true) {
        this.$store.dispatch("deleteAccount", id);
        window.location.reload()
      }
      else {
        this.$store.dispatch("deleteAccount", id);
        this.$store.dispatch("logOut");
        localStorage.clear();
        window.location.reload()
        this.$router.push("/");
      }
    },
  },
  
};
</script>