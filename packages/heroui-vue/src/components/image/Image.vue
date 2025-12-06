<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  isZoomed?: boolean;
  isBlurred?: boolean;
  fallbackSrc?: string;
  disableSkeleton?: boolean;
  loading?: 'eager' | 'lazy';
}

const props = withDefaults(defineProps<Props>(), {
  radius: 'md',
  shadow: 'none',
  isZoomed: false,
  isBlurred: false,
  disableSkeleton: false,
  loading: 'lazy'
});

const isLoading = ref(true);
const hasError = ref(false);

const currentSrc = computed(() => {
  if (hasError.value && props.fallbackSrc) {
    return props.fallbackSrc;
  }
  return props.src;
});

const wrapperClasses = computed(() => {
  return [
    'heroui-image-wrapper',
    `heroui-image-radius-${props.radius}`,
    `heroui-image-shadow-${props.shadow}`,
    {
      'heroui-image-zoomed': props.isZoomed,
      'heroui-image-blurred': props.isBlurred,
      'heroui-image-loading': isLoading.value && !props.disableSkeleton
    }
  ];
});

const onLoad = () => {
  isLoading.value = false;
};

const onError = () => {
  isLoading.value = false;
  hasError.value = true;
};
</script>

<template>
  <div :class="wrapperClasses" :style="{ width: typeof width === 'number' ? width + 'px' : width }">
    <div v-if="isBlurred && currentSrc" class="heroui-image-blurred-bg" :style="{ backgroundImage: `url(${currentSrc})` }"></div>

    <img
      v-if="currentSrc"
      :src="currentSrc"
      :alt="alt"
      :loading="loading"
      :width="width"
      :height="height"
      class="heroui-image-img"
      @load="onLoad"
      @error="onError"
    />

    <div v-if="isLoading && !disableSkeleton" class="heroui-image-skeleton"></div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-image-wrapper
  position relative
  display inline-block
  overflow hidden
  max-width 100%

  // Radius
  &-radius-none
    border-radius 0
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large
  &-radius-full
    border-radius 9999px

  // Shadow
  &-shadow-sm
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.05)
  &-shadow-md
    box-shadow 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
  &-shadow-lg
    box-shadow 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)

  // Zoomed
  &-zoomed
    .heroui-image-img
      transition transform 0.3s ease
    &:hover .heroui-image-img
      transform scale(1.1)

  // Blurred
  &-blurred
    overflow visible // Allow blur to spill out? Or keep hidden? Usually hidden inside wrapper but we need another layer.
    // Actually Heroui blurred image usually duplicates the image behind it blurred.

  &-blurred-bg
    position absolute
    inset 0
    background-size cover
    background-position center
    filter blur(20px)
    transform scale(1.2)
    z-index 0
    opacity 0.5

.heroui-image-img
  position relative
  z-index 10
  display block
  width 100%
  height auto
  border-radius inherit
  object-fit cover

.heroui-image-skeleton
  position absolute
  inset 0
  background-color var(--heroui-default-200)
  z-index 20
  animation pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite

@keyframes pulse
  0%, 100%
    opacity 1
  50%
    opacity .5
</style>
