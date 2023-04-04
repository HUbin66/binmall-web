const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 更换ip
    host: '192.168.132.1',

    // 更换端口号
    port: 8888,
  }
})
