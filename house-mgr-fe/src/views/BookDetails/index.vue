<template>
  <div>
    <a-card>
      <space-between>
        <h2>name</h2>
        <div>
          <a-button size="small" type="primary">edit</a-button>
          &nbsp;
          <a-button size="small" type="danger">delete</a-button>
        </div>
      </space-between>
      <a-divider/>
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="content">price</div>
          </div>
          <div class="item">
            <div class="title">作者</div>
            <div class="content">author</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="content">classify</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">出版日期</div>
            <div class="content">publish date</div>
          </div>
        </div>
      </div>
    </a-card>

    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a>出库日志</a>
          </span>
          <span style="margin-left: 12px;">
            <a>入库日志</a>
          </span>
        </template>
        <!-- <h2>出入库日志</h2> -->
        <div>
          <a-table bordered :pagination="false"/>
        </div>
        <space-between style="margin-top:24px;">
          <div/>
          <a-pagination/>
        </space-between>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
