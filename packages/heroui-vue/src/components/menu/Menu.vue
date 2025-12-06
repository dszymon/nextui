<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'solid',
    color: 'default'
});

const classes = computed(() => {
    return [
        'heroui-menu',
        `heroui-menu-${props.variant}`,
        `heroui-menu-${props.color}`,
        props.className
    ]
});
</script>

<template>
  <ul :class="classes" role="menu">
    <slot></slot>
  </ul>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-menu
  list-style none
  margin 0
  padding $spacing-2
  background-color var(--heroui-background)
  border-radius $radius-medium
  box-shadow 0 10px 15px -3px rgba(0,0,0,0.1)
  display flex
  flex-direction column
  gap $spacing-1
</style>
