<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  isBlurred?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isBlurred: false
});

const classes = computed(() => {
  return [
    'heroui-card-footer',
    {
      'heroui-card-footer-blurred': props.isBlurred
    },
    props.className
  ];
});
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-card-footer
  display flex
  align-items center
  padding $spacing-3
  overflow hidden
  color inherit
  width 100%
  height auto
  box-sizing border-box

  &-blurred
    background-color rgba(255, 255, 255, 0.8)
    backdrop-filter blur(10px)
    position absolute
    bottom 0
    z-index 20
    border-top 1px solid rgba(255, 255, 255, 0.3)
</style>
