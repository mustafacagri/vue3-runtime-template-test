<script setup>
const props = defineProps({
  text: String,
  class: { type: String, default: "" },
});
</script>

<template>
  <small v-if="text" class="text-danger" :class>{{ text }}</small>
</template>
