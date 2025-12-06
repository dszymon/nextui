<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'solid' | 'bordered' | 'light';
  isDisabled?: boolean;
  underline?: 'none' | 'hover' | 'always' | 'active' | 'focus';
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  separator?: any; // Component or string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'default',
  radius: 'sm',
  variant: 'light',
  isDisabled: false,
  underline: 'hover',
  maxItems: 8,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1
});

const classes = computed(() => {
  return [
    'heroui-breadcrumbs',
    `heroui-breadcrumbs-${props.size}`,
    `heroui-breadcrumbs-${props.color}`,
    `heroui-breadcrumbs-${props.variant}`,
    `heroui-breadcrumbs-radius-${props.radius}`
  ];
});
</script>

<template>
  <nav :class="classes">
    <ol class="heroui-breadcrumbs-list">
      <slot></slot>
    </ol>
  </nav>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-breadcrumbs
  display block

  &-list
    display flex
    flex-wrap wrap
    align-items center
    list-style none
    margin 0
    padding 0
    gap $spacing-2

  // Sizes
  &-sm
    font-size $font-small
  &-md
    font-size $font-medium
  &-lg
    font-size $font-large

  // Colors
  &-default
    // ...

</style>
