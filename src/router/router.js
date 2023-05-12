import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home.vue";
import Product from "../views/Product.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/product/:productId", component: Product },
];

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes,
});

export default router;
