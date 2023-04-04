<template>
  <div>1</div>
</template>


<script>
const storage = {
  setToken(value) {
    localStorage.setItem("token", JSON.stringify(value));
  },
  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  },
  rmToken() {
    localStorage.removeItem("token");
  },
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
};

export default storage;


</script>


<style scoped>
</style>