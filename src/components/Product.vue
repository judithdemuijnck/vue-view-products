<template>
  <article class="product-preview">
    <!-- how can I destructure props here? -->
    <h4 v-if="isLoading">Loading...</h4>
    <img :src="product.images[0]" @load="isLoading = false" />
    <h3 class="product-category">{{ product.category }}</h3>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <h3 class="product-price">£{{ product.price }}</h3>
    <p>{{ product.stock }} left in stock...</p>
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
    product: {
      id: Number,
      title: String,
      description: String,
      price: Number,
      category: String,
      stock: Number,
      images: [String], // is this the correct way of declaring an array of strings here? in TS it would be string[] or Array<string>, which is not accepted by eslint
    },
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
