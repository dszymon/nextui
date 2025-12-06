<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  color: 'default',
  radius: 'sm'
});

const classes = computed(() => {
  return [
    'heroui-code',
    `heroui-code-${props.size}`,
    `heroui-code-${props.color}`,
    `heroui-code-radius-${props.radius}`
  ];
});
</script>

<template>
  <code :class="classes">
    <slot></slot>
  </code>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-code
  display inline-block
  font-family monospace
  line-height normal
  white-space pre-wrap

  // Sizes
  &-sm
    padding 2px 4px
    font-size $font-tiny
  &-md
    padding 4px 8px
    font-size $font-small
  &-lg
    padding 6px 10px
    font-size $font-medium

  // Radius
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large
  &-radius-full
    border-radius $radius-full

  // Colors
  &-default
    background-color var(--heroui-default-100)
    color var(--heroui-foreground)
  &-primary
    background-color var(--heroui-primary-100)
    color var(--heroui-primary-700)
  &-success
    background-color var(--heroui-success-100)
    color var(--heroui-success-700)
  &-warning
    background-color var(--heroui-warning-100)
    color var(--heroui-warning-700)
  &-danger
    background-color var(--heroui-danger-100)
    color var(--heroui-danger-700)

</style>
