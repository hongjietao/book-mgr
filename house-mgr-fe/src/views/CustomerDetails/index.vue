<template>
  <div>
    <a-card>
      <space-between>
        <h2>客户信息</h2>
        <div>
          <a-button size="small" type="primary" @click="showUpdateModal = true">编辑</a-button>
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider/>
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">姓名</div>
            <div class="content">{{d.name}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">编号</div>
            <div class="content">{{d._id}}</div>
          </div>
        </div>

        <div class="items">
          <div class="item">
            <div class="title">手机号</div>
            <div class="content">{{d.phone}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">身份证</div>
            <div class="content">{{d.ID_card}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">客户类型</div>
            <div class="content">{{+d.type ?'买房用户' : '租房用户'}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">创建时间</div>
            <div class="content">{{formatTimestamp(d.meta.createdAt)}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">录入人</div>
            <div class="content">{{d.creater}}</div>
          </div>
        </div>
      </div>
    </a-card>

    <!-- <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a>出库日志</a>
          </span>
          <span style="margin-left: 12px;">
            <a>入库日志</a>
          </span>
        </template>
        <div>
          <a-table bordered :pagination="false"/>
        </div>
        <space-between style="margin-top:24px;">
          <div/>
          <a-pagination/>
        </space-between>
      </a-card>
    </div> -->

    <update
      v-model:show="showUpdateModal"
      :house="d"
      @update="update"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
