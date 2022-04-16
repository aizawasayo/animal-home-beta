<template>
  <div>
    <div class="my-4 text-h4 grey--text text--darken-3 d-flex justify-lg-space-between">
      {{ title }}
      <slot name="btn"></slot>
    </div>
    <v-divider class="primary mb-4"></v-divider>
    <div v-if="hasTip" class="tips cyan--text rounded px-3 py-2 mb-4 text-subtitle-2">
      <v-icon class="cyan--text mr-1 float-left" small>mdi-alarm-light</v-icon>小提示：{{ tips }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListHeader',
  props: {
    title: String,
    tips: String,
    hasTip: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  border: 1px solid #80deea;
}
.tips .v-icon {
  margin-top: 3px;
}
</style>
