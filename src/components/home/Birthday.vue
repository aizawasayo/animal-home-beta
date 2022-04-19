<template>
  <v-card>
    <v-card-title class="white--text">
      <v-icon left> mdi-cake-variant </v-icon>
      <span v-if="islanderInfo.name" class="title font-weight-bold"
        >今天是{{ islanderInfo.name }}的生日</span
      >
      <span v-else>今天没有村民过生日哦～</span>
    </v-card-title>
    <v-card-text justify="center" class="pa-4 mx-auto" @click="goDetail">
      <v-img
        v-if="islanderInfo.photoSrc"
        :src="realUrl + islanderInfo.photoSrc"
        contain
        height="275"
      />
      <v-img
        v-else
        :src="require(`@/assets/no-birthday.jpeg`)"
        height="275"
        contain
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { parseTime } from '@/utils'
import { getIslanders } from '@/api/islander'
export default {
  data() {
    return {
      islanderInfo: {
        _id: '',
        name: '',
        photoSrc: '',
      },
    }
  },
  computed: {},
  created() {
    this.getBirthIslander()
  },
  methods: {
    getBirthIslander() {
      const today = parseTime(new Date(), '{mm}月{dd}日')
      const queryInfo = {
        page: 1,
        query: '',
        pageSize: 10,
        //birth: '10月8日',
        birth: today,
      }
      getIslanders(queryInfo).then(response => {
        if (response.data.list.length >= 1) {
          const { _id, name, photoSrc } = response.data.list[0]
          this.islanderInfo = { _id, name, photoSrc }
        }
      })
    },
    goDetail() {
      this.$router.push('/detail/islander/' + this.islanderInfo._id)
    },
  },
}
</script>
