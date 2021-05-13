<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider />
      <a-button @click="showAddModal = true">添加用户</a-button>

      <a-divider />

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
          rowKey="_id"
        >
          <template #createAt="{record}">
            {{formatTimestamp(record.meta.createAt)}}
          </template>
          <template #actions="{record}">
            <a @click="toDetail(record)">重置密码</a>
            &nbsp;
            <a @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
      <flex-end style="margin-top: 24px;">
        <a-pagination
          :total="total"
          :page="curPage"
        />
      </flex-end>
    </a-card>

    <add-one
      v-model:show="showAddModal"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="sass" scoped>
  @import './index.scss'
</style>
