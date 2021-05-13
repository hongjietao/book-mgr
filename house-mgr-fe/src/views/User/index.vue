<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据用户名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" @click="backALl">返回</a>
        </div>
        <a-button @click="showAddModal = true">添加用户</a-button>
      </space-between>

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
            <a @click="reset(record)">重置密码</a>
            &nbsp;
            <a @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
      <flex-end style="margin-top: 24px;">
        <a-pagination
          :total="total"
          :page="curPage"
          :page-size="20"
          @change="setPage"
        />
      </flex-end>
    </a-card>

    <add-one
      v-model:show="showAddModal"
      @getList="getUser"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="sass" scoped>
  @import './index.scss'
</style>
