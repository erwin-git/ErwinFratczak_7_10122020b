<template>
  <v-app>
    <Navbar />
      
    
    <v-main class="grey lighten-4">
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export default {
  name: 'App',
  components: { Navbar, Footer },
  
  data: () => ({
    //
  }),
  computed:{
     user() {
       return this.$store.getters.user
     }
   },
  mounted() {
     this.$store.dispatch("getUsers");
     this.$store.dispatch("getUserById", this.user.id);
   }
};
</script>
