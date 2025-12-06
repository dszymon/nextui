<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  variant: 'flat',
  color: 'default',
  size: 'md',
  radius: 'md',
  labelPlacement: 'inside',
  type: 'text',
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', event: Event): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', event);
};

const classes = computed(() => {
  return [
    'heroui-input-wrapper',
    `heroui-input-${props.variant}`,
    `heroui-input-${props.size}`,
    `heroui-input-${props.color}`,
    `heroui-input-radius-${props.radius}`,
    `heroui-input-label-${props.labelPlacement}`,
    {
      'heroui-input-invalid': props.isInvalid,
      'heroui-input-disabled': props.isDisabled,
      'heroui-input-has-value': !!props.modelValue
    }
  ];
});
</script>

<template>
  <div :class="classes">
    <label v-if="label && labelPlacement === 'outside'" class="heroui-input-label-outside">
      {{ label }}
      <span v-if="isRequired" class="heroui-input-required-indicator">*</span>
    </label>

    <div class="heroui-input-inner-wrapper">
       <label v-if="label && labelPlacement === 'inside'" class="heroui-input-label-inside">
         {{ label }}
         <span v-if="isRequired" class="heroui-input-required-indicator">*</span>
       </label>

       <div class="heroui-input-content">
         <slot name="startContent"></slot>
         <input
            :type="type"
            class="heroui-input-field"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :readonly="isReadOnly"
            :required="isRequired"
            @input="handleInput"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
         />
         <slot name="endContent"></slot>
       </div>
    </div>

    <div v-if="isInvalid && errorMessage" class="heroui-input-helper-text heroui-input-error-message">
      {{ errorMessage }}
    </div>
    <div v-else-if="description" class="heroui-input-helper-text">
      {{ description }}
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-input-wrapper
  display flex
  flex-direction column
  position relative
  width 100%

  // Label Outside
  .heroui-input-label-outside
    font-size $font-small
    font-weight 500
    margin-bottom $spacing-1
    color var(--heroui-foreground)

  // Inner Wrapper (The input container)
  .heroui-input-inner-wrapper
    display flex
    flex-direction column
    position relative
    width 100%
    transition background-color 0.2s, border-color 0.2s, box-shadow 0.2s
    box-sizing border-box

  .heroui-input-content
    display flex
    align-items center
    width 100%
    height 100%

  .heroui-input-field
    width 100%
    height 100%
    background transparent
    border none
    outline none
    padding 0
    margin 0
    color var(--heroui-foreground)
    font-size inherit
    &::placeholder
      color var(--heroui-default-400)

  // Helper Text
  .heroui-input-helper-text
    font-size $font-tiny
    margin-top $spacing-1
    color var(--heroui-default-500)

  .heroui-input-error-message
    color var(--heroui-danger)

  // Label Inside
  .heroui-input-label-inside
    font-size $font-tiny
    color var(--heroui-default-500)
    margin-bottom 2px

  // Variants
  &-flat
    .heroui-input-inner-wrapper
      background-color var(--heroui-default-100)
      border none
      &:focus-within
         background-color var(--heroui-default-200) // Slightly darker on focus?
         outline 2px solid var(--heroui-focus) // Focus ring
         outline-offset 2px

  &-bordered
    .heroui-input-inner-wrapper
      background-color transparent
      border 2px solid var(--heroui-default-200)
      &:focus-within
        border-color var(--heroui-focus)

  &-underlined
    .heroui-input-inner-wrapper
      background-color transparent
      border-bottom 2px solid var(--heroui-default-200)
      border-radius 0 !important
      &:focus-within
         border-color var(--heroui-focus)

  &-faded
    .heroui-input-inner-wrapper
      background-color var(--heroui-default-100)
      border 2px solid var(--heroui-default-200)
      &:focus-within
        background-color var(--heroui-background)
        border-color var(--heroui-default-400)

  // Sizes & Padding
  &-sm
    .heroui-input-inner-wrapper
      padding $spacing-1 $spacing-2
      min-height 32px
    font-size $font-small
  &-md
    .heroui-input-inner-wrapper
      padding $spacing-2 $spacing-3
      min-height 40px
    font-size $font-medium
  &-lg
    .heroui-input-inner-wrapper
      padding $spacing-3 $spacing-4
      min-height 48px
    font-size $font-large

  // Radius
  &-radius-sm .heroui-input-inner-wrapper
    border-radius $radius-small
  &-radius-md .heroui-input-inner-wrapper
    border-radius $radius-medium
  &-radius-lg .heroui-input-inner-wrapper
    border-radius $radius-large
  &-radius-full .heroui-input-inner-wrapper
    border-radius 9999px

  // Label Placement: Inside adjustments
  &-label-inside
    &.heroui-input-has-value, &:focus-within
      // Move label or styling if needed.
      // Current structure has explicit label element for inside.

  // Invalid State
  &-invalid
    .heroui-input-inner-wrapper
       border-color var(--heroui-danger) !important
    .heroui-input-label-outside, .heroui-input-label-inside
       color var(--heroui-danger)

</style>
