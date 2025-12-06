<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  key?: string | number;
  className?: string;
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false
});

const classes = computed(() => {
    return [
        'heroui-menu-item',
        {
            'heroui-menu-item-disabled': props.isDisabled
        },
        props.className
    ]
});
</script>

<template>
  <li :class="classes" role="menuitem">
    <slot></slot>
  </li>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-menu-item
  padding $spacing-2 $spacing-3
  border-radius $radius-small
  cursor pointer
  display flex
  align-items center
  gap $spacing-2
  color var(--heroui-foreground)
  transition background-color 0.2s

  &:hover:not(.heroui-menu-item-disabled)
     background-color var(--heroui-default-100)

  &-disabled
     opacity 0.5
     cursor not-allowed

</style>
