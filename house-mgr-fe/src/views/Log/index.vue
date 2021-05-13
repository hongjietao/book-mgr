<template>
  <div>
    <a-card>
      <h2>操作日志</h2>

      <a-divider />

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        ></a-table>
      </div>
      <flex-end style="margin-top: 24px;">
        <a-pagination
          :total="total"
          :page="curPage"
        />
      </flex-end>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="sass" scoped>
  @import './index.scss'
</style>
