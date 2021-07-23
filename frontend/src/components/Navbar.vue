<template>
    <nav>
        <v-app-bar flat color="rgba(0, 0, 0, 0)" app>
            <v-app-bar-nav-icon class="red--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class=" red--text">
                <span class="font-weight-black">Groupo</span>
                <span class="font-weight-black">mania</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
                
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon left >{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <Logout />
            </v-list>
          </v-menu>

        </v-app-bar>


        <v-navigation-drawer v-model="drawer" app class="primary">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img class="text-lg-center" src="../assets/icon.png">
                    </v-avatar>
                
                </v-flex>
                <span class="white--text body-2 mt-5">FirstName LastName</span>
            </v-layout>
            <v-list class="mt-5">
                <Profil />
                <EditProfil />
                <DeleteProfil />
                <AddPost />
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>


<script>
import Profil from './Profil.vue'
import EditProfil from './EditProfil.vue'
import DeleteProfil from './DeleteProfil.vue'
import AddPost from './AddPost.vue'
import Logout from './Logout.vue'

export default {
    components: { Profil,  EditProfil, DeleteProfil, AddPost, Logout },
    data: () => {
        return {
            drawer: false,
            links: [
                {icon: 'home', text: 'Home', route: '/'},
                {icon: 'dashboard', text: 'Posts', route: '/posts'},
                {icon: 'group', text: 'Users', route: '/users'},
                {icon: 'info', text: 'About', route: '/about'},
            ]
        }
    },

}
    



</script>
