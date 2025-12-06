<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}
const props = defineProps<Props>();
const classes = computed(() => ['heroui-table-row', props.className]);
</script>

<template>
  <tr :class="classes">
    <slot></slot>
  </tr>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-table-row
  border-bottom 1px solid var(--heroui-default-200)
  transition background-color 0.2s
  &:last-child
    border-bottom none
  &:hover
    background-color var(--heroui-default-50)
</style>
