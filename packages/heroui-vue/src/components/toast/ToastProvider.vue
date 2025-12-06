<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  placement?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-right'
});

const classes = computed(() => {
  return [
    'heroui-toast-provider',
    `heroui-toast-placement-${props.placement}`
  ];
});
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.heroui-toast-provider
  position fixed
  z-index 100
  display flex
  flex-direction column
  gap 10px
  padding 16px
  pointer-events none

  &-placement-top-left
    top 0
    left 0
  &-placement-top-center
    top 0
    left 50%
    transform translateX(-50%)
  &-placement-top-right
    top 0
    right 0
  &-placement-bottom-left
    bottom 0
    left 0
    flex-direction column-reverse
  &-placement-bottom-center
    bottom 0
    left 50%
    transform translateX(-50%)
    flex-direction column-reverse
  &-placement-bottom-right
    bottom 0
    right 0
    flex-direction column-reverse
</style>
