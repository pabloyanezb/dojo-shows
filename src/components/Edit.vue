<template>
  <v-container>
    <v-row>
      <v-col col sm="12" md="12">
        <h1>Edit Show</h1>
        <v-card color="blue-grey darken-4">
          <v-form @submit.prevent="Edit">
            <v-row>
              <v-col col md="8">
                <v-text-field
                  required
                  v-model="title"
                  label="Title"
                  dark
                ></v-text-field>
              </v-col>
              <v-col col md="4">
                <v-text-field
                  required
                  v-model="network"
                  label="Network"
                  dark
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col col md="8">
                <v-text-field
                  required
                  v-model="genres"
                  label="Genres"
                  hint="Example: 'Action,Drama,Sci-Fi'"
                  dark
                ></v-text-field>
              </v-col>
              <v-col col md="4">
                <v-text-field
                  type="number"
                  required
                  v-model="numberOfSeasons"
                  dark
                  label="Number of Seasons"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              dark
              label="Image"
              v-model="image"
              append-icon="mdi-link"
              required
            ></v-text-field>
            <v-row align="center">
              <v-col col sm="4" offset-sm="1" class="py-0">
                <v-radio-group v-model="isCurrent" required dark row
                  >Is Current: <v-spacer></v-spacer>
                  <v-radio label="yes" :value="true"></v-radio>
                  <v-radio label="no" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col col sm="3" offset-sm="4" class="py-0">
                <v-btn type="submit" block large>Edit Show</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbar" :timeout="timeout" top>
        Show Edited!
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Edit",
  data() {
    return {
      show: "",
      title: "",
      network: "",
      numberOfSeasons: "",
      isCurrent: null,
      genres: [],
      image: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  mounted() {
    db.collection("shows")
      .doc(this.$route.params.id)
      .get()
      .then((datos) => {
        const show = datos.data();
        this.show = show;
        this.title = show.title;
        this.network = show.network;
        this.numberOfSeasons = show.numberOfSeasons;
        this.isCurrent = show.isCurrent;
        this.genres = show.genres;
        if (Array.isArray(show.genres)) {
          this.genres = show.genres.join(",");
        }
        this.image = show.image;
      });
  },
  methods: {
    Edit() {
      db.collection("shows")
        .doc(this.$route.params.id)
        .update({
          title: this.title,
          network: this.network,
          numberOfSeasons: parseInt(this.numberOfSeasons),
          isCurrent: this.isCurrent,
          genres: this.genres.split(",", 5),
          image: this.image,
        })
        .then(() => {
          this.snackbar = true;
        })
        .then(() => {
          setTimeout( () => this.$router.push({ path: '/'}), 1000);
        });
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem 2rem;
}
</style>
