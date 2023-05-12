<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue Store</h1>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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

main {
  display: flex;
  justify-content: center;
}
</style>
