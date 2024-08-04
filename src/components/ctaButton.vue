<template>
  <div class="cta-button">
    <span>無料ご相談受付中！</span>
    <font-awesome-icon class="caret-right" icon="fa-solid fa-caret-right" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChildComponent',
});
</script>

<style scoped>
* {
  font-size: 2.6rem;
}
.cta-button {
  font-weight: bold;
  background-color: #FB9130;
  color: aliceblue;
  width: 400px;
  display: block;
  text-align: center;
  margin: auto;
  padding: 18px;
  border-radius: 100px;
  box-shadow: inset 5px 4px 4px 0 #FCB06A, /* インナーシャドウ */
              0px 4px 4px 0px rgba(0, 0, 0, 0.25); /* ドロップシャドウ */
  position: relative;
  cursor: pointer;
}
.cta-button span {
  margin-left: 2.6rem;
}
.caret-right{
  position: absolute;
  left: 3rem;
}
</style>