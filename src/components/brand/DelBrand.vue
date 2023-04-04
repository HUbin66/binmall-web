<template>
  <BaseCard>
    <ProBraCatNavbar />
    <div class="tips">暂定应为删除品牌可能会删除旗下所有产品</div>
  </BaseCard>
</template>
  
  <script>
import ProBraCatNavbar from '../por_bra_cat_navbar.vue'
import BaseCard from '../BaseCard.vue';

export default {
  name: "DelCat",
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {

    const SubAddBrand = () => {

    }

    return {
      SubAddBrand
    }
  }


}

  </script>

  
  <style scoped>
.tips {
  font-size: 100px;
}
.btn {
  zoom: 150%;
}
.check-input-lg {
  zoom: 200%;
}
.yes_text {
  font-size: 30px;
}
.no_text {
  font-size: 30px;
}
.exhibition_text {
  font-size: 30px;
}
.add_text {
  font-size: 30px;
  margin-bottom: 30px;
}
.form-label {
  font-size: 30px;
}
</style>