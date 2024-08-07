<template>
  <div v-if="visible" class="overlay">
    <div class="popup">
      <button class="close-button" @click="closePopup">×</button>
      <div class="icon">
        <span v-if="isError">
          <font-awesome-icon class="err-icon" icon="fa-solid fa-circle-exclamation" />
        </span>
        <span v-else>
          <font-awesome-icon class="success-icon" icon="fa-solid fa-circle-check" />
        </span>
      </div>
      <div class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closePopup() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 300px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.message {
  font-size: 18px;
}

.err-icon {
  color: #f11919;
}

.success-icon {
  color: #1ee206;
}
</style>
