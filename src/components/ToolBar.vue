<template>
  <form @submit.prevent class="tool-bar">
    <div class="tool-item">
      <label for="search">
        <input
          id="search"
          name="search"
          type="text"
          class="search-input"
          v-model="searchInput"
          @input="handleSearch"
          placeholder="Search products..."
        />
      </label>
    </div>

    <div class="tool-item">
      <label for="sort-by"><b>Sort by: </b></label>
      <select id="sort-by" name="sort-by" v-model="sortBy" @change="handleSort">
        <option value="title">Title</option>
        <option value="category">Category</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
      </select>
    </div>

    <div class="tool-item">
      <label for="filter-by"><b>Filter By: </b></label>
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
  async created() {
    this.allCategories = await this.fetchCategories();
  },
  methods: {
    handleSearch() {
      this.$emit("search-products", this.searchInput);
    },
    handleSort() {
      this.$emit("sort-products", this.sortBy);
    },
    handleFilter() {
      this.$emit("filter-products", this.filterBy);
    },
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
