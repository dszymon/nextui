<script setup lang="ts">
import { computed, inject } from 'vue';

interface Props {
  isSelected?: boolean;
  value?: string;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: undefined,
  isDisabled: false,
  size: 'md',
  color: 'primary'
});

const emit = defineEmits<{
  (e: 'update:isSelected', value: boolean): void;
  (e: 'change', value: string): void;
}>();

const groupContext = inject('radioGroup', null) as any;

const isChecked = computed(() => {
    if (groupContext) {
        return groupContext.modelValue.value === props.value;
    }
    return props.isSelected;
});

const isDisabledComputed = computed(() => {
    if (groupContext && groupContext.isDisabled.value) return true;
    return props.isDisabled;
});

const sizeComputed = computed(() => groupContext?.size.value || props.size);
const colorComputed = computed(() => groupContext?.color.value || props.color);

const classes = computed(() => {
  return [
    'heroui-radio',
    `heroui-radio-${sizeComputed.value}`,
    `heroui-radio-${colorComputed.value}`,
    {
      'heroui-radio-disabled': isDisabledComputed.value,
      'heroui-radio-selected': isChecked.value
    }
  ];
});

const handleChange = () => {
  if (isDisabledComputed.value) return;

  if (groupContext) {
      groupContext.updateValue(props.value);
  } else {
      emit('update:isSelected', true);
      if (props.value) emit('change', props.value);
  }
};
</script>

<template>
  <label :class="classes">
    <input
      type="radio"
      class="heroui-radio-input"
      :checked="isChecked"
      :disabled="isDisabledComputed"
      :value="value"
      @change="handleChange"
    />
    <span class="heroui-radio-point"></span>
    <div class="heroui-radio-label-wrapper">
      <span v-if="$slots.default" class="heroui-radio-label">
        <slot></slot>
      </span>
      <span v-if="description" class="heroui-radio-description">{{ description }}</span>
    </div>
  </label>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-radio
  display inline-flex
  align-items center
  cursor pointer
  position relative
  user-select none

  &-disabled
    opacity 0.5
    cursor not-allowed

  &-input
    position absolute
    width 1px
    height 1px
    padding 0
    margin -1px
    overflow hidden
    clip rect(0, 0, 0, 0)
    white-space nowrap
    border 0

  &-point
    position relative
    display inline-flex
    align-items center
    justify-content center
    flex-shrink 0
    border-radius 9999px
    border 2px solid var(--heroui-default-400)
    transition border-color 0.2s, background-color 0.2s

    &::after
      content ""
      display block
      border-radius 9999px
      background-color transparent
      transform scale(0)
      transition transform 0.2s, background-color 0.2s

  &-selected .heroui-radio-point
    border-color transparent
    // bg color set by variant

    &::after
      transform scale(1)
      background-color currentColor // uses color from parent

  &-label-wrapper
    display flex
    flex-direction column
    margin-left $spacing-2

  &-label
    font-size $font-medium
    color var(--heroui-foreground)

  &-description
    font-size $font-tiny
    color var(--heroui-default-500)

  // Sizes
  &-sm
    .heroui-radio-point
      width 16px
      height 16px
      &::after
        width 6px
        height 6px
    .heroui-radio-label
      font-size $font-small
  &-md
    .heroui-radio-point
      width 20px
      height 20px
      &::after
        width 8px
        height 8px
    .heroui-radio-label
      font-size $font-medium
  &-lg
    .heroui-radio-point
      width 24px
      height 24px
      &::after
        width 10px
        height 10px
    .heroui-radio-label
      font-size $font-large

  // Colors
  &-default
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-default)
      &::after
        background-color var(--heroui-default)
  &-primary
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-primary)
      &::after
        background-color var(--heroui-primary)
  &-secondary
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-secondary)
      &::after
        background-color var(--heroui-secondary)
  &-success
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-success)
      &::after
        background-color var(--heroui-success)
  &-warning
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-warning)
      &::after
        background-color var(--heroui-warning)
  &-danger
    &.heroui-radio-selected .heroui-radio-point
      border-color var(--heroui-danger)
      &::after
        background-color var(--heroui-danger)
</style>
