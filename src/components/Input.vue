<script setup>
import { inject, onMounted, watch } from "vue";
const props = defineProps({
  name: String,
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
});

const form = inject("form");
const formErrors = inject("formErrors");

const validate = () => {
  if (props.required) {
    const { name } = props;
    const fieldValue = form[name];

    if (!fieldValue) {
      formErrors.value[name] = `${name} is required`;
    } else {
      delete formErrors.value[name];
    }
  }
};

watch(
  () => form[props.name],
  () => {
    validate();
  }
);

onMounted(() => {
  console.log("mounted");
  validate();
});
</script>

<template>
  <div class="mb-3">
    <label :for="name" class="form-label">
      {{ placeholder }}
      <span v-if="props.required" class="text-danger">*</span>
    </label>
    <input type="text" class="form-control" :id="name" v-model="form[name]" />

    <Error :text="formErrors[name]" />
  </div>
</template>
