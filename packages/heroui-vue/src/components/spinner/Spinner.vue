<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'current' | 'white' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
  variant?: 'simple' | 'default'; // Na razie proste warianty, potem można dodać więcej
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  variant: 'default'
});

const wrapperClasses = computed(() => {
  return [
    'heroui-spinner',
    `heroui-spinner-${props.size}`,
    `heroui-spinner-${props.color}`,
    `heroui-spinner-variant-${props.variant}`
  ];
});
</script>

<template>
  <div :class="wrapperClasses" role="status" :aria-label="label || 'Loading'">
    <div class="heroui-spinner-wrapper">
      <i class="heroui-spinner-circle1"></i>
      <i class="heroui-spinner-circle2"></i>
    </div>
    <span v-if="label" class="heroui-spinner-label">{{ label }}</span>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

@keyframes spinner-spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)

.heroui-spinner
  display inline-flex
  flex-direction column
  align-items center
  justify-content center
  position relative

  &-wrapper
    position relative
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%

  &-circle1, &-circle2
    position absolute
    border-radius 50%
    border-style solid
    border-color transparent
    border-top-color currentColor

  // Sizes
  &-sm
    .heroui-spinner-wrapper
      width 20px
      height 20px
    .heroui-spinner-circle1, .heroui-spinner-circle2
      border-width 2px

  &-md
    .heroui-spinner-wrapper
      width 32px
      height 32px
    .heroui-spinner-circle1, .heroui-spinner-circle2
      border-width 3px

  &-lg
    .heroui-spinner-wrapper
      width 48px
      height 48px
    .heroui-spinner-circle1, .heroui-spinner-circle2
      border-width 4px

  // Colors
  &-current
    color currentColor
  &-white
    color white
  &-default
    color var(--heroui-default)
  &-primary
    color var(--heroui-primary)
  &-secondary
    color var(--heroui-secondary)
  &-success
    color var(--heroui-success)
  &-warning
    color var(--heroui-warning)
  &-danger
    color var(--heroui-danger)

  // Default Variant Animation
  &-variant-default
    .heroui-spinner-circle1
      width 100%
      height 100%
      animation spinner-spin 0.8s ease infinite

    .heroui-spinner-circle2
      width 100%
      height 100%
      border-top-color transparent
      border-bottom-color currentColor
      opacity 0.5
      animation spinner-spin 0.8s ease infinite reverse
</style>
