<template>
  <BaseCard class="my_card">
    <div class="col-6">
      <img class="img-fluid good_img" :src="good.cover_img" alt="" />
    </div>
    <div class="col-6">
      <div class="good_name text-start">
        <!-- 适用苹果13/14手机壳iPhone12ProMax气囊11防摔XR新款7/8Plus透明se3保护Xs套男X镜头高级感女款S硅胶7全包2 -->
        {{ good.good_name }}
      </div>

      <div class="brand text-start">
        <span class="good_brand_text">
          <button type="button" class="btn btn-primary">品牌方：</button>
        </span>
        <span class="good_brand">{{ good.brand }}</span>
      </div>

      <div class="price text-start">
        <span class="good_price_text">￥</span>
        <span class="good_price">{{ good.price }}</span>
      </div>
    </div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from './BaseCard.vue';
export default {
  name: 'GoodsDisplay',
  props: {
    good: {
      typeof: Object,
      require: true,
    },
  },
  components: {
    BaseCard,
  },
  setup() {
    return {
      // cover_img,
      // brand,
      // price,
    }
  }
}
    </script>
    
    
    <style scoped>
.my_card {
  cursor: pointer;
}
.brand {
  margin-top: 25px;
}
.price {
  margin-top: 25px;
}
.good_price_text {
  color: rgb(255, 80, 24);
  font-size: 20px;
}
.good_price {
  color: rgb(255, 80, 24);
  font-size: 30px;
}

.good_brand_text {
  color: gray;
  font-size: 20px;
}
.good_brand {
  margin-left: 20px;
  font-size: 20px;
  font-weight: bolder;
}

.my_card {
  border-radius: 30px;
}
.good_img {
  border-radius: 30px;
}
.good_name {
  font-family: "宋体";
  font-size: 25px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
    
    
    