<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  background-image: url("@/assets/ic_main_bg.jfif");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #16171e;
  font-family: "Roboto", sans-serif;
}

@media (min-width: 1220px) {
  .view-container {
    width: 64%;
    margin-left: 18%;
  }
}

@media (min-width: 1020px) and (max-width: 1220px) {
  .view-container {
    width: 70%;
    margin-left: 15%;
  }
}
@media (max-width: 1019px) {
  .view-container {
    padding: 10px;
  }
}
</style>
