<template>
    <form @submit.prevent="sendMail">
        <div class="form-group">
            <label for="lastName">姓<span class="required">必須</span></label>
            <input type="text" id="lastName" v-model="form.lastName" name="lastName" placeholder="例）ゼンポート" required>
        </div>
        <div class="form-group">
            <label for="firstName">名<span class="required">必須</span></label>          
            <input type="text" id="firstName" v-model="form.firstName" name="firstName" placeholder="例）太郎" required>
        </div>
        <div class="form-group">
            <label for="company">企業・団体名<span class="required">必須</span></label>          
            <input type="text" id="company" v-model="form.company" name="company" placeholder="例）zenport株式会社" required>
        </div>
        <div class="form-group">
            <label for="phone">電話番号<span class="required">必須</span></label>          
            <input type="tel" id="phone" v-model="form.phone" name="phone" pattern="[0-9]+" placeholder="例）12312341234（ハイフンなし、半角数字のみ）" required>
        </div>
        <div class="form-group">
            <label for="email">メールアドレス<span class="required">必須</span></label>          
            <input type="email" id="email" v-model="form.email" name="email" placeholder="例）info.zenport@gmail.com" required>
        </div>
        <div class="form-group">
            <label for="inquiry">お問い合わせ内容 <span class="required">必須</span></label>          
            <select id="inquiry" v-model="form.inquiry" name="inquiry" required>
                <option value="" disabled selected>お問い合わせ内容を選択</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
        <div class="form-group">
            <label for="remarks">備考</label>
            <textarea id="remarks" v-model="form.remarks" name="remarks"></textarea>
        </div>
        <div class="submit-group">
            
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
form {
    width: 80%;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
}

label {
    display: block;
    font-weight: bold;
    width: 200px;
    position:relative;
    line-height: 4rem;
    flex:2;
    font-size: 2rem;
    color: #074199;
}

input[type="text"],
input[type="tel"],
input[type="email"],
select,
textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    flex: 5;
    padding: 4px;
    font-size: 20px;
}

textarea {
    height: 100px;
}

.required {
    color: white;
    margin: 0 5px;
    border-radius: 4px;
    background: #074199;
    padding: 6px 8px; 
    text-align: center;
    font-size: 12px;
    right: 0;
    line-height: 1rem;
    top:1rem;
    position: absolute;
}

select option{
    appearance: none;
    font-size: 22px;
} 

.submit-group input{
    font-weight: bold;
    font-size: 250%;
    background-color: #FB9130;
    color: aliceblue;
    width: 300px;
    text-align: center;
    margin: 40px auto;
    padding: 18px;
    border-radius: 100px;
    box-shadow: inset 5px 4px 4px 0 #FCB06A, /* インナーシャドウ */
                0px 4px 4px 0px rgba(0, 0, 0, 0.25); /* ドロップシャドウ */
    display: flex;
    border:0;
    position: relative;
    display: flex;
}

.submit-group{
    position: relative;
    display: flex;
}

.caret-right{
  position: absolute;
  left: 62%;
  top: 40%;
  font-size: 2.6rem;
  color: #FFFF;
}
</style>