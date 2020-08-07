<template>
 <div class="row">
  <div class="col s12 m12">
    <h4>Edit Show</h4>
    <form class="card blue-grey darken-4 white-text" @submit.prevent="Edit">
      <div class="row">
        <div class="input-field col m7">
          <input id="title" type="text" class="validate" required v-model="title">
          <label for="title" class="active">Title</label>
        </div>
        <div class="input-field col m3">
          <input id="network" type="text" class="validate" required v-model="network">
          <label for="network" class="active">Network</label>
        </div>
        <div class="input-field col m2">
          <input id="numberOfSeasons" type="number" class="validate" required v-model="numberOfSeasons">
          <label for="numberOfSeasons" class="active">Number of Seasons</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m7">
          <input id="genres" type="text" class="validate" required v-model="genres">
          <label for="genres" class="active">Genres</label>
        </div>
        <div class="input-field col m5">
          <input id="genres" type="text" class="validate" required v-model="image">
          <label for="genres" class="active">Image
            <i class="material-icons blue-grey-text text-darken-2">insert_link</i>
          </label>
        </div>
        
      </div>
      <div class="row">
        <div class="col m7 offset-m1 grey-text text-lighten-1 radios">
          Is Current:
          <label>
            <input name="isCurrent" type="radio" required v-model="isCurrent" :value="true"/>
            <span>Yes</span>
          </label>
          <label>
            <input name="isCurrent" type="radio" required v-model="isCurrent" :value="false"/>
            <span>No</span>
          </label>
        </div>
        <div class="col m3 offset-m1">
          <button type="submit" class="waves-effect waves-light btn white-text">Edit</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { db } from '@/firebase';

export default {
  name: 'Edit',
  data() {
    return {
      show: '',
      title: '',
      network: '',
      numberOfSeasons: '',
      isCurrent: null,
      genres: [],
      image: ''
    }
  },
  mounted() {
    db.collection("shows").doc(this.$route.params.id).get()
    .then(datos => {
      const show = datos.data();
      this.show = show;
      this.title = show.title;
      this.network = show.network;
      this.numberOfSeasons = show.numberOfSeasons;
      this.isCurrent = show.isCurrent;
      this.genres = show.genres;
      if (Array.isArray(show.genres)){
        this.genres = show.genres.join(',')
      }
      this.image = show.image;
    })
  },
  methods: {
    Edit() {
      db.collection("shows").doc(this.$route.params.id).update({
        title: this.title,
        network: this.network,
        numberOfSeasons: parseInt(this.numberOfSeasons),
        isCurrent: this.isCurrent,
        genres: this.genres.split(',', 5),
        image: this.image
      })
      .then(() => {
        this.$router.push('/')
      })
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
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
form .row {
  margin-bottom: 0;
}
span {
  margin-left: 1rem;
}
.btn {
  width: 100%;
}
label {
  transform: translateY(-14px) scale(0.8) !important;
  transform-origin: 0 0 !important;
}
i {
  vertical-align: bottom;
}
</style>
