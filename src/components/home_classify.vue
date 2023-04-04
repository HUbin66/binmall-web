<template>
  <div class="classify_text text-start">分类</div>

  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/女装.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">女装 / </span>
          <span class="classify_two">内衣 / </span>
          <span class="classify_three">奢品 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/鞋子.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">女鞋 / </span>
          <span class="classify_two">男鞋 / </span>
          <span class="classify_three">箱包 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/美妆类目.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">美妆 / </span>
          <span class="classify_two">饰品 / </span>
          <span class="classify_three">洗护 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/男装.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">男装 / </span>
          <span class="classify_two">运动 / </span>
          <span class="classify_three">百货 </span>
        </span>
      </div>
    </li>

    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/手机.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">手机 / </span>
          <span class="classify_two">数码 / </span>
          <span class="classify_three">礼品 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/沙发.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">家装 / </span>
          <span class="classify_two">电器 / </span>
          <span class="classify_three">车品 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/食品.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">食品 / </span>
          <span class="classify_two">生鲜 / </span>
          <span class="classify_three">母婴 </span>
        </span>
      </div>
    </li>
    <li class="list-group-item">
      <div class="classify">
        <img
          class="icon rounded float-start"
          src="../assets/tbimages/医药.png"
          alt=""
        />
        <span class="classify_info">
          <span class="classify_one">医药 / </span>
          <span class="classify_two">保健 / </span>
          <span class="classify_three">进口 </span>
        </span>
      </div>
    </li>
  </ul>
  <!-- </BaseCard> -->
</template>
  
  <script>
// import BaseCard from './BaseCard.vue';

export default {
  name: 'HomeClassify',
  props: {

  },
  components: {
    // BaseCard,
  }
}
    </script>
    
  <style scoped>
.classify_text {
  font-size: 30px;
  font-family: "宋体";
  font-weight: bold;
  margin-bottom: 30px;
}
.icon {
  width: 30px;
  margin-left: 10px;
}
.classify_one {
  font-size: 20px;
  cursor: pointer;
}
.classify_two {
  font-size: 20px;
  cursor: pointer;
}
.classify_three {
  font-size: 20px;
  cursor: pointer;
}
</style>
  
  
  