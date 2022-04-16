<template>
  <div class="breadcrumbsBox rounded">
    <v-breadcrumbs :items="breadNav" large>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.href" :disabled="item.disabled">
          <span v-if="item.href === '/'" class="primary--text"
            ><v-icon class="primary--text mr-1 mt-1 float-left">mdi-home</v-icon
            >{{ item.text }}</span
          >
          <span v-else>{{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    breadNav: {
      type: Array,
      required: true,
    },
  },
}
</script>
