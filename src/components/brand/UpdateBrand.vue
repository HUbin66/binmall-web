<template>
  <BaseCard>
    <div class="col-2"></div>
    <div class="col-8">
      <ProBraCatNavbar />
      <BaseCard>
        <div class="add_text text-start">修改商品</div>

        <div class="addbrand" @click="SubAddBrand">
          <!-- name -->
          <div class="mb-3">
            <div for="exampleInputEmail1" class="form-label text-start">
              品牌名称
            </div>
            <div class="input-group-lg">
              <input
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
                type="text"
                class="form-control input-group-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <!-- 快速展示 -->
          <div class="exhibition">
            <!-- <div class="row">
              <div class="col-3">
                <div class="exhibition_text text-start">是否快速展示：</div>
              </div>
              <div class="col-1">
                <div class="mb-3 form-check">
                  <input
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
                    type="checkbox"
                    class="form-check-input check-input-lg"
                    id="exampleCheck1"
                  />
                  <div class="no_text text-start">否</div>
                </div>
              </div>
              <div class="col-2"></div>
              <div class="col-6"></div>
            </div> -->

            <!-- <span class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">否</label>
            </span> -->
          </div>

          <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </div>
      </BaseCard>
    </div>
    <div class="col-2"></div>
  </BaseCard>
</template>
  
  <script>
import ProBraCatNavbar from '../por_bra_cat_navbar.vue'
import BaseCard from '../BaseCard.vue';

export default {
  name: "UpdateCat",
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