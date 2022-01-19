<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text to="/logout" v-if="$store.state.authenticated">
        <v-icon>mdi-logout</v-icon>
        logout
      </v-btn>
      <v-btn text color="primary" to="/login" v-else>
        <v-icon>mdi-login</v-icon>
        login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Auth from "@/plugins/auth"
export default Vue.extend({
  async middleware ({store, $cookies }) {
    // methodやcomputedはページ遷移時に評価されないのでmiddlewareでstoreの認証ステータスを更新する
    // https://nuxtjs.org/docs/concepts/views
    let authenticated = Auth.authenticated($cookies)
    store.commit("setAuthenticated", authenticated)
  },
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Users',
          to: '/users/'
        }
      ],
      title: 'QuickStart',
    }
  },
})
</script>
