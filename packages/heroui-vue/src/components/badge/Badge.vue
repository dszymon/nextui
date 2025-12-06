<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'solid' | 'flat' | 'faded' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'rectangle'; // Usually circle or rectangle
  isInvisible?: boolean;
  content?: string | number;
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showOutline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'danger',
  size: 'md',
  shape: 'rectangle',
  isInvisible: false,
  placement: 'top-right',
  showOutline: true
});

const classes = computed(() => {
  return [
    'heroui-badge',
    `heroui-badge-${props.variant}`,
    `heroui-badge-${props.color}`,
    `heroui-badge-${props.size}`,
    `heroui-badge-shape-${props.shape}`,
    `heroui-badge-placement-${props.placement}`,
    {
      'heroui-badge-invisible': props.isInvisible,
      'heroui-badge-outline': props.showOutline
    }
  ];
});
</script>

<template>
  <div class="heroui-badge-wrapper">
    <slot></slot>
    <span :class="classes">
      <slot name="content">{{ content }}</slot>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-badge-wrapper
  position relative
  display inline-flex
  vertical-align middle
  flex-shrink 0

.heroui-badge
  display flex
  flex-wrap wrap
  align-items center
  align-content center
  justify-content center
  position absolute
  z-index 10
  box-sizing border-box
  transition transform 0.225s ease-in-out, opacity 0.225s ease-in-out

  &-invisible
    opacity 0
    transform scale(0)

  // Placements
  &-placement-top-right
    top 0
    right 0
    transform translate(50%, -50%)
  &-placement-top-left
    top 0
    left 0
    transform translate(-50%, -50%)
  &-placement-bottom-right
    bottom 0
    right 0
    transform translate(50%, 50%)
  &-placement-bottom-left
    bottom 0
    left 0
    transform translate(-50%, 50%)

  // Sizes
  &-sm
    font-size 10px
    min-width 16px
    height 16px
    padding 0 2px
  &-md
    font-size 12px
    min-width 20px
    height 20px
    padding 0 4px
  &-lg
    font-size 14px
    min-width 24px
    height 24px
    padding 0 6px

  // Shape
  &-shape-circle
    border-radius 9999px
  &-shape-rectangle
    border-radius $radius-small

  // Outline
  &-outline
    border 2px solid var(--heroui-background)

  // Variants & Colors
  &-solid
    &.heroui-badge-default
      background-color var(--heroui-default)
      color var(--heroui-default-foreground)
    &.heroui-badge-primary
      background-color var(--heroui-primary)
      color var(--heroui-primary-foreground)
    &.heroui-badge-danger
      background-color var(--heroui-danger)
      color var(--heroui-danger-foreground)
    // ... others

  &-flat
    &.heroui-badge-primary
      background-color var(--heroui-primary-100)
      color var(--heroui-primary-700)
    // ...

</style>
