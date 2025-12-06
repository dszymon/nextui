<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disallowEmptySelection?: boolean;
  selectionMode?: 'none' | 'single' | 'multiple';
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'solid',
    color: 'default',
    selectionMode: 'single',
    disallowEmptySelection: false
});

const classes = computed(() => {
    return [
        'heroui-listbox',
        `heroui-listbox-${props.variant}`,
        `heroui-listbox-${props.color}`,
        props.className
    ]
});
</script>

<template>
  <ul :class="classes" role="listbox">
    <slot></slot>
  </ul>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-listbox
  list-style none
  margin 0
  padding $spacing-2
  display flex
  flex-direction column
  gap $spacing-1
  width 100%
  box-sizing border-box
</style>
