<template>
  <v-app>
    <app-bar />

    <app-view />

    <app-footer />

    <confirm ref="confirm"></confirm>
    <dialog-loader ref="dialogLoader"></dialog-loader>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  mounted() {
    this.$root.$confirm = this.$refs.confirm.open
    this.$root.$dialogLoader = this.$refs.dialogLoader
  },
}
</script>
