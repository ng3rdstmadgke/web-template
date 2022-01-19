import { Context } from "@nuxt/types"
import { AxiosError } from 'axios'
/**
 * 共通関数を定義する。
 * 
 * [usage]
 * ```nuxt.config.js
 * export default {
 *   plugins: [
 *     '@/plugins/common.ts'
 *   ],
 * }
 * ``` 
 * 
 * ```pages/login.vue
 * <script>
 * import {Util} from '@/plugins/common'
 * 
 * export default Vue.extend({
 *   methods: {
 *     submit(): void {
 *       let message = Util.getAlertMessage(...)
 *     }
 *   }
 * })
 * </script>
 * ```
 */
export class Util {
  // layout/error.vueへ遷移する
  // https://nuxtjs.org/ja/docs/internals-glossary/context#error
  public static redirectErrorPage({error}: Context, e: AxiosError) {
    error({
      statusCode: e.response?.status ?? 500,
      message: e.response?.statusText ?? "Internal Server Error",
    })
  }

  // v-alertに表示するメッセージを取得する
  public static getAlertMessage(e: any): string {
    // エラー内容をJSONで見たいとき
    // console.error(e.toJSON())
    if (e.response) {
      return `${e.response.status} ${e.response.statusText}: ${e.response.data.detail}`
    } else {
      return `An error occurred: ${e.message}`
    }

  }
}
