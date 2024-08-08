<template>
  <h2 id="contact-form-title">お問い合わせフォーム</h2>
  <form>
    <div class="form-group">
      <label for="lastName">姓<span class="required">必須</span></label>
      <input
        type="text"
        id="lastName"
        v-model="form.lastName"
        name="lastName"
        required
      />
    </div>
    <div class="form-group">
      <label for="firstName">名<span class="required">必須</span></label>
      <input
        type="text"
        id="firstName"
        v-model="form.firstName"
        name="firstName"
        required
      />
    </div>
    <div class="form-group">
      <label for="company">企業・団体名<span class="required">必須</span></label>
      <input
        type="text"
        id="company"
        v-model="form.company"
        name="company"
        placeholder="例）zenport株式会社"
        required
      />
    </div>
    <div class="form-group">
      <label for="phone">電話番号<span class="required">必須</span></label>
      <input
        type="tel"
        id="phone"
        v-model="form.phone"
        name="phone"
        pattern="[0-9]+"
        placeholder="例）08011112222（ハイフンなし、半角数字のみ）"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">メールアドレス<span class="required">必須</span></label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        name="email"
        required
      />
    </div>
    <div class="form-group">
      <label for="inquiry">お問い合わせ内容<span class="required">必須</span></label>
      <select id="inquiry" v-model="form.inquiry" name="inquiry" required>
        <option value="" disabled selected>お問い合わせ内容を選択</option>
        <option value="option1">サービスに関するお問い合わせ</option>
        <option value="option2">無料相談</option>
      </select>
    </div>
    <div class="form-group">
      <label for="remarks">備考</label>
      <textarea id="remarks" v-model="form.remarks" name="remarks"></textarea>
    </div>
    <button class="submit-btn" :disabled="!isFormValid" type="button" @click="sendMail">
      <span>送信</span>
      <font-awesome-icon class="caret-right" icon="fa-solid fa-caret-right" />
    </button>
  </form>
  <popup
    v-if="popupVisible"
    :isError="popupIsError"
    :message="popupMessage"
    @close="popupVisible = false"
  />
</template>

<script lang="ts">
import popup from "./popup.vue";

export default {
  components: {
    popup,
  },
  data() {
    return {
      form: {
        lastName: "",
        firstName: "",
        company: "",
        phone: "",
        email: "",
        inquiry: "",
        remarks: "",
      },
      errors: [],
      popupVisible: false,
      popupIsError: false,
      popupMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.lastName &&
        this.form.firstName &&
        this.form.company &&
        this.form.phone &&
        this.form.email &&
        this.form.inquiry
      );
    },
  },
  methods: {
    validateForm() {
      this.errors = [];

      if (!this.form.lastName) this.errors.push("姓は必須項目です。");
      if (!this.form.firstName) this.errors.push("名は必須項目です。");
      if (!this.form.email) {
        this.errors.push("メールは必須項目です。");
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push("有効なメールアドレスを入力してください。");
      }
      if (!this.form.phone) this.errors.push("電話番号は必須項目です。");
      if (!this.form.inquiry) this.errors.push("お問い合わせ内容は必須項目です。");

      return this.errors.length === 0;
    },
    validEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
    async sendMail() {
      if (!this.validateForm()) {
				this.popupIsError = true;
        this.popupMessage = this.errors.join("\n");
        this.popupVisible = true;
        return;
      }

      const { lastName, firstName, company, phone, email, inquiry, remarks } =
        this.form;
      const templateParams = {
        fullName: `${lastName} ${firstName}`,
        company,
        phone,
        email,
        inquiry,
        remarks,
      };

      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
              template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              user_id: import.meta.env.VITE_EMAILJS_USER_ID,
              template_params: templateParams,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        this.popupIsError = false;
        this.popupMessage = "メールを送信しました！\n返信までしばらくお待ちください。";
        this.popupVisible = true;
        this.resetForm();
      } catch (error) {
        console.error("Failed to send email:", error);
        this.popupIsError = true;
        this.popupMessage =
          "メールの送信に失敗しました。後ほど再度お試しください。";
        this.popupVisible = true;
      }
    },
    resetForm() {
      this.form = {
        lastName: "",
        firstName: "",
        company: "",
        phone: "",
        email: "",
        inquiry: "",
        remarks: "",
      };
    },
  },
};
</script>

<style scoped>
#contact-form-title {
  text-align: center;
  font-weight: 600;
  font-size: 3rem;
  margin: 9rem 0 6rem;
  color: #074199;
}
form {
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
}

label {
  font-weight: bold;
  position: relative;
  line-height: 4rem;
  flex: 2;
  font-size: 1.6rem;
  color: #074199;
  min-width: 220px;
  margin-right: 24px;
}

.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  flex: 5;
  padding: 2px 8px;
  font-size: 1.6rem;
}

textarea {
  height: 16rem;
}

.required {
  color: white;
  margin: 0 5px;
  border-radius: 4px;
  background: #074199;
  padding: 4px 8px;
  text-align: center;
  font-size: 12px;
  right: 0;
  line-height: 1rem;
  top: 1rem;
  position: absolute;
}

select option {
  appearance: none;
  font-size: 22px;
}

.submit-btn {
  font-weight: 600;
  font-size: 2rem;
  background-color: #fb9130;
  color: aliceblue;
  width: 300px;
  text-align: center;
  margin: 40px auto;
  padding: 18px;
  border-radius: 100px;
  box-shadow: inset 5px 4px 4px 0 #fcb06a,
    /* インナーシャドウ */ 0px 4px 4px 0px rgba(0, 0, 0, 0.25); /* ドロップシャドウ */
  display: block;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
	box-shadow:none;
}

.submit-btn .caret-right {
  position: absolute;
  right: 16px;
}

@media (max-width: 768px) {
  #contact-form-title {
    font-size: 2.4rem;
    margin: 6rem 0 3rem;
  }

  form {
    width: 90%;
  }

  .form-group {
    margin-bottom: 8px;
    display: block;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 6px 8px;
    display: block;
    width: 100%;
  }

  .required {
    top: 1.2rem;
  }

  label {
    position: relative;
    line-height: 4rem;
    font-size: 1.6rem;
    width: 18rem;
    min-width: 160px;
    margin-right: 24px;
    display: block;
  }

  .submit-btn {
    width: 90%;
  }
}
</style>