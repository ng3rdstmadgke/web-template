<template>
<div>
  <Alert ref="alert" alertType="error" :message="$data.alertMessage"></Alert>
  <v-form ref="form" v-model="valid" lazy-validattion>
    <v-text-field
      v-model="$data.username"
      :rules="usernameRules"
      :counter="30"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
      type="password"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit" >submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Alert from '~/components/Alert.vue'
import {Util} from '@/plugins/common'

export default Vue.extend({
  middleware: ['auth'], // middleware/auth.js

  data() {
    return {
      username: "",
      password: "",
      alertMessage: "",
      valid: true,
      usernameRules: [
        (v: string): (boolean | string) => {return !!v || "Username is required"},
        (v: string): (boolean | string) => {return ((v?.length ?? 0) <= 30) || "Username is too long"},
      ],
      passwordRules: [
        (v: string): (boolean | string) => {return !!v || "Password is required"},
        (v: string): (boolean | string) => {return ((v?.length ?? 0) <= 30) || "Password is too long"},
        (v: string): (boolean | string) => {return ((v?.length ?? 0) >= 8) || "Password is too short"},
      ],
    }
  },

  components: {
    Alert: Alert
  },

  // サーバーサイドの処理
  async asyncData(context) {
    // contextのメンバ: https://nuxtjs.org/docs/internals-glossary/context/
    // awaitを利用してresponseを同期的に受け取ることもできる
    // let response = await context.$axios.get(`http://127.0.0.1:8000/api/v1/open/users/${context.params.userId}`)
    return context.$axios.get(`http://127.0.0.1:8000/api/v1/users/${context.params.userId}`)
      .then(res => {
        return {username: res.data.username}
      })
      .catch(e => {
        Util.redirectErrorPage(context, e);
      })
  },

  methods: {
    async submit () {
      let success = (this.$refs.form as HTMLFormElement).validate();
      if (success) {
        let data = {
          username: this.username,
          password: this.password,
        }
        // 現在のURLを取得する: https://qiita.com/TK-C/items/caab322156872d546331
        this.$axios.put(`//127.0.0.1:8000/api/v1/users/${this.$route.params.userId}`, data)
          .then(res => {
            this.$router.push({path: "/users"})
          })
          .catch(e => {
            this.$data.alertMessage = Util.getAlertMessage(e);
            (this.$refs.alert as any).open();
          })
      }
    },
    clear () {
      (this.$refs.form as HTMLFormElement).reset();
    },
  },
})
</script>
