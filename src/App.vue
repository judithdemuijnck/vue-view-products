<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue Store</h1>
    <ToolBar
      @search-products="handleSearch"
      @sort-products="handleSort"
      @filter-products="handleFilter"
    />
    <p v-if="products.length === 0">Loading...</p>
    <div v-else class="products-wrapper">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <!-- Docs say I should be able to pass in product as v-bind="product" but this doesn't work. Why? -->
    </div>
  </div>
</template>

<script>
import Product from "./components/Product.vue";
import axios from "axios";
import ToolBar from "./components/ToolBar.vue";

export default {
  name: "App",
  components: {
    Product,
    ToolBar,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    // am I making the API call in the right stage of the lifecycle?
    const data = await this.fetchData();
    this.products = data;
  },
  methods: {
    async fetchData() {
      try {
        const data = await axios.get("https://dummyjson.com/products");
        return data.data.products;
      } catch (e) {
        console.error(e);
      }
    },
    async handleSearch(searchTerm) {
      try {
        const searchResults = await axios.get(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        this.products = searchResults.data.products;
      } catch (e) {
        console.error(e);
      }
    },
    handleSort(sortBy) {
      this.products.sort((a, b) => {
        if (typeof a[sortBy] === "string") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    },
    async handleFilter(filterBy) {
      if (filterBy === "all") {
        const data = await this.fetchData();
        this.products = data;
      } else {
        try {
          const data = await axios.get(
            `https://dummyjson.com/products/category/${filterBy}`
          );
          this.products = data.data.products;
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

.products-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
