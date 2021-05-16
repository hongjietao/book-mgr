<template>
  <div>
    <a-spin :spinning="loading">
      <a-card :title="simple ? '最近操作记录' : ''">
        <div v-if="!simple">
          <h2>操作日志</h2>

          <a-divider />
        </div>

        <div>
          <a-table
            bordered
            :data-source="list"
            :columns="columns"
            :pagination="false"
            rowKey="_id"
            :scroll="{x: 'max-content'}"
          >
            <template #createdAt="{ record }">
              {{formatTimestamp(record.meta.createdAt)}}
            </template>

            <template #action="{ record }">
              <a @click="remove(record)">删除</a>
            </template>

          </a-table>
        </div>
        <flex-end  v-if="!simple" style="margin-top: 24px;">
          <a-pagination
            v-model:value="curPage"
            :total="total"
            :pageSize="20"
            @change="setPage"
          />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

