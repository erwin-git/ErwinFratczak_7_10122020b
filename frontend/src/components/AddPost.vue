
<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon left class="white--text">message</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Add Post</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

      <v-card >
        <v-app-bar color="success" flat>
            <v-card-title>
                <v-icon left class="white--text" >message</v-icon>
                <span class="white--text heading">Add Post</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">
      <v-file-input
          accept="image/*"
          label="Photo"
      ></v-file-input>
      <v-textarea
      counter
      label="Biography"
      :rules="rules"
      :value="value"
      ></v-textarea>
    </v-card-text>

<v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
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
