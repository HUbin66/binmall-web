<template>
  <button
    type="button"
    class="btn btn-lg btn-outline-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@mdo"
  >
    加入购物车
  </button>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" id="myModel">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">短信登录</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">手机号:</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="请输入手机号(未注册过的手机号会自动注册)"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">验证码:</label>
              <input
                v-model="password"
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="请输入验证码"
              />
            </div>
          </form>
        </div>

        <div class="error_msg text-center" style="color: red">
          {{ error_msg }}
        </div>

        <!-- 下面部分 -->
        <div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <div class="row">
                <div class="col-2 weibo_img">
                  <img src="../assets/tbimages/微博.png" alt="" class="" />
                </div>

                <div class="col-2">
                  <span class="btn">
                    <a
                      href="https://api.weibo.com/oauth2/authorize?client_id=2940488952&response_type=code&redirect_uri=http://192.168.132.1:8888/loginjump"
                      >微博登录</a
                    >
                  </span>
                </div>

                <div class="col-4">
                  <button
                    type="button"
                    @click="SongCode()"
                    class="btn btn-primary btn_bottom"
                  >
                    发送验证码
                  </button>
                </div>
                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-primary btn_bottom"
                    @click="Login()"
                  >
                    登入/注册
                  </button>
                </div>
              </div>
            </div>

            <div class="col-2"></div>
          </div>

          <!-- //微博 -->
        </div>
      </div>
    </div>
  </div>
</template>
      
      <script >
import { ref } from 'vue';
import $ from 'jquery';
// import router from '@/router';
import storage from '@/utils/storageUtils.vue';

export default {
  emits: ['ChangeStatus'],
  name: 'CartLoginView',
  components: {

  },
  setup(props, context) {
    let user = ref({
      codeCheck: "",
      id: "",
      username: "",
      password: "",
      nickname: "",
      mobile: "",
      email: "",
      header: "",
      gender: "",
      birth: "",
      city: "",
      job: "",
      sign: "",
      accessToken: "",
      expiresIn: "",
    })


    let username = ref("");
    let password = ref("");
    let error_msg = ref("");

    const Login = () => {
      $.ajax({
        url: "http://192.168.80.3:80/api/auth/login",
        type: "POST",
        data: {
          phone: username.value,
          code: password.value,
        },
        success(resp) {
          console.log(resp.data);
          user.value = resp.data;

          storage.set("user.codeCheck", user.value.codeCheck);
          storage.set("user.username", user.value.username);
          storage.set("user.mobile", user.value.mobile);
          storage.set("user.id", user.value.id);
          storage.set("user.nickname", user.value.nickname);
          storage.set("user.email", user.value.email);
          storage.set("user.gender", user.value.gender);
          storage.set("user.accessToken", user.value.accessToken);
          storage.set("user.expiresIn", user.value.expiresIn);
          storage.set("user.socialUid", user.value.socialUid);

          var status = resp.data.codeCheck;
          if (status == "false") {
            error_msg.value = "验证码错误";
          } else {
            $(".btn-close").trigger("click");
            context.emit("ChangeStatus");
          }
        }
      })
    }

    const SongCode = () => {
      $.ajax({
        url: "http://192.168.80.3:80/api/third/sms/SongCode",
        type: "POST",
        data: {
          phone: username.value
        },
        success() {
          console.log("username");
          console.log(username.value);

        }
      })
    }
    return {
      user,
      error_msg,
      Login,
      username,
      password,
      SongCode,
    }
  }
}
      </script>
      
      <style  scoped>
.error_msg {
  font-size: 30px;
}
.btn_bottom {
  margin-top: 10px;
}
.weibo_img {
  height: 50px;
  width: 50px;
}
.weibo {
  width: 50px;
  height: 50px;
}
</style>