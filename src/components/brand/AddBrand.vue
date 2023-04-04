<template>
  <BaseCard>
    <div class="col-3"></div>
    <div class="col-6">
      <ProBraCatNavbar />
      <BaseCard>
        <div class="add_text text-start">新增商品</div>

        <div class="addbrand">
          <!-- name -->
          <div class="mb-3">
            <div for="exampleInputEmail1" class="form-label text-start">
              品牌名称
            </div>
            <div class="input-group-lg">
              <input
                v-model="brand_name"
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <!-- log -->
          <div class="mb-3">
            <div for="exampleInputEmail1" class="form-label text-start">
              品牌log
            </div>
            <div class="input-group-lg">
              <input
                v-model="brand_log"
                type="text"
                placeholder="输入图片的url即可"
                class="form-control brand_log input-group-lg"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <!-- des -->
          <div class="mb-3">
            <div for="exampleInputEmail1" class="form-label text-start">
              品牌描述
            </div>
            <div class="input-group-lg">
              <input
                v-model="brand_des"
                type="text"
                class="form-control input-group-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <!-- 快速展示 -->
          <div class="exhibition">
            <div class="row">
              <div class="col-3">
                <div class="exhibition_text text-start">是否快速展示：</div>
              </div>
              <div class="col-1">
                <div class="mb-3 form-check">
                  <input
                    v-model="brand_yes"
                    type="checkbox"
                    class="form-check-input check-input-lg"
                    id="exampleCheck1"
                  />
                  <div class="yes_text text-start">是</div>
                </div>
              </div>
              <div class="col-1">
                <div class="mb-3 form-check">
                  <input
                    v-model="brand_no"
                    type="checkbox"
                    class="form-check-input check-input-lg"
                    id="exampleCheck1"
                  />
                  <div class="no_text text-start">否</div>
                </div>
              </div>
              <div class="col-5">
                <div
                  class="form-check-label text-start exhibition_text_tips"
                  for="exampleCheck1"
                >
                  必填且只能填一个选项
                </div>
              </div>
              <div class="col-2"></div>
            </div>

            <!-- <span class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">否</label>
            </span> -->
          </div>

          <div class="error-message">{{ error_message }}</div>
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            @click="SubAddBrand"
          >
            Submit
          </button>
        </div>
      </BaseCard>
    </div>
    <div class="col-3"></div>
  </BaseCard>
</template>
  
  <script>
import ProBraCatNavbar from '../por_bra_cat_navbar.vue'
import BaseCard from '../BaseCard.vue';
import { ref } from 'vue';
import $ from "jquery";

export default {
  name: "AddCat",
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {
    let error_message = ref("");
    let brand_name = ref("");
    let brand_yes = ref("");
    let brand_no = ref("");
    let brand_log = ref("");
    let brand_des = ref("");
    let brand_result = ref("");


    const SubAddBrand = () => {
      // console.log(brand_yes.value);
      error_message.value = '';
      if ((brand_yes.value == true && brand_no.value == true) || (brand_yes.value == '' && brand_no.value == '') || (brand_yes.value == false && brand_no.value == false)) {
        error_message.value += '快速展示栏非法输入！！  ';
      } else if (brand_yes.value !== '') {
        brand_result.value = 1;
      } else if (brand_no.value !== '') {
        brand_result.value = 0;
      }
      if (brand_des.value == '') {
        error_message.value += '商品描述未填写！！ '
      }
      if (brand_log.value == '') {
        error_message.value += '商品log未填写！！  '
      }
      if (brand_name.value == '') {
        error_message.value += '商品名称未填写！！  '
      }
      if (error_message.value == '') {
        $.ajax({
          url: 'http://192.168.80.3:80/api/product/brand/addbrand',
          type: "POST",
          data: {
            brandname: brand_name.value,
            brandresult: brand_result.value,
            brandlog: brand_log.value,
            branddes: brand_des.value,
          },
          success(resp) {
            if (resp.data === "成功") {
              alert("添加成功!");
              error_message.value = ''
            } else {
              error_message.value = resp.data;
            }
          }
        })
      }




    }

    return {
      error_message,
      brand_result,
      SubAddBrand,
      brand_name,
      brand_yes,
      brand_log,
      brand_des,
      brand_no,
    }
  }


}

  </script>

  
  <style scoped>
.error-message {
  color: red;
  font-size: 25px;
}

.btn {
  zoom: 150%;
}
.exhibition_text_tips {
  font-size: 30px;
  color: gray;
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