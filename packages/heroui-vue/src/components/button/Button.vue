<script setup lang="ts">
import { computed, useSlots } from 'vue';
import Spinner from '../spinner/Spinner.vue';
import { vRipple } from '../../directives/ripple';

interface Props {
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  disableRipple?: boolean;
  spinnerPlacement?: 'start' | 'end';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md',
  color: 'default',
  radius: 'md',
  isLoading: false,
  isDisabled: false,
  isIconOnly: false,
  disableRipple: false,
  spinnerPlacement: 'start'
});

const slots = useSlots();

const classes = computed(() => {
  return [
    'heroui-button',
    `heroui-button-${props.variant}`,
    `heroui-button-${props.size}`,
    `heroui-button-color-${props.color}`,
    `heroui-button-radius-${props.radius}`,
    {
      'heroui-button-disabled': props.isDisabled || props.isLoading,
      'heroui-button-icon-only': props.isIconOnly,
      'heroui-button-loading': props.isLoading
    }
  ];
});

// Ripple options
const rippleOptions = computed(() => ({
  disabled: props.disableRipple || props.isDisabled || props.isLoading,
  color: 'currentColor' // Or calculate based on variant? Native CSS `currentColor` works usually.
}));

</script>

<template>
  <button
    :class="classes"
    :disabled="isDisabled || isLoading"
    type="button"
    v-ripple="rippleOptions"
  >
    <span v-if="isLoading && spinnerPlacement === 'start'" class="heroui-button-spinner">
      <Spinner :color="'current'" :size="'sm'" />
    </span>

    <span class="heroui-button-content" :class="{ 'heroui-button-content-hidden': isLoading && isIconOnly }">
      <slot name="startContent"></slot>
      <slot></slot>
      <slot name="endContent"></slot>
    </span>

    <span v-if="isLoading && spinnerPlacement === 'end'" class="heroui-button-spinner">
      <Spinner :color="'current'" :size="'sm'" />
    </span>
  </button>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

// Ripple styles needed globally or here
:global(.heroui-ripple-container)
  position absolute
  inset 0
  z-index 0
  overflow hidden
  border-radius inherit
  pointer-events none

:global(.heroui-ripple)
  position absolute
  border-radius 100%
  transform scale(0)
  opacity 0.35
  transform-origin center
  animation ripple-anim 0.6s linear forwards
  background-color currentColor

@keyframes ripple-anim
  to
    transform scale(2)
    opacity 0

.heroui-button
  position relative
  display inline-flex
  align-items center
  justify-content center
  box-sizing border-box
  outline none
  border none
  cursor pointer
  user-select none
  white-space nowrap
  transition transform 0.2s, background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s
  overflow hidden
  text-decoration none
  -webkit-tap-highlight-color transparent

  &-content
    display inline-flex
    align-items center
    justify-content center
    gap $spacing-2
    z-index 1
    position relative

    &-hidden
      opacity 0
      width 0
      padding 0

  &-spinner
    display inline-flex
    align-items center
    justify-content center
    margin-right $spacing-2
    z-index 1
    position relative

    &:last-child
      margin-right 0
      margin-left $spacing-2

  &:active:not(:disabled)
    transform scale(0.97)

  &-disabled
    opacity 0.5
    cursor not-allowed
    pointer-events none

  // Sizes
  &-sm
    padding 0 $spacing-3
    height 32px
    font-size $font-tiny
    border-radius $radius-small

  &-md
    padding 0 $spacing-4
    height 40px
    font-size $font-small
    border-radius $radius-medium

  &-lg
    padding 0 $spacing-6
    height 48px
    font-size $font-medium
    border-radius $radius-large

  // Icon Only
  &-icon-only
    padding 0 !important
    gap 0 !important

    &.heroui-button-sm
      width 32px
      min-width 32px
    &.heroui-button-md
      width 40px
      min-width 40px
    &.heroui-button-lg
      width 48px
      min-width 48px

  // Radius overrides
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

  // Variants & Colors
  // Solid
  &-solid
    &.heroui-button-color-default
      background-color var(--heroui-default)
      color var(--heroui-default-foreground)
    &.heroui-button-color-primary
      background-color var(--heroui-primary)
      color var(--heroui-primary-foreground)
    &.heroui-button-color-secondary
      background-color var(--heroui-secondary)
      color var(--heroui-secondary-foreground)
    &.heroui-button-color-success
      background-color var(--heroui-success)
      color var(--heroui-success-foreground)
    &.heroui-button-color-warning
      background-color var(--heroui-warning)
      color var(--heroui-warning-foreground)
    &.heroui-button-color-danger
      background-color var(--heroui-danger)
      color var(--heroui-danger-foreground)

  // Bordered
  &-bordered
    background-color transparent
    border-width 2px
    border-style solid

    &.heroui-button-color-default
      border-color var(--heroui-default)
      color var(--heroui-default)
    &.heroui-button-color-primary
      border-color var(--heroui-primary)
      color var(--heroui-primary)
    // ... add other colors similarly

  // Light
  &-light
    background-color transparent

    &.heroui-button-color-default
      color var(--heroui-default)
      &:hover
         background-color var(--heroui-default-100)
    &.heroui-button-color-primary
      color var(--heroui-primary)
      &:hover
         background-color var(--heroui-blue-50) // approximate light bg

  // Flat
  &-flat
    &.heroui-button-color-default
      background-color var(--heroui-default-100)
      color var(--heroui-default-700)
    &.heroui-button-color-primary
      background-color var(--heroui-blue-100)
      color var(--heroui-blue-700)

  // Ghost
  &-ghost
    background-color transparent
    border-width 2px
    border-style solid
    transition color 0.25s, background-color 0.25s, border-color 0.25s

    &.heroui-button-color-default
      border-color var(--heroui-default)
      color var(--heroui-default)
      &:hover
        background-color var(--heroui-default)
        color var(--heroui-default-foreground)

    &.heroui-button-color-primary
      border-color var(--heroui-primary)
      color var(--heroui-primary)
      &:hover
        background-color var(--heroui-primary)
        color var(--heroui-primary-foreground)

  // Shadow
  &-shadow
    box-shadow 0 4px 14px 0 rgba(0,0,0,0.1)

    &.heroui-button-color-primary
      background-color var(--heroui-primary)
      color var(--heroui-primary-foreground)
      box-shadow 0 10px 15px -3px rgba(0, 111, 238, 0.4)

</style>
