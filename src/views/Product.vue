<template>
  <section>
    <router-link to="/">Return</router-link>
    <div v-if="Object.keys(product).length > 0" class="product-container">
      <Carousel :images="product.images" :title="product.title" />
      <h2>{{ product.title }}</h2>
      <div class="infos">
        <h3>{{ product.brand }}</h3>
        <StarRating :rating="product.rating" />
        <h3>{{ product.category }}</h3>
      </div>
      <p>{{ product.description }}</p>
      <h3 class="price">£{{ product.price }}</h3>
      <h3 class="stock">{{ product.stock }} left in stock...</h3>
    </div>
    <h2 v-else>Loading...</h2>
  </section>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import StarRating from "@/components/StarRating.vue";
import { mapState } from "vuex";
export default {
  name: "ProductView",

  components: {
    Carousel,
    StarRating,
  },

  created() {
    this.$store.dispatch("getProduct", this.$route.params.productId);
  },

  computed: mapState(["product"]),
};
</script>

<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70vw;
}

h2 {
  font-size: 2em;
  font-weight: 700;
}

.infos {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.infos h3 {
  font-weight: 100;
  color: #787878;
}

.price {
  color: #41b883;
}

.stock {
  font-weight: 100;
}
</style>
