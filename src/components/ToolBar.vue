<template>
  <form @submit.prevent class="tool-bar">

    <!-- in this instance v-model shouldn't be used as we're propagating multiple values back out to the parent component, it can be done but it is not the cleanest solution  -->

    <!-- v-model="searchInput" removed -->
    <div class="tool-item">
      <label for="search">
        <input
          id="search"
          name="search"
          type="text"
          class="search-input"
          :value="search"
          @input="handleSearch"
          placeholder="Search products..."
        />
      </label>
    </div>

    <div class="tool-item">
      <label for="sort-by"><b>Sort by: </b></label>

      <!-- v-model="sortBy" removed -->

      <select id="sort-by" name="sort-by" :value="sort" @change="handleSort">
        <option value="title">Title</option>
        <option value="category">Category</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
      </select>
    </div>

    <div class="tool-item">
      <label for="filter-by"><b>Filter By: </b></label>

      <!-- v-model="filterBy" removed -->

      <select
        id="filter-by"
        name="filter-by"
        v-model="filterBy"
        @change="handleFilter"
      >
        <option value="all">All Categories</option>
        <option
          v-for="category in allCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "ToolBar",

  data() {
    return {
      searchInput: "",
      sortBy: "title",
      allCategories: [],
      filterBy: "all",
    };
  },

  // the above should be declared as props enabling the ability to
  // pass in values to be declared in the template.

  props: {
    search: {
      type: String,
      default: "",
    },
    sort: {
      type: String,
      default: "title",
    },
    category: {
      type: String,
      default: "all",
    },
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },


  async created() {

    // check if there is custom categories passed in then default to calling fetch categories
    // if (this.categories.lenth === 0) {
    //   const items = await this.fetchCategories();
    //   this.$emit("update:categories", items);
    // }

    this.allCategories = await this.fetchCategories();
  },
  methods: {
    handleSearch(e) {
      // causes `search` prop to update
      this.$emit("update:search", e.target.value);

      this.$emit("search-products", this.searchInput);
    },
    handleSort(e) {
      // causes `sort` prop to update
      this.$emit("update:sort", e.target.value);

      this.$emit("sort-products", this.sortBy);

    },
    handleFilter(e) {
      // causes `category` prop to update
      this.$emit("update:category", e.target.value);

      this.$emit("filter-products", this.filterBy);
    },

    // should be declared in action.js file
    async fetchCategories() {
      try {
        const data = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        return data.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.tool-bar {
  display: flex;
  justify-content: space-around;
  background-color: #41b883;
  flex-wrap: wrap;
  padding: 10px;
  align-items: center;
  box-shadow: 0 5px 15px #34495e6a;
  border-radius: 5px;
}

#search {
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px 15px #34495e1a;
  padding: 5px;
  padding-left: 10px;
  width: 200px;
  background-color: white;
}

#sort-by,
#filter-by {
  border: none;
  background-color: transparent;
}

@media screen and (max-width: 767px) {
  .tool-item {
    width: 100%;
    padding: 5px 8px;
    text-align: left;
  }
}
</style>
