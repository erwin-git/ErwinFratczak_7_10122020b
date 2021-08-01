<template>
  <v-card
    class="mx-auto"
    max-width="900"
  >
    <v-toolbar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon><v-icon>mdi-account-group</v-icon></v-app-bar-nav-icon>
      

      <v-toolbar-title>Users</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>


    <v-list v-if="$store.state.users">

      <v-list-item
        v-for="user of users"
          :key="user.id"
          :user="user"
        
      >

          <v-list-item-avatar >
            <v-img v-if="user.imageURL" :src="user.imageURL"></v-img>
            <v-img v-else src="../assets/icon.png"></v-img>
          </v-list-item-avatar>
      
        

        <v-list-item-content>
          <v-list-item-title >{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
        </v-list-item-content>
      


        <v-list-item-content>
          <v-list-item-title >{{ user.email }}</v-list-item-title>
        </v-list-item-content>



        <v-spacer></v-spacer>

                
        <template
                
        >
          <v-btn fab color="error" x-small @click="deleteAccount(user.id)"> 
            <v-icon>delete</v-icon>
          </v-btn>
        </template>




        



      </v-list-item>
      
    </v-list>
    

    
  </v-card>
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
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    },

    deleteAccount(id) {     
      if(this.$store.state.user.admin === true) {
        this.$store.dispatch("deleteAccount", id);
      }
      else {
        this.$store.dispatch("deleteAccount", id);
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);
        this.getBackHome();
      }
    },
   
  },
  
};
</script>