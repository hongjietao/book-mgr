<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加用户"
      @ok="submit"
      @cancel="close"
    >

      <a-form :label-col="{ span: 6}">
        <a-form-item label="客户姓名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="电话">
          <a-input v-model:value="addForm.phone"/>
        </a-form-item>
        <a-form-item label="身份证">
          <a-input v-model:value="addForm.ID_card" />
        </a-form-item>
        <a-form-item label="客户类型">
          <a-select
            v-model:value="addForm.type"
            style="width: 171px"
            ref="select"
          >
            <a-select-option value="0">租房用户</a-select-option>
            <a-select-option value="1">买房用户</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>
