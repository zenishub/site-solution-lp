<script setup>
</script>

<template>
  <div v-if="isMobile">
    <div class="top-image-container">
      <img src="../public/fv-sp.png" alt="" width="100%">
      <ctaButton class="cta-btn"/>
    </div>
    <img src="../public/onayami-sp.png" alt="" width="100%">
    <img src="../public/reason1-sp.png" alt="" width="100%">
    <img src="../public/reason2-sp.png" alt="" width="100%">
    <img src="../public/reason3-sp.png" alt="" width="100%">
    <tableSection/>
    <div class="cta-back-image-container">
      <img src="../public/cta-btn-sp.png" alt="" width="100%">
      <ctaButton class="cta-btn"/>
    </div>
    <img src="../public/flow-sp.png" alt="" width="100%">
    <contactForm/>
  </div>
  <div class="pc-view" v-else>
    <div class="top-image-container">
      <img src="../public/fv-pc.png" alt="" width="100%">
      <ctaButton class="cta-btn"/>
    </div>
    <img src="../public/onayami-pc.png" alt="" width="100%">
    <img src="../public/reason1-pc.png" alt="" width="100%">
    <img src="../public/reason2-pc.png" alt="" width="100%">
    <img src="../public/reason3-pc.png" alt="" width="100%">
    <tableSection/>
    <div class="cta-back-image-container">
      <img src="../public/cta-btn-pc.png" alt="" width="100%">
      <ctaButton class="cta-btn"/>
    </div>
    <img src="../public/flow-pc.png" alt="" width="100%">
    <contactForm/>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount, defineComponent } from 'vue';
import ctaButton from './components/ctaButton.vue'
import contactForm from './components/contactForm.vue'
import tableSection from './components/tableSection.vue'

export default defineComponent({
  components: {
    ctaButton,
    contactForm,
    tableSection,
  },
  setup() {
    const isMobile = ref<boolean>(window.innerWidth <= 768);

    const handleResize = (): void => {
      isMobile.value = window.innerWidth <= 768;
    };

    onBeforeUnmount((): void => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isMobile,
    };
  }
});
</script>

<style scoped>
.pc-view {
  max-width: 1000px;
  margin: auto;
}

.top-image-container, .cta-back-image-container {
  position: relative;
}

.cta-btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 26px;
}

@media (max-width: 768px) {
  .cta-btn {
    bottom: 30px;
  }
}
</style>
