<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <h2>操作日志</h2>

        <a-divider />

        <div>
          <a-table
            bordered
            :data-source="list"
            :columns="columns"
            :pagination="false"
            rowKey="_id"
          >
            <template #createdAt="{ record }">
              {{formatTimestamp(record.meta.createdAt)}}
            </template>

            <template #action="{ record }">
              <a @click="remove(record)">删除</a>
            </template>

          </a-table>
        </div>
        <flex-end style="margin-top: 24px;">
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

