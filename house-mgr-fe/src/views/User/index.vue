<template>
  <div>
    <a-card>
      <h2>员工管理</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据员工名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" @click="backALl">返回</a>
        </div>
        <div>
          <a-button @click="show = true">添加员工</a-button>
          &nbsp;
          <a-upload
            @change="onUploadChange"
            action="http://localhost:3000/upload/file"
            :headers="headers"
          >
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div>
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
          <template #type="{record}">
            {{record.type ? '在职' : '离职'}}
          </template>

          <template #createAt="{record}">
            {{formatTimestamp(record.meta.createdAt)}}
          </template>

          <template #character="{record}">
            <a @click="onEdit(record)"> <EditOutlined /> </a>
            &nbsp;
            {{getCharacterInfoById(record.character).title}}
          </template>

          <template #actions="{record}">
            <a @click="reset(record)">重置密码</a>
            &nbsp;
            <a v-if="record.type" @click="quit(record)">员工离职</a>
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
      v-model:show="show"
      @getList="getUser"
    />

    <a-modal
      :visible="showEditCharacterModal"
      @ok="submit"
      @cancel="close"
      title="修改角色"
    >
      <a-select
        v-model:value="editForm.character"
        style="width:171px;"
      >
        <a-select-option
          v-for="item in characterInfo"
          :key="item._id"
          :value="item._id"
        >{{item.title}}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="sass" scoped>
  @import './index.scss'
</style>
