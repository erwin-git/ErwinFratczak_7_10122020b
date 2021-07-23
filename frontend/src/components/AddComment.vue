<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="text-right">
          <v-btn class="mb-5 mr-5" fab dark color="success" v-bind="attrs" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>

      <v-card >
        <v-app-bar color="warning" flat>
            <v-card-title>
                <v-icon left class="white--text" >add</v-icon>
                <span class="white--text heading">Add Comment</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">
      <v-textarea
      counter
      label="Content"
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
