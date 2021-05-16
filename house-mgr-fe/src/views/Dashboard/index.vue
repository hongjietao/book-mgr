<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共 {{baseInfo.total.house}} 套</div>
            <div class="title">房源</div>
          </div>
          <div class="item">
            <div class="count">共 {{baseInfo.total.user}} 位</div>
            <div class="title">成员</div>
          </div>
          <div class="item">
            <div class="count">共 {{baseInfo.total.log}} 条</div>
            <div class="title">日志</div>
          </div>
        </div>
      </a-card>
    </a-spin>
    <div class="table-list">
      <div class="left">
        <house
          simple
        />
      </div>

      <div class="right">
        <log
          simple
        />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
