export default {
  setProducts(state, payload) {
    state.products = payload.products;
  },

  sortProducts(state, sortBy) {
    state.products.sort((a, b) => {
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

  setProduct(state, payload) {
    state.product = payload.product;
  },
};
