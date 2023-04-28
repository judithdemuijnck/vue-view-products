<template>
  <article class="product-preview">
    <!-- how can I destructure props here? -->
    <h4 v-if="isLoading">Loading...</h4>
    <img :src="images[0]" @load="isLoading = false" />

    <h3 class="product-category">{{ category }}</h3>

    <h2>{{ title }}</h2>
    <p>{{ description }}</p>

    <h3 class="product-price">£{{ price }}</h3>
    <p>{{ stock }} left in stock...</p>
  </article>
</template>

<script>
export default {
  name: "ProductItem",
  data() {
    return {
      isLoading: true,
    };
  },
  props: {
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    stock: { type: Number },
    images: {
      type: Array,
      default() {
        return [];
      },
    }, // is this the correct way of declaring an array of strings here? in TS it would be string[] or Array<string>, which is not accepted by eslint
  },
};
</script>

<style scoped>
.product-preview {
  width: 300px;
  margin: 10px 5px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
  position: relative;
}

img {
  width: 90%;
}

.product-category {
  color: #787878;
  font-weight: 200;
  font-size: 1em;
  text-align: right;
  margin: 0;
}

.product-price {
  color: #4a8ee1;
}

@media screen and (max-width: 767px) {
  .product-preview {
    width: 100%;
  }
}
</style>
