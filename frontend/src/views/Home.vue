<template>
  
    <v-container>
      <Login />
        <v-row justify="space-around" >
      <div class="home" >
        <v-img  width="600" 
              src="../assets/icon-left-font-monochrome-black.png"
            >
        </v-img>
      </div>
        </v-row>
    </v-container>

</template>



<script>
import Login from '../components/Login.vue'

export default {
  components: { Login },
  name: 'HOME',


}
</script>
