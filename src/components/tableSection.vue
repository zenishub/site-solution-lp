<template>
  <div class="table-section-container">
    <h2>料金プラン</h2>
    <div class="table-container">
      <div><img src="../../public/table.png" alt=""></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
})
</script>

<style scoped>
.table-section-container {
  background-color: #DEF6F9;
  padding: 6rem 12%;
}
h2 {
  text-align: center;
  font-weight: bold;
  font-size: 4rem;
  color: #074199;
  margin-bottom: 2rem;
}
.table-container img {
  width: 100%;
}

@media (max-width: 768px) {
  .table-section-container {
    padding: 3rem 0;
  }
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .table-container {
    overflow-y: hidden;
    margin-left: 4%;
  }
  .table-container div {
    overflow-y: hidden;
    width: 180%;
  }
  .table-container img {
    overflow-y: scroll;
  }
}
</style>
