<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isLoaded?: boolean;
  disableAnimation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoaded: false,
  disableAnimation: false
});

const classes = computed(() => {
  return [
    'heroui-skeleton',
    {
      'heroui-skeleton-loaded': props.isLoaded,
      'heroui-skeleton-active': !props.isLoaded && !props.disableAnimation
    }
  ];
});
</script>

<template>
  <div :class="classes">
    <div class="heroui-skeleton-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-skeleton
  position relative
  overflow hidden
  background-color var(--heroui-default-200) // Skeleton color
  border-radius $radius-medium

  &-active
    &::after
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      content ""
      background linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)
      transform translateX(-100%)
      animation skeleton-loading 1.5s infinite

  &-loaded
    background-color transparent
    &::after
      display none
    .heroui-skeleton-content
      opacity 1

  &-content
    opacity 0
    transition opacity 0.3s

    .heroui-skeleton-loaded &
      opacity 1

@keyframes skeleton-loading
  100%
    transform translateX(100%)

</style>
