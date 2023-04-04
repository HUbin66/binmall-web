<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    添加地址
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增收货人信息</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 收货物人名字 -->
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2"
                >收货物人名字</span
              >
              <input
                v-model="address.name"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">联系人电话</span>
              <input
                v-model="address.phone"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="col-7">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">所在省份：</span>
              <input
                v-model="address.province"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="col-7">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">所在城市：</span>
              <input
                v-model="address.city"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="col-7">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">所在区域：</span>
              <input
                v-model="address.region"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="col-7">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2"
                >详细地址及门牌号：</span
              >
              <input
                v-model="address.detailAddress"
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-12 input-group mb-3">
              <span class="input-group-text default_check" id="basic-addon2"
                >是否设置为默认地址：</span
              >
              <span class="form-check">
                <input
                  v-model="address.defaultStatus"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            关闭
          </button>
          <button type="button" @click="saveAddress()" class="btn btn-primary">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { ref } from 'vue';
import $ from 'jquery'
import storage from '@/utils/storageUtils.vue';
import router from '@/router';
export default {
  name: 'AddressModel',
  components: {

  },
  setup() {
    let address = ref({
      /**
         * member_id
         */
      memberId: storage.get("user.id"),
      /**
       * 收货人姓名
       */
      name: "",
      /**
       * 电话
       */
      phone: "",
      /**
       * 省份/直辖市
       */
      province: "",
      /**
       * 城市
       */
      city: "",
      /**
       * 区
       */
      region: "",
      /**
       * 详细地址(街道)
       */
      detailAddress: "",
      /**
       * 是否默认
       */
      defaultStatus: Boolean,
    })

    const saveAddress = () => {
      console.log(address.value)
      $.ajax({
        url: "http://192.168.80.3:80/api/member/memberreceiveaddress/SaveMemberAddress",
        type: "POST",
        data: {
          address: JSON.stringify(address.value)
        },
        success(resp) {
          console.log(resp.data);
          // 生成0~100之间的随机数
          var num = Math.floor(Math.random() * (100 - 0 + 1)) + 0
          router.push({
            name: "orderinfo",
            params: {
              num: num,
            }
          })
          $('.modal-backdrop').remove();//去除黑幕
          $('.modal-open').css("overflow-y", "scroll");  //添加滚动条方法
        }
      })
    }

    return {
      address,
      saveAddress
    }
  }
}
    </script>
    
    <style scoped>
.form-check-input {
  zoom: 150%;
}
.default_check {
  border: 0px;
}
.input-group-text {
  background-color: aliceblue;
}
</style>
    
    
    