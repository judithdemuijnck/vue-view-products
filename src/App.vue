<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <h1>Vue Store</h1>

    <!-- seeing that there is multiple filters v-model isn't the best suited way of handling multiple prop values changing .sync is more suited in this situation -->

    <ToolBar v-bind.sync="filters" />

    <!--
      these aren't needed custom events should only be used in certain instances

      apply filters isn't one as it be 

      unless to you need to run a method, in this instances running a method isn't required
      as everything can be done on client side

      @search-products="handleSearch"
      @sort-products="handleSort"
      @filter-products="handleFilter"

    -->

    {{ JSON.stringify(filters) }}

    <p v-if="products.length === 0">Loading...</p>

    <div v-else class="products-wrapper">
      <Product v-for="product in list" :key="product.id" v-bind="product" />
      <!-- v-bind acts as a spread operator - props need to be declared in the component you had them all inclosed in product object prop  -->
      <!-- Docs say I should be able to pass in product as v-bind="product" but this doesn't work. Why? -->
    </div>
  </div>
</template>

<script>

// use a lib called `vuex` to handle the state - synthetix cloud 


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

      // you have 3 filter types so why not declare them here? enabling you to keep track what is be applied inside the child component

      filters: {
        search: "",
        sort: "title",
        category: "all",
      },
    };
  },

  async created() {
    // am I making the API call in the right stage of the lifecycle? ------ Yes you are
    const data = await this.fetchData();
    this.products = data;
  },

  computed: {
    // create a computed hook which mutates the product state but preserves product state.
    // example below

    // this means filters will always be applied, currently it only apply filters 
    
    // set a sort type of category

    list() {
      let items = structuredClone(this.products);

      const { search, sort, category } = this.filters;

      // apply mutation logic here

      if (sort) {
        items = items.sort((a, b) => {
          if (typeof a[sort] === "string") {
            return a[sort].localeCompare(b[sort]);
          }
          
          if (a[sort] < b[sort]) {
            return -1;
          }
          if (a[sort] > b[sort]) {
            return 1;
          }

          return 0;
        });

      }

      // example of handling the search on the client side

      if (search.trim()) {
        items = this.handleClientSearch(items, search.trim());
      }

      if (category !== "all") {
        items = items.filter(x => x.category == category);
      }


      return items;
    },
  },

  methods: {
    // fetchData , handleSearch , handleFilter should be separated into actions.js
    // and purely handle send http requests not setting state

    async fetchData() {
      try {
        const data = await axios.get("https://dummyjson.com/products");
        return data.data.products;
      } catch (e) {
        console.error(e);
      }
    },

    // can the filter not be handled on cliet? example below
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

    handleClientSearch(items, value) {
      return items.filter(
        (x) =>
          x["category"]?.toLowerCase().includes(value.toLowerCase()) ||
          x["description"]?.toLowerCase().includes(value.toLowerCase()) ||
          x["title"]?.toLowerCase().includes(value.toLowerCase()) ||
          x["brand"]?.toLowerCase().includes(value.toLowerCase())
      );
    },

    // never directly mutate main state

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

    // can the filter not be handled on client? api doesn't seem to return any additional products when a category is passed?
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
