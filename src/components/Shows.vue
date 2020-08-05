<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12">
        <h3 class="center-align">Shows:</h3>
        <table class="striped">
          <thead>
            <th>Title</th>
            <th>Network</th>
            <th>Seasons</th>
            <th>Is Current</th>
            <th>Genres</th>
          </thead>
          <tbody>
            <tr v-for="show in showsInOrder" :key="show.id">
              <td>{{ show.title }}</td>
              <td>{{ show.network }}</td>
              <td class="center-align">{{ show.numberOfSeasons }}</td>
              <td class="center-align">{{ show.isCurrent }}</td>
              <td>{{ show.genres.join(' / ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'; 
export default {
  name: 'Shows',
  data() {
    return {
      shows: []
    }
  },
  firestore() {
    return {
      shows: db.collection('shows')
    }
  },
  computed: {
    showsInOrder() {
      let shows = this.shows;
      shows.sort((a,b) => a.title.localeCompare(b.title));
      return shows;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
