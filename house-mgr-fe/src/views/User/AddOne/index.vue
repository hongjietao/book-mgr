<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加员工"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6}">
        <a-form-item label="账号">
          <a-input style="width:200px;" v-model:value="addForm.account" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input style="width:200px;" v-model:value="addForm.password"/>
        </a-form-item>
        <a-form-item label="手机号">
          <a-input style="width:200px;" v-model:value="addForm.phone"/>
        </a-form-item>
        <a-form-item label="身份证">
          <a-input style="width:200px;" v-model:value="addForm.ID_card"/>
        </a-form-item>
        <a-form-item label="城市">
          <a-input style="width:200px;" v-model:value="addForm.city"/>
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            v-model:value="addForm.character"
            style="width:200px;"
          >
            <a-select-option
              v-for="item in characterInfo"
              :key="item._id"
              :value="item._id"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>
