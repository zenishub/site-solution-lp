<script setup>
</script>

<template>
  <div v-if="isMobile">
    <img src="../public/fv-sp.png" alt="" width="100%">
    <ctaButton ref="ctaSpButtonEl" :style="{ marginTop: ctaSpMarginTop + 'px' }" class="cta-first"/>
    <img src="../public/onayami-sp.png" alt="" width="100%">
    <img src="../public/reason1-sp.png" alt="" width="100%">
    <img src="../public/reason2-sp.png" alt="" width="100%">
    <img src="../public/reason3-sp.png" alt="" width="100%">
    <tableSection/>
    <img ref="ctaSpButtonBackEl" src="../public/cta-btn-sp.png" alt="" width="100%">
    <ctaButton ref="ctaSpButtonEl" :style="{ marginTop: ctaSpMarginTop + 'px' }" class="cta-first"/>
    <img src="../public/flow-sp.png" alt="" width="100%">
    <contactForm/>
  </div>
  <div v-else>
    <img src="../public/fv-pc.png" alt="" width="100%">
    <ctaButton ref="ctaPcButtonEl" :style="{ marginTop: ctaPcMarginTop + 20 + 'px' }" class="cta-first"/>
    <img src="../public/onayami-pc.png" alt="" width="100%">
    <img src="../public/reason1-pc.png" alt="" width="100%">
    <img src="../public/reason2-pc.png" alt="" width="100%">
    <img src="../public/reason3-pc.png" alt="" width="100%">
    <tableSection/>
    <img ref="ctaPcButtonBackEl" src="../public/cta-btn-pc.png" alt="" width="100%">
    <ctaButton ref="ctaPcButtonEl" :style="{ marginTop: ctaPcMarginTop + 'px' }" class="cta-first"/>
    <img src="../public/flow-pc.png" alt="" width="100%">
    <contactForm/>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue';
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
    const ctaPcButtonBackEl = ref<HTMLElement | null>(null);
    const ctaPcButtonEl = ref<HTMLElement | null>(null);
    const ctaSpButtonBackEl = ref<HTMLElement | null>(null);
    const ctaSpButtonEl = ref<HTMLElement | null>(null);
    const ctaPcMarginTop = ref(0);
    const ctaSpMarginTop = ref(0);

    const resizeCtaPcBtnMargin = () => {
      if (ctaPcButtonBackEl.value){
        ctaPcMarginTop.value = -ctaPcButtonBackEl.value.offsetHeight*0.6;
      }
    };
    const resizeCtaSpBtnMargin = () => {
      if (ctaSpButtonBackEl.value){
        ctaSpMarginTop.value = -ctaSpButtonBackEl.value.offsetHeight*0.6;
      }
    };

    const handleResize = (): void => {
      isMobile.value = window.innerWidth <= 768;
    };

    let resizeObserver: ResizeObserver;
    onMounted((): void => {
      window.addEventListener('resize', handleResize);      
      resizeCtaPcBtnMargin();
      if (ctaPcButtonBackEl.value) {
        resizeObserver = new ResizeObserver(resizeCtaPcBtnMargin);
        resizeObserver.observe(ctaPcButtonBackEl.value);
      }
      if (ctaSpButtonBackEl.value) {
        resizeObserver = new ResizeObserver(resizeCtaSpBtnMargin);
        resizeObserver.observe(ctaSpButtonBackEl.value);
      }
    });

    onBeforeUnmount((): void => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isMobile,
      ctaPcButtonBackEl,
      ctaPcButtonEl,
      ctaPcMarginTop,
      ctaSpButtonBackEl,
      ctaSpButtonEl,
      ctaSpMarginTop,
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
