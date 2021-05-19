<template>
  <div>
    <a-card>
      <space-between>
        <h2>房源信息</h2>
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
            <div class="title">编号</div>
            <div class="content">{{d._id}}</div>
          </div>
        </div>
        <!-- Todo -->
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
        <div class="items">
          <div class="item">
            <div class="title">城市</div>
            <div class="content">{{d.city}}</div>
          </div>
          <div class="item">
            <div class="title">小区</div>
            <div class="content">{{d.neighborhood}}</div>
          </div>
          <div class="item">
            <div class="title">楼层</div>
            <div class="content">{{d.floor}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">户型</div>
            <div class="content">{{d.floor_plan_room}}</div>
          </div>
          <div class="item">
            <div class="title">面积</div>
            <div class="content">{{d.area}}</div>
          </div>
          <div class="item">
            <div class="title">朝向</div>
            <div class="content">{{d.facing}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">类型</div>
            <div class="content">{{d.type ?'出售' : '出租'}}</div>
          </div>
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{d.price+(+d.type ?'万' : '元/月')}}</div>
          </div>
          <div class="item">
            <div class="title">状态</div>
            <div class="content">{{verifyResult(d.verify)}}</div>
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
