<template>
<div>
  <v-row>
    <v-col class="text-center">
      <VuetifyLogo></VuetifyLogo>
    </v-col>
    <v-col class="text-center">
      <NuxtLogo></NuxtLogo>
    </v-col>
  </v-row>

  <v-list dense>
    <v-subheader>Links</v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item
      v-for="(item, i) in items"
      :to="item.to"
      :key="i"
      >
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      selectedItem: 1,
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
      ]
    }
  }
}
</script>
