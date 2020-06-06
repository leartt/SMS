<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./core/AppBar'),
      DashboardCoreDrawer: () => import('./core/Drawer'),
      DashboardCoreView: () => import('./core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
