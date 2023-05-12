import axios from "axios";

const baseUrl = "https://dummyjson.com/products";

export default {
  async getAllProducts(context) {
    try {
      const data = await axios.get(baseUrl);
      context.commit("setProducts", {
        products: data.data.products,
      });
    } catch (e) {
      console.error(e);
    }
  },

  async getSearchResults(context, searchTerm) {
    try {
      const searchResults = await axios.get(
        `${baseUrl}/search?q=${searchTerm}`
      );
      context.commit("setProducts", {
        products: searchResults.data.products,
      });
    } catch (e) {
      console.error(e);
    }
  },

  async getFilteredProducts(context, category) {
    // API does return additional products when making this call, which is why I don't handle the filter on the client side
    try {
      const filteredProducts = await axios.get(
        `${baseUrl}/category/${category}`
      );
      context.commit("setProducts", {
        products: filteredProducts.data.products,
      });
    } catch (e) {
      console.error(e);
    }
  },

  async getProduct(context, id) {
    try {
      const data = await axios.get(`${baseUrl}/${id}`);
      context.commit("setProduct", { product: data.data });
    } catch (e) {
      console.error(e);
    }
  },
};
