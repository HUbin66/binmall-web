<template>
  <BaseCard>
    <div class="col-2"></div>
    <div class="col-8">
      <ProBraCatNavbar />
      <div class="welcoom_text">
        欢迎进入管理员界面，通过点击上方导航完成指令！
      </div>
    </div>
    <div class="col-2"></div>
  </BaseCard>
</template>
  
  <script>
import ProBraCatNavbar from '../../components/por_bra_cat_navbar.vue'
import BaseCard from '@/components/BaseCard.vue';
export default {
  name: 'AdminHome',
  components: {
    ProBraCatNavbar,
    BaseCard,
  }
}
  </script>
  
  <style scoped>
.welcoom_text {
  font-size: 30px;
}
</style>
  
  
  