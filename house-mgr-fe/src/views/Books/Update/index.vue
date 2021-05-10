<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加书记"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6}">
        <a-form-item label="书名">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number v-model:value="editForm.price"  :min="0" :max="999999999999" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="editForm.author"  />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="editForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="editForm.classify" />
        </a-form-item>
        <!-- <a-form-item label="库存">
          <a-input v-model:value="editForm.count" />
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js">
</script>
