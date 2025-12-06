<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
  label?: string;
  value?: number | number[];
  minValue?: number;
  maxValue?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isDisabled?: boolean;
  showSteps?: boolean;
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  minValue: 0,
  maxValue: 100,
  step: 1,
  size: 'md',
  color: 'primary',
  isDisabled: false,
  showSteps: false,
  showTooltip: false
});

const emit = defineEmits<{
  (e: 'update:value', value: number | number[]): void;
  (e: 'change', value: number | number[]): void;
}>();

const sliderRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const normalizeValue = (val: number) => {
    return Math.max(props.minValue, Math.min(props.maxValue, val));
};

const currentValue = computed(() => {
    if (Array.isArray(props.value)) {
        return props.value.map(normalizeValue);
    }
    return normalizeValue(props.value);
});

const percentage = computed(() => {
    if (Array.isArray(currentValue.value)) {
        // Range slider logic needed
        return 0;
    }
    return ((currentValue.value - props.minValue) / (props.maxValue - props.minValue)) * 100;
});

const handleMouseDown = (e: MouseEvent) => {
    if (props.isDisabled) return;
    isDragging.value = true;
    updateValueFromEvent(e);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.value) {
        updateValueFromEvent(e);
    }
};

const handleMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
};

const updateValueFromEvent = (e: MouseEvent) => {
    if (!sliderRef.value) return;
    const rect = sliderRef.value.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    const rawValue = props.minValue + percent * (props.maxValue - props.minValue);
    const steppedValue = Math.round(rawValue / props.step) * props.step;

    emit('update:value', steppedValue);
    emit('change', steppedValue);
};

const classes = computed(() => {
    return [
        'heroui-slider',
        `heroui-slider-${props.size}`,
        `heroui-slider-${props.color}`,
        {
            'heroui-slider-disabled': props.isDisabled
        }
    ]
});
</script>

<template>
  <div :class="classes">
    <div v-if="label" class="heroui-slider-label">{{ label }}</div>
    <div class="heroui-slider-track-container" ref="sliderRef" @mousedown="handleMouseDown">
        <div class="heroui-slider-track">
            <div class="heroui-slider-filler" :style="{ width: `${percentage}%` }"></div>
            <div class="heroui-slider-thumb" :style="{ left: `${percentage}%` }"></div>
        </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-slider
  display flex
  flex-direction column
  width 100%
  gap $spacing-2
  user-select none
  touch-action none

  &-label
    font-size $font-small
    font-weight 500
    color var(--heroui-foreground)

  &-track-container
    position relative
    width 100%
    height 20px // Hit area
    display flex
    align-items center
    cursor pointer

  &-track
    position relative
    width 100%
    background-color var(--heroui-default-200)
    border-radius 9999px

  &-filler
    position absolute
    height 100%
    background-color currentColor
    border-radius inherit

  &-thumb
    position absolute
    top 50%
    transform translate(-50%, -50%)
    background-color white
    border-radius 50%
    box-shadow 0 2px 4px rgba(0,0,0,0.2)
    cursor grab
    &:active
       cursor grabbing

  &-disabled
    opacity 0.5
    pointer-events none

  // Sizes
  &-sm
    .heroui-slider-track
       height 2px
    .heroui-slider-thumb
       width 12px
       height 12px
  &-md
    .heroui-slider-track
       height 4px
    .heroui-slider-thumb
       width 16px
       height 16px
  &-lg
    .heroui-slider-track
       height 6px
    .heroui-slider-thumb
       width 20px
       height 20px

  // Colors
  &-default
    .heroui-slider-filler
        background-color var(--heroui-default)
    .heroui-slider-thumb
        border 2px solid var(--heroui-default) // Optional border

  &-primary
    .heroui-slider-filler
        background-color var(--heroui-primary)
    .heroui-slider-thumb
        border 2px solid var(--heroui-primary)

  // ... other colors

</style>
