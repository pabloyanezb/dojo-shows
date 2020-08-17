<template>
  <v-container>
    <v-row>
      <v-col col sm="12" lg="12">
        <h1>All Shows:</h1>
        <v-simple-table class="pt-2 blue-grey darken-4" dark>
          <thead>
            <th>Title</th>
            <th>Network</th>
            <th>Seasons</th>
            <th>Is Current</th>
            <th>Genres</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="show in shows" :key="show.id">
              <td>
                <router-link
                  :to="{ path: `/details/${show.id}` }"
                  class="teal--text text--accent-1 title"
                >
                  {{ show.title }}
                </router-link>
              </td>
              <td>{{ show.network }}</td>
              <td class="text-center">{{ show.numberOfSeasons }}</td>
              <td class="text-center">
                <v-icon v-if="show.isCurrent">mdi-check</v-icon>
                <v-icon v-if="!show.isCurrent">mdi-close</v-icon>
              </td>
              <td>{{ show.genres.join(" / ") }}</td>
              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <router-link
                      
                      :to="{ path: `/edit/${show.id}` }"
                    >
                      <v-icon class="teal--text text--accent-3"
                      v-on="on"
                      v-bind="attrs"
                        >mdi-pencil</v-icon
                      >
                    </router-link>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
              </td>
              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <a
                      href=""
                      v-on="on"
                      v-bind="attrs"
                      @click.prevent="(dialog = true), (id = show.id)"
                    >
                      <v-icon class="teal--text text--accent-4"
                        >mdi-delete</v-icon
                      >
                    </a>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <v-snackbar v-model="snackbar" :timeout="timeout" top>
        Show deleted!
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
    <v-row>
      <v-col col sm="12" lg="12">
        <h2>Add a Show</h2>
        <v-card>
          <v-form
            class="card blue-grey darken-4 white-text px-8"
            @submit.prevent="addShow"
          >
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
            <v-row align="center">
              <v-col col sm="4" offset-sm="1" class="py-0">
                <v-radio-group v-model="isCurrent" required dark row
                  >Is Current: <v-spacer></v-spacer>
                  <v-radio label="yes" :value="true"></v-radio>
                  <v-radio label="no" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col col sm="3" offset-sm="4" class="py-0">
                <v-btn type="submit" block large>Add </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure?</v-card-title>
          <v-card-text>The show will be deleted</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" text @click="dialog = false">No</v-btn>
            <v-btn color="teal darken-1" text @click="Delete">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/firebase";
// import M from 'materialize-css';

export default {
  name: "Shows",
  data() {
    return {
      shows: [],
      title: "",
      network: "",
      numberOfSeasons: "",
      isCurrent: null,
      genres: [],
      snackbar: false,
      timeout: 2000,
      dialog: false,
      id: null,
    };
  },
  methods: {
    addShow() {
      db.collection("shows").add({
        title: this.title,
        network: this.network,
        numberOfSeasons: parseInt(this.numberOfSeasons),
        isCurrent: this.isCurrent,
        genres: this.genres.split(",", 5),
      });
      this.title = "";
      this.network = "";
      this.numberOfSeasons = "";
      this.isCurrent = null;
      this.genres = [];
    },
    Delete() {
      db.collection("shows")
        .doc(this.id)
        .delete();
      this.dialog = false;
      this.snackbar = true;
      this.id = null;
    },
  },
  firestore() {
    return {
      shows: db.collection("shows").orderBy("title", "asc"),
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.v-application--wrap {
  background-color: #ECEFF1;
}
</style>
