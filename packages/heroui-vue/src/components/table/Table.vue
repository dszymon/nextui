<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  selectionMode?: 'none' | 'single' | 'multiple';
}

const props = withDefaults(defineProps<Props>(), {
  selectionMode: 'none'
});

const classes = computed(() => ['heroui-table', props.className]);
</script>

<template>
  <div class="heroui-table-wrapper">
    <table :class="classes">
      <slot></slot>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-table-wrapper
  width 100%
  overflow-x auto
  border-radius $radius-medium
  box-shadow 0 4px 6px -1px rgba(0,0,0,0.1)
  background-color var(--heroui-background)

.heroui-table
  width 100%
  border-collapse collapse
  text-align left
  font-size $font-small
  color var(--heroui-foreground)

  // Child selectors would be used for th/td/tr if not using separate components
  // But usually we want TableHeader, TableRow, TableCell etc.
</style>
