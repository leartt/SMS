<template>
  <v-col cols="12" sm="6" lg="6">
    <base-material-stats-card
      :color="color"
      :icon="icon"
      :title="title"
      :value="users"
      sub-icon="mdi-align-vertical-bottom"
      sub-text="Total Users"
    />
  </v-col>
</template>

<script>
export default {
    props: ['users', 'icon', 'color', 'title']
};
</script>

<style>
</style> 