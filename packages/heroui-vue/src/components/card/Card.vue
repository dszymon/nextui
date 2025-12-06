<script setup lang="ts">
import { computed } from 'vue';
import { vRipple } from '../../directives/ripple';

interface Props {
  variant?: 'shadow' | 'bordered' | 'flat' | 'faded';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  isPressable?: boolean;
  isHoverable?: boolean;
  isFooterBlurred?: boolean;
  isDisabled?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'shadow',
  radius: 'lg',
  isPressable: false,
  isHoverable: false,
  isFooterBlurred: false,
  isDisabled: false,
  disableRipple: false,
  fullWidth: false
});

const emit = defineEmits<{
  (e: 'click', payload: MouseEvent): void
}>();

const classes = computed(() => {
  return [
    'heroui-card',
    `heroui-card-${props.variant}`,
    `heroui-card-radius-${props.radius}`,
    {
      'heroui-card-pressable': props.isPressable,
      'heroui-card-hoverable': props.isHoverable,
      'heroui-card-footer-blurred': props.isFooterBlurred,
      'heroui-card-disabled': props.isDisabled,
      'heroui-card-full-width': props.fullWidth
    }
  ];
});

const rippleOptions = computed(() => ({
  disabled: !props.isPressable || props.disableRipple || props.isDisabled
}));

const handleClick = (e: MouseEvent) => {
  if (props.isDisabled) return;
  emit('click', e);
};
</script>

<template>
  <div
    :class="classes"
    v-ripple="rippleOptions"
    @click="handleClick"
    :role="isPressable ? 'button' : undefined"
    :tabindex="isPressable ? 0 : undefined"
  >
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-card
  display flex
  flex-direction column
  position relative
  overflow hidden
  height auto
  outline none
  box-sizing border-box
  background-color var(--heroui-background)
  color var(--heroui-foreground)
  z-index 10
  transition transform 0.2s, box-shadow 0.2s

  &-full-width
    width 100%

  // Radius
  &-radius-none
    border-radius 0
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large

  // Variants
  &-shadow
    box-shadow 0 4px 14px 0 rgba(0,0,0,0.1)

  &-bordered
    border 2px solid var(--heroui-default-200)
    background-color transparent

  &-flat
    background-color var(--heroui-default-100)

  // Interactive states
  &-pressable
    cursor pointer
    &:active:not(.heroui-card-disabled)
      transform scale(0.97)

  &-hoverable
    &:hover:not(.heroui-card-disabled)
      transform translateY(-2px)
      box-shadow 0 10px 20px -5px rgba(0,0,0,0.15)

  &-disabled
    opacity 0.7
    cursor not-allowed
    pointer-events none

</style>
