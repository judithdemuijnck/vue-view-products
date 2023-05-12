<template>
  <section>
    <ToolBar
      @search-products="handleSearch"
      @sort-products="handleSort"
      @filter-products="handleCategoryFilter"
    />
    <p v-if="!products || products.length === 0">Loading...</p>
    <div v-else class="products-wrapper">
      <ProductPreview
        v-for="product in products"
        :key="product.id"
        v-bind="product"
      />
    </div>
  </section>
</template>

<script>
import ProductPreview from "../components/ProductPreview.vue";
import ToolBar from "../components/ToolBar.vue";
import { mapState } from "vuex";

//see if I can get watchers to work, then I can use v-sync for filters / don't have to use v-model

export default {
  name: "HomeView",

  components: {
    ProductPreview,
    ToolBar,
  },

  async created() {
    this.$store.dispatch("getAllProducts");
  },

  computed: mapState(["products"]),

  methods: {
    async handleSearch(searchTerm) {
      this.$store.dispatch("getSearchResults", searchTerm);
    },

    async handleSort(sortBy) {
      if (sortBy !== "--") {
        this.$store.commit("sortProducts", sortBy);
      } else {
        this.$store.dispatch("getAllProducts");
      }
    },

    async handleCategoryFilter(category) {
      if (category === "all") {
        this.$store.dispatch("getAllProducts");
      } else {
        this.$store.dispatch("getFilteredProducts", category);
      }
    },
  },
};
</script>

<style scoped>
.products-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
