<script setup>
</script>

<template>
  <div v-if="isMobile">
    <img src="../public/fv-sp.png" alt="" width="100%">
    <img src="../public/onayami-sp.png" alt="" width="100%">
    <img src="../public/reason1-sp.png" alt="" width="100%">
    <img src="../public/reason2-sp.png" alt="" width="100%">
    <img src="../public/reason3-sp.png" alt="" width="100%">
    <img src="../public/table.png" alt="" width="100%">
    <img src="../public/cta-btn-sp.png" alt="" width="100%">
    <img src="../public/flow-sp.png" alt="" width="100%">
  </div>
  <div v-else>
    <img src="../public/fv-pc.png" alt="" width="100%">
    <ctaButton class="cta-first"/>
    <img src="../public/onayami-pc.png" alt="" width="100%">
    <img src="../public/reason1-pc.png" alt="" width="100%">
    <img src="../public/reason2-pc.png" alt="" width="100%">
    <img src="../public/reason3-pc.png" alt="" width="100%">
    <img src="../public/table.png" alt="" width="100%">
    <img src="../public/cta-btn-pc.png" alt="" width="100%">
    <img src="../public/flow-pc.png" alt="" width="100%">
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue';
import ctaButton from './components/ctaButton.vue'

export default defineComponent({
  components: {
    ctaButton
  },
  setup() {
    const isMobile = ref<boolean>(window.innerWidth <= 768);

    const handleResize = (): void => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted((): void => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount((): void => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isMobile
    };
  }
});
</script>

<style scoped>
.cta-first {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: -105px;
}
</style>
