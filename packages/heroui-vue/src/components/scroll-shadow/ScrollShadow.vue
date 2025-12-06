<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  orientation?: 'horizontal' | 'vertical';
  hideScrollBar?: boolean;
  size?: number; // shadow size
  offset?: number; // shadow offset
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  hideScrollBar: false,
  size: 40,
  offset: 0
});

const classes = computed(() => {
  return [
    'heroui-scroll-shadow',
    `heroui-scroll-shadow-${props.orientation}`,
    {
      'heroui-scroll-shadow-hide-scrollbar': props.hideScrollBar
    }
  ];
});

const style = computed(() => {
    return {
        '--scroll-shadow-size': `${props.size}px`
    }
})
</script>

<template>
  <div :class="classes" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-scroll-shadow
  overflow auto
  position relative

  // Use mask-image for fading effect at edges
  // This is a simple approximation. Real scroll shadows usually require JS to detect scroll position
  // or complex background-attachment: local hacks.
  // Here we use mask-image to fade edges.
  // Note: Native CSS solution for "scroll shadows" usually involves background-attachment: local
  // or mask-image.

  // A robust CSS-only scroll shadow technique using background gradients:
  background linear-gradient(var(--heroui-background) 30%, rgba(255,255,255,0)), linear-gradient(rgba(255,255,255,0), var(--heroui-background) 70%) 0 100%, radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), rgba(0,0,0,0)), radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%
  background-repeat no-repeat
  background-color var(--heroui-background)
  background-size 100% var(--scroll-shadow-size), 100% var(--scroll-shadow-size), 100% 14px, 100% 14px
  background-attachment local, local, scroll, scroll

  &-hide-scrollbar
    scrollbar-width none // Firefox
    &::-webkit-scrollbar
      display none // Chrome/Safari

  &-horizontal
    // Adjust gradients for horizontal
    background linear-gradient(90deg, var(--heroui-background) 30%, rgba(255,255,255,0)), linear-gradient(-90deg, var(--heroui-background) 30%, rgba(255,255,255,0)) 100% 0, radial-gradient(farthest-side at 0 50%, rgba(0,0,0,.2), rgba(0,0,0,0)), radial-gradient(farthest-side at 100% 50%, rgba(0,0,0,.2), rgba(0,0,0,0)) 100% 0
    background-repeat no-repeat
    background-size var(--scroll-shadow-size) 100%, var(--scroll-shadow-size) 100%, 14px 100%, 14px 100%
    background-attachment local, local, scroll, scroll

</style>
