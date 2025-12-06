<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}
const props = defineProps<Props>();
const classes = computed(() => ['heroui-table-header', props.className]);
</script>

<template>
  <thead :class="classes">
    <slot></slot>
  </thead>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-table-header
  background-color var(--heroui-default-100)
  color var(--heroui-default-500)
  font-weight 600
  text-transform uppercase
</style>
