import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'normalize.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**************************************************** 
 * このVueプロジェクト内で利用したいアイコンのインポート
 ****************************************************/
/* 利用したいアイコンをインポート（複数ある場合はカンマ区切りで登録可能） */
import {
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";

library.add(faCaretRight);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
