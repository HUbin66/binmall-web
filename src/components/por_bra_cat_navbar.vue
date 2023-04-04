<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Bin</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              品牌管理
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="addbrand">新增品牌</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="delbrand">删除品牌</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="updatebrand"
                  >修改品牌</a
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              种类管理
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="addcategory"
                  >新增种类</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="delcategory"
                  >删除种类</a
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              属性管理
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="addattr">新增属性</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="addattrvalue"
                  >新增属性值</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="updateattr"
                  >修改属性</a
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              商品管理
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="uppro">上架商品</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="addpro">新增商品</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="delpro">删除商品</a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="updatepro"
                  >修改商品</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <!-- <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>
    
    <script>
import router from '@/router'

export default {
  name: 'ProBraCatNavbar',
  components: {

  },
  setup() {
    const uppro = () => {
      router.push({
        name: "uppro"
      })
    }
    const addbrand = () => {
      router.push({
        name: "addbrand"
      })
    }
    const delbrand = () => {
      router.push({
        name: "delbrand"
      })
    }
    const updatebrand = () => {
      router.push({
        name: "updatebrand"
      })
    }
    const addcategory = () => {
      router.push({
        name: "addcategory"
      })
    }
    const delcategory = () => {
      router.push({
        name: "delcategory"
      })
    }
    const updatecategory = () => {
      router.push({
        name: "updatecategory"
      })
    }

    const addattr = () => {
      router.push({
        name: "addattr"
      })
    }

    const addattrvalue = () => {
      router.push({
        name: "addattrvalue"
      })
    }

    const addpro = () => {
      router.push({
        name: "addproducttest"
      })
    }
    const delpro = () => {
      router.push({
        name: "delproduct"
      })
    }



    return {
      uppro,
      addpro,
      delpro,
      addattr,
      addattrvalue,
      addcategory,
      delcategory,
      updatecategory,
      addbrand,
      delbrand,
      updatebrand
    }
  }
}
    </script>
    
    <style scoped>
.nav-item {
  margin-right: 30px;
}
.navbar-brand {
  font-size: 30px;
}
.nav-link {
  font-size: 30px;
}
.dropdown-item {
  font-size: 30px;
}
</style>
    
    
    