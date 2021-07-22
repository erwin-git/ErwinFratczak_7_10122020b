
<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
      transition="dialog-top-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon left class="white--text">person</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Profil</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

      <v-card width="500" height="600px">
        <v-app-bar height="200px" color="primary" flat prominent>
            <v-card-title class="white--text mt-8">
                <v-layout column align-left>
                    <h1 class="white--text heading">First</h1>
                    <h2 class="white--text heading">LastName</h2>
                </v-layout>
                <v-layout column align-right class="ml-11 mt-10">
                    <v-avatar size="150" class="grey lighten-8" >
                        <img class="text-lg-center" src="../assets/icon.png">
                    </v-avatar>
                </v-layout>
            
            </v-card-title>
        </v-app-bar>


<v-card-text class="mt-16">
    <v-row align="center" class="mx-0">
        <v-icon left>email</v-icon>
        <h3>groupomania@gmail.com</h3>
    </v-row>

    <div class="mt-14 text-body-1 text-right">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias impedit exercitationem obcaecati animi doloribus, laudantium, voluptas libero odio nisi asperiores nesciunt repellat deleniti quas quis, tenetur vel optio tempora pariatur.</div>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mt-10" align="right" color="primary" text @click="dialog = false">OK !</v-btn>
        
        </v-card-actions>
    
    </v-card>
    </v-dialog>
  </div>
</template>






	<script>
export default {
  data() {
    return {
        dialog: false,
    }
  }
}
</script>
