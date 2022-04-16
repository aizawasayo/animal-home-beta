<template>
  <v-main>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </v-main>
</template>

<script>
export default {
  name: 'AppView',
}
</script>

<style lang="scss">
.v-main {
  background-image: url('../../assets/main-bg.jpg');
  background-size: cover;
}
/*面包屑导航改造*/
.breadcrumbsBox {
  border: 1px solid #81c784;
  border-left: 5px solid #81c784;
  background-color: rgba(129, 199, 132, 0.1);
}
.breadcrumbsBox .v-breadcrumbs {
  padding: 6px 8px;
  padding-left: 10px;
}
/*卡片头部及容器改造*/
.v-card {
  overflow: hidden;
}
.theme--light.v-card {
  background-color: rgba(255, 255, 255, 0.6);
}
.v-card__title {
  padding: 8px 16px;
  background: url('../../assets/title-bg.jpg') repeat;
}
.v-card .v-card__title .v-icon.v-icon {
  color: white;
}
.v-card .v-slide-group__content {
  background: url('../../assets/title-bg.jpg') repeat;
}
.no-bg {
  background: none;
}
.bgWht {
  background-color: rgba(255, 255, 255, 0.6);
  height: 100%;
}

/*绿色背景tab选项卡*/
.v-card .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.v-card .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.v-card .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.v-card .theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: rgba(255, 255, 255, 0.9);
}

/*数据table改造*/
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: thin solid #81c784;
  font-size: 0.875rem;
}

/*数据table搜索栏改造*/
.card-search .theme--light.v-icon,
.card-search .theme--light.v-label,
.card-search .theme--light.v-input input,
.card-search .theme--light.v-input textarea {
  color: white;
}
.card-search .v-select {
  width: 200px;
}

.card-search .v-toolbar__content {
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.v-text-field.v-text-field--solo .v-input__control {
  min-height: 44px;
}

.theme--dark.v-label {
  color: rgba(255, 255, 255, 1);
}

.btn-more {
  position: absolute;
  right: 0;
  top: 2px;
}

.picList .theme--light.v-tabs-items,
.community .theme--light.v-data-table {
  background-color: transparent;
}

.detail {
  .v-list-item__content {
    &.align-end {
      flex: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.38);
    }
    &.label {
      flex: none;
      width: 120px;
      color: #80deea !important;
      caret-color: #80deea !important;
      font-weight: 700 !important;
    }
  }
}

.photoList {
  flex-flow: wrap;
  .v-list-item {
    flex: 1 1 20%;
    display: inline-block;
    p {
      text-align: center;
    }
  }
}

.line-40 {
  line-height: 40px !important;
}

.v-time-picker-custom .v-picker__title {
  height: 84px;
  padding-top: 10px;
}
.date-time-picker.theme--light.v-card {
  background-color: #ffffff;
}
.date-time-picker.v-card .v-slide-group__content {
  background: none !important;
}
.date-time-picker.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: rgba(0, 0, 0, 0.54) !important;
}

/* 级联选择器样式修改 */
.ivu-cascader,
.ivu-date-picker {
  padding-top: 12px;
  margin-top: 4px;
}
.ivu-input {
  margin-bottom: 8px;
  padding: 5px 7px;
  height: 33px;
  background: none;
  border: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
}
.ivu-input:hover {
  border-bottom: 2px solid #009688;
}
input:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
.ivu-input:focus {
  border: none;
  outline: none;
  box-shadow: none;
  border-bottom: 2px solid #009688;
}
.ivu-input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.ivu-cascader-menu .ivu-cascader-menu-item-active {
  color: #00bcd4;
}
.ivu-select-dropdown {
  max-height: 300px;
}
.ivu-cascader-menu {
  min-width: 160px;
  height: auto;
}
.ivu-cascader .ivu-cascader-menu-item {
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px !important;
}
.ivu-date-picker-header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #00bcd4;
}
.ivu-picker-panel-icon-btn {
  display: inline-block;
  width: 20px;
  height: 38px;
  line-height: 36px;
}
.ivu-time-picker-cells-list {
  width: 60px;
  max-height: 200px;
}
.ivu-time-picker-cells-list ul li {
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 20px;
}
.ivu-date-picker-header-label:hover,
.ivu-time-picker-cells-list ul li:hover,
.ivu-time-picker-cells-cell-selected {
  color: #00bcd4;
}
.ivu-date-picker-cells-cell-selected em,
.ivu-date-picker-cells-cell-selected:hover em {
  background: #00bcd4;
}
.ivu-date-picker-cells-focused em {
  box-shadow: 0 0 0 1px #00bcd4 inset;
}
.ivu-date-picker-cells-cell-today em:after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00bcd4;
}
.ivu-date-picker-cells-cell em:hover {
  /* background-color: rgba(0, 188, 212, 0.2); */
  background-color: #4dd0e1;
  color: white;
}
.ivu-date-picker-cells span {
  width: 32px;
  height: 32px;
}
.ivu-date-picker-cells-header span {
  line-height: 32px;
}
.ivu-date-picker-cells {
  width: 252px;
}
span.ivu-date-picker-cells-cell {
  width: 36px;
  height: 36px;
}
.ivu-date-picker-cells span em {
  width: 32px;
  height: 32px;
  line-height: 32px;
}
button:focus {
  border: 0;
  outline: none;
}
</style>
