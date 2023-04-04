<template>
  <img
    @click="GOTOHOME()"
    class="img-fluid"
    src="../assets/tbimages/Logo.png"
    alt=""
  />
</template>
    
    <script>
import router from '@/router'
export default {
  name: 'LoginView',
  components: {

  },
  setup() {
    const GOTOHOME = () => {
      router.push({
        name: "home",
        params: {
          random: 0
        }
      })
    }
    return {
      GOTOHOME
    }
  }
}
    </script>
    
    <style scoped>
</style>
    
    
    