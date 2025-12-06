<script setup lang="ts">
import { computed, inject } from 'vue';

interface Props {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  lineThrough?: boolean;
  value?: string;
  name?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: undefined,
  isIndeterminate: false,
  isDisabled: false,
  isReadOnly: false,
  size: 'md',
  color: 'primary',
  radius: 'md',
  lineThrough: false
});

const emit = defineEmits<{
  (e: 'update:isSelected', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const groupContext = inject('checkboxGroup', null) as any;

const isChecked = computed(() => {
    if (groupContext && props.value) {
        return groupContext.modelValue.value.includes(props.value);
    }
    return props.isSelected;
});

const isDisabledComputed = computed(() => groupContext?.isDisabled.value || props.isDisabled);
const isReadOnlyComputed = computed(() => groupContext?.isReadOnly.value || props.isReadOnly);
const sizeComputed = computed(() => groupContext?.size.value || props.size);
const colorComputed = computed(() => groupContext?.color.value || props.color);
const lineThroughComputed = computed(() => groupContext?.lineThrough.value || props.lineThrough);

const classes = computed(() => {
  return [
    'heroui-checkbox',
    `heroui-checkbox-${sizeComputed.value}`,
    `heroui-checkbox-${colorComputed.value}`,
    `heroui-checkbox-radius-${props.radius}`,
    {
      'heroui-checkbox-disabled': isDisabledComputed.value,
      'heroui-checkbox-checked': isChecked.value,
      'heroui-checkbox-indeterminate': props.isIndeterminate
    }
  ];
});

const labelClasses = computed(() => {
    return [
        'heroui-checkbox-label',
        {
            'heroui-checkbox-label-line-through': lineThroughComputed.value && isChecked.value
        }
    ]
});

const handleChange = (event: Event) => {
  if (isDisabledComputed.value || isReadOnlyComputed.value) return;
  const target = event.target as HTMLInputElement;

  if (groupContext && props.value) {
      groupContext.updateValue(props.value);
  } else {
      emit('update:isSelected', target.checked);
      emit('change', target.checked);
  }
};
</script>

<template>
  <label :class="classes">
    <input
      type="checkbox"
      class="heroui-checkbox-input"
      :checked="isChecked"
      :indeterminate="isIndeterminate"
      :disabled="isDisabledComputed"
      :readonly="isReadOnlyComputed"
      :name="name"
      :required="required"
      @change="handleChange"
    />
    <span class="heroui-checkbox-wrapper" aria-hidden="true">
      <svg
        v-if="isIndeterminate"
        class="heroui-checkbox-icon heroui-checkbox-icon-indeterminate"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
         <line x1="21" x2="3" y1="12" y2="12" />
      </svg>
      <svg
        v-else
        class="heroui-checkbox-icon heroui-checkbox-icon-check"
        viewBox="0 0 17 18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </span>
    <span v-if="$slots.default" :class="labelClasses">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-checkbox
  display inline-flex
  align-items center
  cursor pointer
  position relative
  user-select none
  transition opacity 0.2s

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

  &-wrapper
    display inline-flex
    align-items center
    justify-content center
    box-sizing border-box
    border 2px solid var(--heroui-default-400) // Unchecked color
    transition background-color 0.2s, border-color 0.2s
    color white
    overflow hidden

  &-icon
    width 100%
    height 100%
    opacity 0
    transition opacity 0.2s, transform 0.2s
    transform scale(0.5)

  // Checked/Indeterminate States
  &-checked .heroui-checkbox-wrapper,
  &-indeterminate .heroui-checkbox-wrapper
    border-color transparent
    // Color will be set by variant classes

  &-checked .heroui-checkbox-icon,
  &-indeterminate .heroui-checkbox-icon
    opacity 1
    transform scale(1)

  // Label
  &-label
    margin-left $spacing-2
    font-size $font-medium
    color var(--heroui-foreground)
    transition color 0.2s

    &-line-through
      text-decoration line-through
      opacity 0.7

  // Sizes
  &-sm
    .heroui-checkbox-wrapper
      width 16px
      height 16px
      border-radius $radius-small
    .heroui-checkbox-label
      font-size $font-small
  &-md
    .heroui-checkbox-wrapper
      width 20px
      height 20px
      border-radius $radius-medium
    .heroui-checkbox-label
      font-size $font-medium
  &-lg
    .heroui-checkbox-wrapper
      width 24px
      height 24px
      border-radius $radius-large
    .heroui-checkbox-label
      font-size $font-large

  // Radius Overrides
  &-radius-full .heroui-checkbox-wrapper
    border-radius 9999px

  // Colors
  &-default
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-default)
      color var(--heroui-default-foreground)
  &-primary
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-primary)
      color var(--heroui-primary-foreground)
  &-secondary
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-secondary)
      color var(--heroui-secondary-foreground)
  &-success
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-success)
      color var(--heroui-success-foreground)
  &-warning
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-warning)
      color var(--heroui-warning-foreground)
  &-danger
    &.heroui-checkbox-checked .heroui-checkbox-wrapper,
    &.heroui-checkbox-indeterminate .heroui-checkbox-wrapper
      background-color var(--heroui-danger)
      color var(--heroui-danger-foreground)
</style>
