<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  src?: string;
  name?: string;
  icon?: any; // Component or HTML
  alt?: string;
  isDisabled?: boolean;
  isBordered?: boolean;
  showFallback?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'default',
  radius: 'full',
  showFallback: false,
  isBordered: false
});

const emit = defineEmits<{
  (e: 'error', payload: Event): void
}>();

const classes = computed(() => {
  return [
    'heroui-avatar',
    `heroui-avatar-${props.size}`,
    `heroui-avatar-radius-${props.radius}`,
    `heroui-avatar-color-${props.color}`,
    {
      'heroui-avatar-bordered': props.isBordered,
      'heroui-avatar-disabled': props.isDisabled
    }
  ];
});

const initials = computed(() => {
  if (!props.name) return '';
  const names = props.name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
});

const handleError = (e: Event) => {
  emit('error', e);
};
</script>

<template>
  <span :class="classes">
    <img
      v-if="src"
      :src="src"
      :alt="alt || name"
      class="heroui-avatar-img"
      @error="handleError"
    />
    <span v-else-if="name && !showFallback" class="heroui-avatar-name">{{ initials }}</span>
    <span v-else class="heroui-avatar-icon">
      <slot name="icon">
        <!-- Default Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="heroui-avatar-icon-svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
    </span>
  </span>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-avatar
  position relative
  display inline-flex
  align-items center
  justify-content center
  overflow hidden
  vertical-align middle
  z-index 1
  box-sizing border-box

  &-img
    width 100%
    height 100%
    object-fit cover

  &-name
    font-size inherit
    font-weight 600

  &-icon
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center

    &-svg
      width 80%
      height 80%

  // Sizes
  &-sm
    width 32px
    height 32px
    font-size $font-tiny
  &-md
    width 40px
    height 40px
    font-size $font-small
  &-lg
    width 56px
    height 56px
    font-size $font-medium

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
    border-radius $radius-full

  // Colors (Backgrounds)
  &-color-default
    background-color var(--heroui-default)
    color var(--heroui-default-foreground)
  &-color-primary
    background-color var(--heroui-primary)
    color var(--heroui-primary-foreground)
  &-color-secondary
    background-color var(--heroui-secondary)
    color var(--heroui-secondary-foreground)
  &-color-success
    background-color var(--heroui-success)
    color var(--heroui-success-foreground)
  &-color-warning
    background-color var(--heroui-warning)
    color var(--heroui-warning-foreground)
  &-color-danger
    background-color var(--heroui-danger)
    color var(--heroui-danger-foreground)

  // Bordered
  &-bordered
    border 2px solid transparent
    &:hover
      border-color currentColor // Simplified

  // Disabled
  &-disabled
    opacity 0.5
    pointer-events none
</style>
