<template>
  <div>
    <a-card>
      <h2>房源列表</h2>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据小区搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" @click="backALl">返回</a>
        </div>
        <a-button @click="show = true">添加房源</a-button>
      </space-between>
      <a-divider/>
      <a-table
        bordered
        :columns="houseColumns"
        :data-source="houseList"
        rowKey="_id"
        :pagination="false"
      ></a-table>
      <space-between style="margin-top: 24px">
        <div/>
        <a-pagination
        ></a-pagination>
      </space-between>
    </a-card>
    <add-one
      v-model:show="show"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
