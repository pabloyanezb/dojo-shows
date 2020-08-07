import Vue from "vue";
import VueRouter from "vue-router";

import Shows from "../components/Shows";
import ShowDetails from "../components/ShowDetails";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Shows,
    },
    {
      path: "/details/:id",
      component: ShowDetails,
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
});
