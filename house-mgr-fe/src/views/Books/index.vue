<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据书名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" @click="backALl">返回</a>
        </div>
        <a-button @click="show = true">添加书籍</a-button>
      </space-between>
      <a-divider/>
      <a-table
      :columns='columns'
      :data-source="list"
      :pagination="false"
      >
        <template #publishDate="record">
          {{formatTimestamp(record.record.publishDate)}}
        </template>
        <template #count="record">
          {{record.record.count?record.record.count:0}}
          &nbsp;
          <a type="link" @click="updateCount('IN_COUNT', record.record)">入库</a>
          &nbsp;
          <a type="link" @click="updateCount('OUT_COUNT', record.record)">出库</a>
        </template>

        <template #actions="record">
          <a type="link" @click="update(record.record)">edit</a>
          &nbsp;
          <a type="link" @click="remove(record)">delete</a>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <div/>
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        ></a-pagination>
      </space-between>
    </a-card>

    <add-one
      v-model:show="show"
    />
    <update
      v-model:show="showUpdateModel"
      :book="curEditBook"
      @update="updateCurBook"
    />
  </div>
</template>
<script src='./index.jsx'></script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
