<template>
    <nav>
        <v-app-bar flat class="grey lighten-4" app>
            <v-app-bar-nav-icon class="red--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase red--text">
                <span class="font-weight-light">Erwin</span>
                <span>Fratczak</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn depressed >
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>


        <v-navigation-drawer v-model="drawer" app class="primary">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img class="text-lg-center" src="../assets/icon.png">
                    </v-avatar>
                
                </v-flex>
                <span class="white--text subheading mt-1">FirstName LastName</span>
            </v-layout>
            <v-list>
                <Profil />
                <EditProfil />
                <DeleteProfil />
                <AddPost />
                
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon left class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>


<script>
import Profil from './Profil.vue'
import EditProfil from './EditProfil.vue'
import DeleteProfil from './DeleteProfil.vue'
import AddPost from './AddPost.vue'

export default {
    components: { Profil,  EditProfil, DeleteProfil, AddPost },
    data: () => {
        return {
            drawer: false,
            links: [
                {icon: 'home', text: 'Home', route: '/'},
                {icon: 'dashboard', text: 'Posts', route: '/posts'},
                {icon: 'info', text: 'About', route: '/about'},
                {icon: 'info', text: 'Users', route: '/about'},
                {icon: 'info', text: 'Comments', route: '/about'},
            ]
        }
    },

}
    



</script>
