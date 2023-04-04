 <template>
  <div class="cat_menu">
    <div class="all_cat_menu text-start">选择当前商品的种类</div>
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

  <div class="brand_menu">
    <!-- 当前种类下的品牌 -->
    <div class="ThisBrandWhichCat text-start">当前种类下的品牌</div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-3">
        <!-- 品牌种类 -->
        <div class="first_cat">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-danger dropdown-toggle cat_btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ brand_text }}
            </button>
            <ul class="dropdown-menu">
              <li
                class="Fcat"
                v-for="(brand, index) in brandList"
                :key="index"
                @click="SelectBrand(brand)"
              >
                {{ brand }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-5"></div>
    </div>
  </div>

  <div class="input_region">
    <div class="pro_info text-start">商品SPU相关信息</div>

    <div class="input-group mb-3 input-group-lg">
      <input
        v-model="productname"
        type="text"
        class="form-control"
        placeholder="输入商品名称"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
    </div>

    <div class="input-group mb-3 input-group-lg">
      <input
        v-model="product_des"
        type="text"
        class="form-control"
        placeholder="输入商品的描述"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
    </div>
  </div>

  <div class="input-group mb-3 input-group-lg">
    <input
      v-model="weight"
      type="text"
      class="form-control"
      placeholder="输入商品重量"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
  </div>

  <!-- 商品介绍展示 -->
  <div class="spu_des_img cover_img">
    <div class="img_text text-start sspx">商品介绍展示</div>
    <div class="input-group mb-3">
      <input
        type="file"
        class="form-control"
        id="UploadSpuDesImg"
        placeholder="上传封面"
      />
      <div class="input-group-text" @click="UploadSpuDesImg">上传</div>
    </div>
    <BaseCard>
      <div v-for="(img_url, index) in spu_des_url" :key="index" class="col-3">
        <img class="img-fluid" :src="img_url" alt="" />
        <button
          v-if="img_url != ''"
          type="button"
          class="btn btn-danger del_btn"
          @click="DelDesImg(index)"
        >
          Danger
        </button>
      </div>
    </BaseCard>
  </div>

  <div class="mult_img">
    <div class="img_text text-start sspx">SPU图片集展示</div>
    <!-- 上传图片集 -->
    <div class="up_mult_img">
      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          id="UploadMultImg_Id"
          placeholder="上传图片集"
        />
        <!-- <label class="input-group-text" for="inputGroupFile02">上传</label>  -->
        <div class="input-group-text" id="UploadMultImg" @click="UploadMultImg">
          上传
        </div>
      </div>
      <BaseCard>
        <div v-for="(img_url, index) in mult_url" :key="index" class="col-3">
          <img class="img-fluid" :src="img_url" alt="" />
          <button
            v-if="img_url != ''"
            type="button"
            class="btn btn-danger del_btn"
            @click="DelMultImg(index)"
          >
            Danger
          </button>
        </div>
      </BaseCard>
    </div>
  </div>

  <button type="button" class="btn btn-primary" @click="NextStep()">
    下一步：设置参数规格
  </button>
</template>
    
<script>
import { useStore } from 'vuex';
import $ from "jquery"
import router from '@/router';
import { ref } from '@vue/reactivity'
import BaseCard from '../BaseCard.vue';
export default {
  name: 'AddProductInfo',
  components: {
    BaseCard
  },
  setup() {
    const store = useStore();
    let version_max = ref("");
    //v-model
    let productname = ref("");
    let product_des = ref("");
    let weight = ref("");

    // GetFcid
    let first_cat_text = ref("");
    let FirstCat = ref("");

    //GetScid
    let SecondCat = ref("");
    let second_cat_text = ref("")

    // GetTcid
    let ThirdCat = ref("");
    let third_cat_text = ref("");

    //attr
    let Attr_Tcid = ref("")
    let attrs = ref("");

    // brand
    let brandList = ref("");
    let brand_text = ref("");


    // img
    let count = 0;
    let count_des = 0;
    let spu_des_url = ref([]);
    let spu_des_img = ref([]);
    let mult_url = ref([]);
    let mult_img = ref([]);

    const NextStep = () => {
      store.state.productinfo.productname = productname.value;
      store.state.productinfo.product_des = product_des.value;
      store.state.productinfo.weight = weight.value;
      store.state.productinfo.spu_des_url = spu_des_url.value;
      store.state.productinfo.mult_url = mult_url.value;
      store.state.productinfo.brand = brand_text.value;
      store.state.productinfo.cid = store.state.versionUtil.Attr_Tcid;
      router.push({
        name: "addproductattrs",
      })
    }

    const DelMultImg = (index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/del",
        type: "POST",
        data: {
          filename: mult_img.value[index],
        },
        success() {
          alert("删除图片集成功");
          mult_url.value[index] = "";
          count--;
          console.log(count);
        }
      })
    }

    const UploadMultImg = () => {
      var f = document.getElementById("UploadMultImg_Id").files[0];
      let formData = new FormData();
      formData.append("imgs", f);
      var date = new Date()
      var month = '';
      var day = '';
      if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
      } else {
        month = (date.getMonth() + 1);
      }
      if (date.getDate() < 10) {
        day = '0' + date.getDate()
      } else {
        day = date.getDate()
      }
      var time = date.getFullYear() + "-" + month + "-" + day;
      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/addmult",
        type: "POST",
        contentType: false,  //不要使用任何编码，django后端能够自动识别formdata对象
        processData: false,  //告诉浏览器不要对你的数据进行任何处理
        traditional: true,
        data: formData,
        success() {
          alert("成功发送图片集");
          mult_url.value[count] = "https://binmall.oss-cn-hangzhou.aliyuncs.com/" + time + '/' + f.name
          mult_img.value[count] = time + '/' + f.name;
          count += 1;
        }
      })
    }

    const DelDesImg = (index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/del",
        type: "POST",
        data: {
          filename: spu_des_img.value[index],
        },
        success() {
          alert("删除成功");
          spu_des_url.value[index] = "";
          count_des--;
        }
      })
    }

    const UploadSpuDesImg = () => {
      var f = document.getElementById("UploadSpuDesImg").files[0];
      let formData = new FormData();
      formData.append("img", f);
      var date = new Date()
      var month = '';
      var day = '';
      if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
      } else {
        month = (date.getMonth() + 1);
      }

      if (date.getDate() < 10) {
        day = '0' + date.getDate()
      } else {
        day = date.getDate()
      }

      var time = date.getFullYear() + "-" + month + "-" + day;

      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/add",
        type: "POST",
        contentType: false,  //不要使用任何编码，django后端能够自动识别formdata对象
        processData: false,  //告诉浏览器不要对你的数据进行任何处理
        data: formData,
        success() {
          alert("成功发送图片");
          spu_des_url.value[count_des] = "https://binmall.oss-cn-hangzhou.aliyuncs.com/" + time + '/' + f.name
          spu_des_img.value[count_des] = time + '/' + f.name;
          count_des += 1;
        }
      })
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
      store.state.version.cid = Tcid;
      store.state.versionUtil.Attr_Tcid = Tcid;
      Attr_Tcid.value = Tcid;

      if (Attr_Tcid.value == null) {
        console.log("!null")
      } else {
        console.log("null")
      }
      third_cat_text.value = TcatName;
      $.ajax({
        url: "http://192.168.80.3:80/api/product/brand/GetBrandsByCat",
        type: "POST",
        data: {
          TcatName: TcatName,
        },
        success(resp) {
          brandList.value = resp.data;
          console.log(resp.data);
        }
      })
      $.ajax({
        url: "http://192.168.80.3:80/api/product/attr/GetAttrsByCategory",
        type: "POST",
        data: {
          Tcid: Tcid,
        },
        success(resp) {
          attrs.value = resp.data;
          store.state.versionUtil.attrs = resp.data;
        }
      })
    }

    const SelectBrand = (brandname) => {
      brand_text.value = brandname;
    }

    $.ajax({
      url: 'http://192.168.80.3:80/api/product/category/GetFirstCat',
      type: "POST",
      success(resp) {
        first_cat_text.value = "一级分类";
        second_cat_text.value = "二级分类";
        third_cat_text.value = "三级分类";
        brand_text.value = "品牌目录";
        version_max.value = 1;
        FirstCat.value = resp.data;
        console.log(resp.data);
      }
    })


    return {
      count_des,
      product_des,
      weight,
      productname,
      NextStep,
      DelMultImg,
      mult_url,
      mult_img,
      UploadMultImg,
      DelDesImg,
      spu_des_url,
      spu_des_img,
      UploadSpuDesImg,
      version_max,
      FirstCat,
      attrs,
      SelectBrand,
      brandList,
      brand_text,
      GetTcid,
      third_cat_text,
      second_cat_text,
      first_cat_text,
      GetFcid,
      SecondCat,
      ThirdCat,
      GetScid,
    }
  }
}
    </script>
    <style scoped>
</style>
  