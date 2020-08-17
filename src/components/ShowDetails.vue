<template>
  <v-container>
    <v-card color="blue-grey darken-4 mt-10" dark>
      <router-link :to="{ path: '/' }" class="float-right ma-3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
              <v-icon
              v-on="on"
              v-bind="attrs"
              >mdi-undo
              </v-icon>
          </template>
          <span>Return</span>
        </v-tooltip>
      </router-link>
      <v-container>
        <h1>{{show.title}}</h1>
        <v-row>
          <v-col col md="7" sm="12" class='text-center'>
            <v-simple-table>
              <tbody>
                <tr>
                  <th>Network:</th>
                  <td>{{show.network}}</td>
                </tr>
                <tr>
                  <th>Is Current:</th>
                  <td>
                    <v-icon v-if="show.isCurrent">mdi-check</v-icon>
                    <v-icon v-if="!show.isCurrent">mdi-close</v-icon>
                  </td>
                </tr>
                <tr>
                  <th>Number of Seasons:</th>
                  <td>{{show.numberOfSeasons}}</td>
                </tr>
                <tr>
                  <th class="genres">Genres:</th>
                  <td>
                    <ul class="px-0">
                      <li v-for="(genre, i) in show.genres" :key="i">{{genre}}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          <v-col col md="5" sm="12" class="text-center">
            <img :src="show.image">
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { db } from '@/firebase'; 
export default {
  name: "ShowDetails",
  data() {
    return {
      show: '',
    }
  },
  mounted() {
    db.collection("shows").doc(this.$route.params.id).get()
    .then(datos => {
      const show = datos.data();
      this.show = show;
    })
  }
};
</script>

<style scoped>
.genres {
  vertical-align: top;
}
.col-sm-12>img {
  width: 310px;
}
img {
  width: 341px;
  height: 192px;
}
ul {
  list-style: none;
}
</style>
