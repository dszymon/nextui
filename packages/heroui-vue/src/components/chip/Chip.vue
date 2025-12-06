<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isDisabled?: boolean;
  isCloseable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'default',
  size: 'md',
  radius: 'full',
  isDisabled: false,
  isCloseable: false
});

const emit = defineEmits<{
  (e: 'close', payload: MouseEvent): void
}>();

const classes = computed(() => {
  return [
    'heroui-chip',
    `heroui-chip-${props.variant}`,
    `heroui-chip-${props.color}`,
    `heroui-chip-${props.size}`,
    `heroui-chip-radius-${props.radius}`,
    {
      'heroui-chip-disabled': props.isDisabled
    }
  ];
});

const handleClose = (e: MouseEvent) => {
  if (props.isDisabled) return;
  emit('close', e);
};
</script>

<template>
  <div :class="classes">
    <span v-if="variant === 'dot'" class="heroui-chip-dot"></span>
    <slot name="startContent"></slot>
    <span class="heroui-chip-content">
      <slot></slot>
    </span>
    <slot name="endContent"></slot>

    <button v-if="isCloseable" class="heroui-chip-close-button" @click="handleClose" type="button">
        <!-- Close Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
        </svg>
    </button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-chip
  position relative
  display inline-flex
  align-items center
  justify-content space-between
  box-sizing border-box
  white-space nowrap
  vertical-align middle

  &-content
    flex-grow 1
    display flex
    align-items center

  &-dot
    width 6px
    height 6px
    border-radius 50%
    background-color currentColor
    margin-right $spacing-2

  &-close-button
    appearance none
    background transparent
    border none
    cursor pointer
    padding 0
    margin-left $spacing-1
    display inline-flex
    align-items center
    justify-content center
    color inherit
    opacity 0.7
    &:hover
      opacity 1

  // Sizes
  &-sm
    padding 0 $spacing-2
    height 24px
    font-size $font-tiny
  &-md
    padding 0 $spacing-3
    height 28px
    font-size $font-small
  &-lg
    padding 0 $spacing-4
    height 32px
    font-size $font-medium

  // Radius
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large
  &-radius-full
    border-radius $radius-full

  // Variants & Colors
  &-solid
    &.heroui-chip-default
       background-color var(--heroui-default)
       color var(--heroui-default-foreground)
    &.heroui-chip-primary
       background-color var(--heroui-primary)
       color var(--heroui-primary-foreground)
    // ...

  &-bordered
    background-color transparent
    border 2px solid currentColor
    &.heroui-chip-default
       color var(--heroui-default)
       border-color var(--heroui-default)

  &-disabled
    opacity 0.5
    pointer-events none

</style>
