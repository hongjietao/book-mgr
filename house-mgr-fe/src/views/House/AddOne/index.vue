<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加房源"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6}">
        <a-form-item label="城市">
          <a-input v-model:value="addForm.city" />
        </a-form-item>
        <a-form-item label="小区">
          <a-input v-model:value="addForm.neighborhood"/>
        </a-form-item>
        <a-form-item label="楼层">
          <a-input-number v-model:value="addForm.floor" :min="0" :max="9990"/>
        </a-form-item>
        <a-form-item label="厅室">
          <a-input v-model:value="addForm.floor_plan_room" />
        </a-form-item>
        <a-form-item label="面积">
          <a-input-number v-model:value="addForm.area" :min="0" :max="9999" />
        </a-form-item>
        <a-form-item label="朝向">
          <a-input v-model:value="addForm.facing" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>
