<template>
  <div class="background blue-grey darken-4">
    <div class="row container white-text">
      <div class="col m7">
        <h3>{{show.title}}</h3>
        <table class="blue-grey-text text-lighten-4">
          <tbody>
            <tr>
              <th>Network:</th>
              <td>{{show.network}}</td>
            </tr>
            <tr>
              <th>Is Current:</th>
              <td>
                <i class="material-icons" v-if="show.isCurrent">check</i>
                <i class="material-icons" v-if="!show.isCurrent">close</i>
              </td>
            </tr>
            <tr>
              <th>Number of Seasons:</th>
              <td>{{show.numberOfSeasons}}</td>
            </tr>
            <tr>
              <th class="genres">Genres:</th>
              <td>
                <ul>
                  <li v-for="(genre, i) in show.genres" :key="i">{{genre}}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link :to="{ path: '/' }" class="waves-effect waves-light btn white-text">Back</router-link>
      </div>
      <div class="col m5 center">
        <img :src="show.image" class="card">
      </div>
    </div>
  </div>
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
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.background {
  width: 100%;
  height: 100vh;
}
.genres {
  vertical-align: top;
}
table {
  font-size: 13pt;
}
ul {
  margin: 0;
}
.btn {
  margin-top: 1rem;
}
img {
  margin-top: 5rem;
  width: 341px;
  height: 192px;
}
</style>
