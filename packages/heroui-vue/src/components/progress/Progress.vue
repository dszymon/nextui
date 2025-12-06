<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  label?: string;
  showValueLabel?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isStriped?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  minValue: 0,
  maxValue: 100,
  size: 'md',
  color: 'primary',
  radius: 'full',
  showValueLabel: false,
  isIndeterminate: false,
  isDisabled: false,
  isStriped: false
});

const percentage = computed(() => {
  const { value, minValue, maxValue } = props;
  const clampedValue = Math.min(Math.max(value, minValue), maxValue);
  return ((clampedValue - minValue) / (maxValue - minValue)) * 100;
});

const valueLabel = computed(() => {
  if (props.formatOptions) {
    return new Intl.NumberFormat('en-US', props.formatOptions).format(props.value);
  }
  return `${Math.round(percentage.value)}%`;
});

const classes = computed(() => {
  return [
    'heroui-progress',
    `heroui-progress-${props.size}`,
    `heroui-progress-${props.color}`,
    `heroui-progress-radius-${props.radius}`,
    {
      'heroui-progress-indeterminate': props.isIndeterminate,
      'heroui-progress-disabled': props.isDisabled,
      'heroui-progress-striped': props.isStriped
    }
  ];
});
</script>

<template>
  <div :class="classes" role="progressbar" :aria-valuenow="value" :aria-valuemin="minValue" :aria-valuemax="maxValue">
    <div v-if="label || showValueLabel" class="heroui-progress-label-wrapper">
      <span v-if="label" class="heroui-progress-label">{{ label }}</span>
      <span v-if="showValueLabel" class="heroui-progress-value">{{ valueLabel }}</span>
    </div>

    <div class="heroui-progress-track">
      <div
        class="heroui-progress-indicator"
        :style="{ width: isIndeterminate ? undefined : `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-progress
  display flex
  flex-direction column
  gap $spacing-1
  width 100%

  &-label-wrapper
    display flex
    justify-content space-between
    align-items center

  &-label
    font-size $font-small
    color var(--heroui-foreground)

  &-value
    font-size $font-small
    color var(--heroui-default-500)

  &-track
    position relative
    width 100%
    background-color var(--heroui-default-200)
    overflow hidden

  &-indicator
    height 100%
    background-color currentColor
    transition width 0.3s ease

  // Sizes (height of track)
  &-sm
    .heroui-progress-track
      height 4px
  &-md
    .heroui-progress-track
      height 8px
  &-lg
    .heroui-progress-track
      height 12px

  // Radius
  &-radius-sm
    .heroui-progress-track, .heroui-progress-indicator
      border-radius $radius-small
  &-radius-md
    .heroui-progress-track, .heroui-progress-indicator
      border-radius $radius-medium
  &-radius-lg
    .heroui-progress-track, .heroui-progress-indicator
      border-radius $radius-large
  &-radius-full
    .heroui-progress-track, .heroui-progress-indicator
      border-radius 9999px

  // Colors
  &-default
    .heroui-progress-indicator
      background-color var(--heroui-default)
  &-primary
    .heroui-progress-indicator
      background-color var(--heroui-primary)
  &-success
    .heroui-progress-indicator
      background-color var(--heroui-success)
  &-warning
    .heroui-progress-indicator
      background-color var(--heroui-warning)
  &-danger
    .heroui-progress-indicator
      background-color var(--heroui-danger)

  // Indeterminate Animation
  &-indeterminate
    .heroui-progress-indicator
      width 100% !important
      position absolute
      top 0
      left 0
      bottom 0
      transform-origin left
      animation progress-indeterminate 1.5s infinite ease-in-out

  // Striped
  &-striped
    .heroui-progress-indicator
      background-image linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      )
      background-size 1rem 1rem

  &-disabled
    opacity 0.5

@keyframes progress-indeterminate
  0%
    transform translateX(-100%) scaleX(0.2)
  50%
    transform translateX(0%) scaleX(1)
  100%
    transform translateX(100%) scaleX(0.2)
</style>
