<template>
  <div>
    <a-modal
      :visible="props.show"
      title="修改房源信息"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6}">
        <a-form-item label="城市">
          <a-input v-model:value="editForm.city" />
        </a-form-item>
        <a-form-item label="小区">
          <a-input v-model:value="editForm.neighborhood" />
        </a-form-item>
        <a-form-item label="楼层">
          <a-input-number style="width:171px" v-model:value="editForm.floor"  />
        </a-form-item>
        <a-form-item label="户型">
          <a-input v-model:value="editForm.floor_plan_room" />
        </a-form-item>
        <a-form-item label="面积">
          <a-input-number style="width:171px" v-model:value="editForm.area" />
        </a-form-item>
        <a-form-item label="朝向">
          <a-input v-model:value="editForm.facing" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>
