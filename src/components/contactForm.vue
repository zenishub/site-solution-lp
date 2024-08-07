<template>
    <h2 id="contact-form-title">お問い合わせフォーム</h2>
    <form @submit.prevent="sendMail">
        <div class="form-group">
            <label for="lastName">姓<span class="required">必須</span></label>
            <input type="text" id="lastName" v-model="form.lastName" name="lastName" required>
        </div>
        <div class="form-group">
            <label for="firstName">名<span class="required">必須</span></label>          
            <input type="text" id="firstName" v-model="form.firstName" name="firstName" required>
        </div>
        <div class="form-group">
            <label for="company">企業・団体名<span class="required">必須</span></label>          
            <input type="text" id="company" v-model="form.company" name="company" placeholder="例）zenport株式会社" required>
        </div>
        <div class="form-group">
            <label for="phone">電話番号<span class="required">必須</span></label>          
            <input type="tel" id="phone" v-model="form.phone" name="phone" pattern="[0-9]+" placeholder="例）08011112222（ハイフンなし、半角数字のみ）" required>
        </div>
        <div class="form-group">
            <label for="email">メールアドレス<span class="required">必須</span></label>          
            <input type="email" id="email" v-model="form.email" name="email" required>
        </div>
        <div class="form-group">
            <label for="inquiry">お問い合わせ内容 <span class="required">必須</span></label>          
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
        <div class="submit-btn">
            <input type="submit" value="送信">
            <font-awesome-icon class="caret-right" icon="fa-solid fa-caret-right" />
        </div>
    </form>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChildComponent',
  data() {
    return {
        form: {
                lastName: '',
                firstName: '',
                company: '',
                phone: '',
                email: '',
                inquiry: '',
                remarks: ''
        }
    }
  },
  methods: {
    async sendMail() {
        const templateParams = {
            fullName: `${this.form.lastName} ${this.form.firstName}`,
            company: this.form.company,
            phone: this.form.phone,
            email: this.form.email,
            inquiry: this.form.inquiry,
            remarks: this.form.remarks
        };
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: "YOUR_ID",
                template_id: "YOUR_ID",
                user_id: "YOUR_ID",
                template_params: templateParams
            })
        });
    }
    }
});
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
    position:relative;
    line-height: 4rem;
    flex:2;
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
    top:1rem;
    position: absolute;
}

select option {
    appearance: none;
    font-size: 22px;
} 

.submit-btn {
    font-weight: 600;
    font-size: 2rem;
    background-color: #FB9130;
    color: aliceblue;
    width: 300px;
    text-align: center;
    margin: 40px auto;
    padding: 18px;
    border-radius: 100px;
    box-shadow: inset 5px 4px 4px 0 #FCB06A, /* インナーシャドウ */
                0px 4px 4px 0px rgba(0, 0, 0, 0.25); /* ドロップシャドウ */
    display: block;
    position: relative;
}

.submit-btn input {
    border:0;
}

.submit-btn .caret-right {
    position: absolute;
    right: 16px;
}
</style>