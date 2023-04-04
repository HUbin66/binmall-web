<template>
  <div class="col-12">
    <div class="text-center">
      <img
        :src="userImg"
        alt=""
        v-if="userImg != null"
        class="img-thumbnail img-fluid user_img"
        referrerpolicy="no-referrer"
      />
      <img
        src="../assets/tbimages/Tom.jpg"
        alt=""
        v-else
        class="img-thumbnail img-fluid user_img"
      />
    </div>

    <div class="user_name_plate">
      <div class="user_name_text text-center" style="text-align: center">
        Hi! 你好
        <span class="user_name">{{ username }}</span>
      </div>
    </div>

    <!-- <div class="text-center"> -->
    <div class="row">
      <div class="col-12 login_btn m-auto" v-if="status != 'true'">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-5"><LoginView /></div>
        </div>
      </div>

      <div class="col-12 login_btn m-auto" v-else>
        <div class="row">
          <div class="col-4">
            <button
              type="button"
              class="btn btn-lg btn-outline-primary"
              @click="MyOrderes()"
            >
              我的订单
            </button>
          </div>
          <div class="col-4">
            <button
              type="button"
              class="btn btn-lg btn-outline-primary"
              @click="LoginOut()"
            >
              退出登录
            </button>
          </div>
          <div class="col-4">
            <button
              v-if="username == '15971181330'"
              type="button"
              class="btn btn-lg btn-outline-primary"
              @click="AdminProduct()"
            >
              管理物品
            </button>
            <button
              v-else
              type="button"
              class="btn btn-lg btn-outline-primary"
              @click="UpProduct()"
            >
              上架物品
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- </div> -->

    <div class="my_tb">
      <div class="row">
        <div class="col-3 text-center">
          <span class="colle_goods">
            <img class="icon" src="../assets/tbimages/收藏.png" alt="" />
            <div class="colle_goods_text">宝贝收藏</div>
          </span>
        </div>

        <div class="col-3 text-center">
          <span class="used_store">
            <img class="icon" src="../assets/tbimages/包包.png" alt="" />
            <div class="Used_store_text">买过的店</div>
          </span>
        </div>

        <div class="col-3 text-center">
          <span class="colle_store">
            <img class="icon" src="../assets/tbimages/店铺.png" alt="" />
            <div class="Used_store_text">收藏的店</div>
          </span>
        </div>

        <div class="col-3 text-center">
          <span class="collection">
            <img class="icon" src="../assets/tbimages/时钟.png" alt="" />
            <div class="Used_store_text">我的足迹</div>
          </span>
        </div>
      </div>
    </div>

    <div class="user_status"></div>
  </div>
  <!-- <div class="col-2">111</div> -->
</template>
  
  <script>
import { ref } from '@vue/reactivity';
import LoginView from './LoginView.vue';

import storage from '@/utils/storageUtils.vue';
import router from '@/router';
export default {
  name: 'UserStatus',
  components: {
    LoginView,
  },
  setup() {

    let btnName = "登入";
    let status = ref("");
    let username = ref("");
    let userImg = ref("");
    console.log("header")
    console.log(storage.get("user.header"));
    if (typeof (storage.get("user.header")) != "undefined") {
      userImg.value = storage.get("user.header");
    }

    username.value = storage.get("user.nickname");
    status.value = storage.get("user.codeCheck");

    console.log("userImg")
    console.log(userImg.value);

    const AdminProduct = () => {
      router.push({
        name: "addbrand"
      })
    }

    const UpProduct = () => {
      router.push({
        name: "addproducttest"
      })
    }

    const MyOrderes = () => {
      router.push({
        name: "ordersuccess"
      })
    }

    const LoginOut = () => {
      storage.set("user.socialUid", null);
      storage.set("user.codeCheck", null);
      storage.set("user.username", null);
      storage.set("user.mobile", null);
      storage.set("user.id", null);
      storage.set("user.nickname", null);
      storage.set("user.email", null);
      storage.set("user.gender", null);
      storage.set("user.accessToken", null);
      storage.set("user.expiresIn", null);
      storage.set("user.header", null);
      status.value = "false";
      var num = Math.floor(Math.random() * 100 + 1);
      console.log("num");
      console.log(num);
      router.push({
        name: "home",
        params: {
          random: num,
        }
      })
    }
    return {
      AdminProduct,
      UpProduct,
      MyOrderes,
      btnName,
      userImg,
      LoginOut,
      username,
      status,
    }
  }
}
  </script>
  
  <style scoped>
.user_name {
  font-weight: 700;
}
.login_btn {
  padding-left: 0px;
}
.my_tb {
  margin-top: 50px;
  margin-bottom: 50px;
}
.col-3 {
  padding: 0px;
}
.icon {
  width: 40px;
}
.regiest_btn {
  margin-right: 30px;
}

.user_name_plate {
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.user_name {
  font-size: 25px;
}
.col-2 {
  padding: 0px;
}
.col-8 {
  padding: 0px;
}
.user_img {
  border-width: 3px;
  border-color: lightblue;
  margin-top: 30px;
  border-radius: 50%;
  width: 100px;
}
</style>
  
  
  