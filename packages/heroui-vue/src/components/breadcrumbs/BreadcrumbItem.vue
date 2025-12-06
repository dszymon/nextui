<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  to?: string;
  isDisabled?: boolean;
  isCurrent?: boolean;
  separator?: any;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isCurrent: false
});

const classes = computed(() => {
  return [
    'heroui-breadcrumb-item',
    {
      'heroui-breadcrumb-item-current': props.isCurrent,
      'heroui-breadcrumb-item-disabled': props.isDisabled
    }
  ];
});
</script>

<template>
  <li :class="classes">
    <span class="heroui-breadcrumb-item-content">
       <slot></slot>
    </span>
    <span class="heroui-breadcrumb-separator" aria-hidden="true" v-if="!isCurrent">
       <slot name="separator">/</slot>
    </span>
  </li>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-breadcrumb-item
  display inline-flex
  align-items center
  gap $spacing-2

  &-current
    font-weight 600
    color var(--heroui-foreground)
    cursor default

  &-disabled
    opacity 0.5
    pointer-events none

  &-content
     display inline-flex
     align-items center
     cursor pointer
     &:hover
        opacity 0.8

  .heroui-breadcrumb-separator
     opacity 0.5
     color var(--heroui-default-400)

</style>
