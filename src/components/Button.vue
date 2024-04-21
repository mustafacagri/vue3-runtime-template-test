<script setup>
const props = defineProps({ text: String, class: String });
</script>

<template>
  <button class="btn" :class="class">{{ text }}</button>
</template>
