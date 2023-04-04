<template>
  <div style="font-size: 30px">跳转页面...</div>
</template>
    
    <script>
import { ref } from 'vue';
import $ from 'jquery'
import router from '@/router';
import storage from '@/utils/storageUtils.vue';

export default {
  name: 'LoginJump',
  components: {

  },
  setup() {
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


    let code_text = window.location.href;
    let code = ref("");
    for (var i = 0; i < code_text.length; i++) {
      if (code_text[i] == '=') {
        code.value = code_text.substr(i + 1);
      }
    }

    $.ajax({
      url: "http://192.168.80.3:80/api/auth/loginWB",
      type: "POST",
      data: {
        code: code.value
      },
      success(resp) {
        console.log(resp.data);
        user.value = resp.data;
        user.value.codeCheck = "true";
        storage.set("user.codeCheck", user.value.codeCheck);
        storage.set("user.username", user.value.username);
        storage.set("user.mobile", user.value.mobile);
        storage.set("user.id", user.value.id);
        storage.set("user.nickname", user.value.nickname);
        storage.set("user.email", user.value.email);
        storage.set("user.gender", user.value.gender);
        storage.set("user.accessToken", user.value.accessToken);
        storage.set("user.expiresIn", user.value.expiresIn);
        storage.set("user.header", user.value.header);
        storage.set("user.socialUid", user.value.socialUid);

        router.push({
          name: "home",
          params: { random: 0, }
        })
        alert("登录成功！");
      }
    })


    return {

    }
  }
}
    </script>
    
    <style scoped>
</style>
    
    
    