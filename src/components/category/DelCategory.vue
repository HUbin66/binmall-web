<template>
  <BaseCard>
    <div class="col-3"></div>
    <div class="col-6">
      <ProBraCatNavbar />
      <BaseCard>
        <div class="add_text text-start">删除种类</div>
        <!-- Example single danger button -->

        <div class="cat_menu">
          <div class="all_cat_menu text-start">全部种类菜单浏览表</div>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-3">
              <!-- 一级分类 -->
              <div class="first_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ first_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Fcat in FirstCat"
                      :key="Fcat.cid"
                      @click="GetFcid(Fcat.cid, Fcat.fcat)"
                    >
                      {{ Fcat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-3">
              <!-- 二级分类 -->
              <div class="second_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ second_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Scat in SecondCat"
                      :key="Scat.cid"
                      @click="GetScid(Scat.cid, Scat.fcat)"
                    >
                      {{ Scat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3">
              <!-- 三级分类 -->
              <div class="third_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ third_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Tcat in ThirdCat"
                      :key="Tcat.cid"
                      @click="GetTcid(Tcat.cid, Tcat.fcat)"
                    >
                      {{ Tcat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>

        <div class="input_region">
          <!-- 所删除分类的级别 -->
          <div class="add_cat_level">
            <div class="row">
              <div class="col-3">
                <div class="add_cat_level_text text-start">
                  所删除分类的级别
                </div>
              </div>
              <div class="col-6">
                <div class="input-group mb-3 input-group-lg">
                  <input
                    v-model="cat_level"
                    type="text"
                    class="form-control"
                    placeholder="输入所删除分类的级别：1或2或3"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 所删除节点的名字 -->
          <div class="add_Son_cat">
            <div class="row">
              <div class="col-3">
                <div class="add_Son_cat_text text-start">所删除节点的名字</div>
              </div>
              <div class="col-6">
                <div class="input-group mb-3 input-group-lg">
                  <input
                    v-model="Son_cat_name"
                    type="text"
                    class="form-control"
                    placeholder="输入删除节点的名字"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="error-message">{{ error_message }}</div>
          <button
            class="btn btn-primary btn-lg mx-auto"
            type="submit"
            @click="del_cat_submit"
          >
            提交
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
import $ from 'jquery';
import { ref } from 'vue';

export default {
  name: "AddCat",
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {
    let first_cat_text = ref("");
    let second_cat_text = ref("");
    let third_cat_text = ref("");
    let FirstCat = ref("");
    let SecondCat = ref("");
    let ThirdCat = ref("");
    let cat_level = ref("");
    let Father_cat_name = ref("");
    let Son_cat_name = ref("");
    let error_message = ref("");

    $.ajax({
      url: 'http://192.168.80.3:80/api/product/category/GetFirstCat',
      type: "POST",
      success(resp) {
        first_cat_text.value = "一级分类";
        second_cat_text.value = "二级分类";
        third_cat_text.value = "三级分类";
        FirstCat.value = resp.data;
        console.log(resp.data);
      }
    })

    const del_cat_submit = () => {
      error_message.value = '';
      if (cat_level.value != 1 && cat_level.value != 2 && cat_level.value != 3) {
        error_message.value += '级别输入不合法 '
      }
      if (error_message.value == '') {
        $.ajax({
          url: "http://192.168.80.3:80/api/product/category/DelCat",
          type: "POST",
          data: {
            catname: Son_cat_name.value,
            catlevel: cat_level.value,
          },
          success(resp) {
            if (resp.data == '成功') {
              alert("种类删除成功");
            } else {
              error_message.value = resp.data;
            }
          }

        })
      }

    }

    const GetFcid = (Fcid, FcatName) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/category/GetSecondCat",
        type: "POST",
        data: {
          Fcid: Fcid,
        },
        success(resp) {
          first_cat_text.value = FcatName;
          SecondCat.value = resp.data;
          console.log(SecondCat.value);
        }
      })
    }

    const GetScid = (Scid, ScatName) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/category/GetThirdCat",
        type: "POST",
        data: {
          Scid: Scid,
        },
        success(resp) {
          second_cat_text.value = ScatName;
          ThirdCat.value = resp.data;
          console.log(ThirdCat.value);
        }
      })
    }

    const GetTcid = (Tcid, TcatName) => {
      console.log(TcatName)
      third_cat_text.value = TcatName;
    }



    return {
      del_cat_submit,
      error_message,
      Son_cat_name,
      cat_level,
      GetTcid,
      third_cat_text,
      second_cat_text,
      first_cat_text,
      GetFcid,
      FirstCat,
      SecondCat,
      ThirdCat,
      GetScid,
      Father_cat_name,

    }
  }


}

  </script>

  
  <style scoped>
.error-message {
  color: red;
  font-size: 30px;
}
.all_cat_menu {
  margin-bottom: 20px;
}
.cat_menu {
  margin-top: 50px;
}
.input_region {
  margin-top: 50px;
}
.btn {
  width: 200px;
}
.add_Son_cat_text {
  font-size: 30px;
}
.add_Father_cat_text {
  font-size: 30px;
}
.add_cat_level_text {
  font-size: 30px;
}
.all_cat_menu {
  margin-top: 20px;
  font-size: 25px;
}
.Fcat {
  cursor: pointer;
  font-size: 20px;
}
.cat_btn {
  width: 250px;
  height: 50px;
}

.add_text {
  font-size: 30px;
}
</style>