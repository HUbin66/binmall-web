<template>
  <div class="contain">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",

}

</script>


<style scoped>
.container {
  margin-top: 20px;
}
</style>