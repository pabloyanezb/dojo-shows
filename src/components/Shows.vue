<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12">
        <h3>All Shows:</h3>
        <table class="striped card blue-grey lighten-4">
          <thead>
            <th>Title</th>
            <th>Network</th>
            <th>Seasons</th>
            <th>Is Current</th>
            <th>Genres</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="show in showsInOrder" :key="show.id">
              <td>
                <router-link :to="{ path: `/details/${show.id}`}" class="teal-text text-accent-4 title">
                  {{ show.title }}
                </router-link>
              </td>
              <td>{{ show.network }}</td>
              <td class="center-align">{{ show.numberOfSeasons }}</td>
              <td class="center-align">
                <i class="material-icons" v-if="show.isCurrent">check</i>
                <i class="material-icons" v-if="!show.isCurrent">close</i>
              </td>
              <td>{{ show.genres.join(' / ') }}</td>
              <td>
                <router-link :to="{ path: `/edit/${show.id}`}">
                  <i class="material-icons blue-grey-text text-darken-2">edit</i>
                </router-link>
              </td>
              <td>
                <a href="" @click="Delete(show.id)">
                  <i class="material-icons blue-grey-text text-darken-2">delete</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12">
        <h4>Add a Show</h4>
        <form class="card blue-grey darken-4 white-text" @submit.prevent="addShow">
          <div class="row">
            <div class="input-field col m8">
              <input id="title" type="text" class="validate" required v-model="title">
              <label for="title">Title</label>
            </div>
            <div class="input-field col m4">
              <input id="network" type="text" class="validate" required v-model="network">
              <label for="network">Network</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col m8">
              <input id="genres" type="text" class="validate" required v-model="genres">
              <label for="genres">Genres</label>
              <div class="row">
                <label for="genres" class="example">Example: "Action,Drama,Sci-Fi"</label>
              </div>
            </div>
            <div class="input-field col m4">
              <input id="numberOfSeasons" type="number" class="validate" required v-model="numberOfSeasons">
              <label for="numberOfSeasons">Number of Seasons</label>
            </div>
          </div>
          <div class="row">
            <div class="col m8 offset-m1 grey-text text-lighten-1">
              Is Current:
              <label>
                <input name="isCurrent" type="radio" required checked v-model="isCurrent" :value="true"/>
                <span>Yes</span>
              </label>
              <label>
                <input name="isCurrent" type="radio" required v-model="isCurrent" :value="false"/>
                <span>No</span>
              </label>
            </div>
            <div class="col m3">
              <button type="submit" class="waves-effect waves-light btn white-text">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import M from 'materialize-css';

export default {
  name: 'Shows',
  data() {
    return {
      shows: [],
      title: '',
      network: '',
      numberOfSeasons: '',
      isCurrent: null,
      genres: []
    }
  },
  methods: {
    addShow() {
      db.collection('shows').add({
        title: this.title,
        network: this.network,
        numberOfSeasons: parseInt(this.numberOfSeasons),
        isCurrent: this.isCurrent,
        genres: this.genres.split(',', 5)
      })
      this.title = '';
      this.network = '';
      this.numberOfSeasons = '';
      this.isCurrent = null;
      this.genres = [];
    },
    Delete(id) {
      if (window.confirm("Are you sure you want to delete this show?")) { 
        db.collection('shows').doc(id).delete();
        M.toast({html: 'Show deleted!', classes: 'rounded'})
      }
    },
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
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.title {
  font-weight: bold;
}
form {
  padding: 1rem 2rem;
}
input {
  color: white;
}
.example {
  font-size: 9pt;
  float: right;
  margin-right: 10px;
}
.btn {
  width: 100%;
}
form .row {
  margin-bottom: 0;
}
span {
  margin-left: 1rem;
}
</style>
