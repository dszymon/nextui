<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  position?: 'static' | 'sticky';
  isBordered?: boolean;
  isBlurred?: boolean;
  height?: string;
  shouldHideOnScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'lg',
  position: 'sticky',
  isBordered: false,
  isBlurred: true,
  height: '4rem',
  shouldHideOnScroll: false
});

const classes = computed(() => {
  return [
    'heroui-navbar',
    `heroui-navbar-${props.position}`,
    `heroui-navbar-max-w-${props.maxWidth}`,
    {
      'heroui-navbar-bordered': props.isBordered,
      'heroui-navbar-blurred': props.isBlurred,
      'heroui-navbar-hide-on-scroll': props.shouldHideOnScroll
    }
  ];
});

const style = computed(() => {
    return {
        '--navbar-height': props.height
    }
})
</script>

<template>
  <nav :class="classes" :style="style">
    <header class="heroui-navbar-wrapper">
      <slot></slot>
    </header>
  </nav>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-navbar
  position sticky
  top 0
  left 0
  right 0
  z-index 40
  width 100%
  height var(--navbar-height)
  display flex
  align-items center
  justify-content center
  background-color var(--heroui-background)
  transition transform 0.3s ease, background-color 0.3s ease

  &-wrapper
    width 100%
    height 100%
    display flex
    align-items center
    justify-content space-between
    padding 0 $spacing-6
    max-width 1024px // Default lg

  // Max Widths
  &-max-w-sm .heroui-navbar-wrapper
      max-width 640px
  &-max-w-md .heroui-navbar-wrapper
      max-width 768px
  &-max-w-lg .heroui-navbar-wrapper
      max-width 1024px
  &-max-w-xl .heroui-navbar-wrapper
      max-width 1280px
  &-max-w-2xl .heroui-navbar-wrapper
      max-width 1536px
  &-max-w-full .heroui-navbar-wrapper
      max-width 100%

  // Positions
  &-static
    position static
  &-sticky
    position sticky

  // Variants
  &-bordered
    border-bottom 1px solid var(--heroui-divider)

  &-blurred
    background-color rgba(255, 255, 255, 0.8) // Ideally use variable with alpha
    backdrop-filter blur(10px)
    @media (prefers-color-scheme: dark)
       background-color rgba(0, 0, 0, 0.7)

</style>
