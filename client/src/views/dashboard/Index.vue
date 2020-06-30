<template>
  <v-app>
    <div v-if="role">
      <dashboard-core-app-bar />

      <div v-if="role === 'admin'">
        <AdminDashboardCoreDrawer />
      </div>
      <div v-else-if="role === 'parent'">
        <ParentDashboardCoreDrawer />
      </div>
      <div v-else-if="role === 'student'">
        <StudentDashboardCoreDrawer />
      </div>
      <div v-else-if="role === 'teacher'">
        <TeacherDashboardCoreDrawer />
      </div>
      <dashboard-core-view />
    </div>

    <div v-else>
      <NotFound />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./core/AppBar"),

    NotFound: () => import("./pages/NotFound"),
    AdminDashboardCoreDrawer: () => import("./core/Drawer"),
    ParentDashboardCoreDrawer: () => import("./core/ParentDrawer"),
    StudentDashboardCoreDrawer: () => import("./core/StudentDrawer"),
    TeacherDashboardCoreDrawer: () => import("./core/TeacherDrawer"),

    DashboardCoreView: () => import("./core/View")
  },

  data: () => ({
    expandOnHover: false
  }),
  computed: {
    role() {
      return this.$store.state.Auth.user.User
        ? this.$store.state.Auth.user.User.role
        : null;
    }
    
  }
};
</script>
