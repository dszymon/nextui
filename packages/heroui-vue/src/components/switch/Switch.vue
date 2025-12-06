<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isSelected?: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  name?: string;
  value?: string;
  startContent?: any;
  endContent?: any;
  thumbIcon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  isDisabled: false,
  size: 'md',
  color: 'primary'
});

const emit = defineEmits<{
  (e: 'update:isSelected', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const classes = computed(() => {
  return [
    'heroui-switch',
    `heroui-switch-${props.size}`,
    `heroui-switch-${props.color}`,
    {
      'heroui-switch-checked': props.isSelected,
      'heroui-switch-disabled': props.isDisabled
    }
  ];
});

const handleChange = (event: Event) => {
  if (props.isDisabled) return;
  const target = event.target as HTMLInputElement;
  emit('update:isSelected', target.checked);
  emit('change', target.checked);
};
</script>

<template>
  <label :class="classes">
    <input
      type="checkbox"
      class="heroui-switch-input"
      :checked="isSelected"
      :disabled="isDisabled"
      :name="name"
      :value="value"
      role="switch"
      @change="handleChange"
    />
    <div class="heroui-switch-wrapper">
      <span v-if="startContent" class="heroui-switch-start-content">
        <component :is="startContent" />
      </span>

      <span class="heroui-switch-thumb">
        <component :is="thumbIcon" v-if="thumbIcon" class="heroui-switch-thumb-icon" />
      </span>

      <span v-if="endContent" class="heroui-switch-end-content">
        <component :is="endContent" />
      </span>
    </div>
    <span v-if="$slots.default" class="heroui-switch-label">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-switch
  display inline-flex
  align-items center
  position relative
  cursor pointer
  user-select none
  opacity 1
  transition opacity 0.25s

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
    position relative
    display inline-flex
    align-items center
    justify-content space-between
    background-color var(--heroui-default-200)
    border-radius 9999px
    transition background-color 0.3s
    overflow hidden

  &-thumb
    position absolute
    background-color white
    border-radius 50%
    box-shadow 0 1px 2px rgba(0,0,0,0.2)
    transition transform 0.3s
    display flex
    align-items center
    justify-content center

  &-label
    margin-left $spacing-2
    font-size $font-medium
    color var(--heroui-foreground)

  // Checked State
  &-checked .heroui-switch-wrapper
    // bg color set by variant

  &-checked .heroui-switch-thumb
    transform translateX(100%)

  // Sizes
  &-sm
    .heroui-switch-wrapper
      width 32px
      height 20px
      padding 2px
    .heroui-switch-thumb
      width 16px
      height 16px
    &-checked .heroui-switch-thumb
        transform translateX(12px)

  &-md
    .heroui-switch-wrapper
      width 44px
      height 28px
      padding 2px
    .heroui-switch-thumb
      width 24px
      height 24px
    &-checked .heroui-switch-thumb
        transform translateX(16px)

  &-lg
    .heroui-switch-wrapper
      width 56px
      height 32px
      padding 2px
    .heroui-switch-thumb
      width 28px
      height 28px
    &-checked .heroui-switch-thumb
        transform translateX(24px)

  // Colors (only when checked)
  &-checked
    &.heroui-switch-default .heroui-switch-wrapper
      background-color var(--heroui-default)
    &.heroui-switch-primary .heroui-switch-wrapper
      background-color var(--heroui-primary)
    &.heroui-switch-secondary .heroui-switch-wrapper
      background-color var(--heroui-secondary)
    &.heroui-switch-success .heroui-switch-wrapper
      background-color var(--heroui-success)
    &.heroui-switch-warning .heroui-switch-wrapper
      background-color var(--heroui-warning)
    &.heroui-switch-danger .heroui-switch-wrapper
      background-color var(--heroui-danger)

</style>
