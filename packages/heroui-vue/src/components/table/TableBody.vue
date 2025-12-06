<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}
const props = defineProps<Props>();
const classes = computed(() => ['heroui-table-body', props.className]);
</script>

<template>
  <tbody :class="classes">
    <slot></slot>
  </tbody>
</template>

<style lang="stylus" scoped>
.heroui-table-body
  // styles
</style>
