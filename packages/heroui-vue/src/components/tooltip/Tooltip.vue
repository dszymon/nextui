<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';

interface Props {
  isOpen?: boolean;
  content?: string; // If using simple prop content
  placement?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'foreground';
  showArrow?: boolean;
  offset?: number;
  isDisabled?: boolean;
  trigger?: 'hover' | 'click'; // Simple implementation for now
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: undefined,
  placement: 'top',
  color: 'default',
  showArrow: false,
  offset: 7,
  isDisabled: false,
  trigger: 'hover'
});

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

const internalOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);

const isVisible = computed(() => {
    return props.isOpen !== undefined ? props.isOpen : internalOpen.value;
});

const handleMouseEnter = () => {
    if (props.isDisabled || props.trigger !== 'hover') return;
    internalOpen.value = true;
    emit('update:isOpen', true);
};

const handleMouseLeave = () => {
    if (props.isDisabled || props.trigger !== 'hover') return;
    internalOpen.value = false;
    emit('update:isOpen', false);
};

const classes = computed(() => {
  return [
    'heroui-tooltip',
    `heroui-tooltip-${props.placement}`,
    `heroui-tooltip-${props.color}`,
    {
      'heroui-tooltip-arrow': props.showArrow
    }
  ];
});

// Positioning logic would ideally use floating-ui, but native simple implementation here:
const positionStyles = computed(() => {
    // In a real implementation we need JS to calculate position relative to trigger.
    // For this SFC, we can use simple absolute positioning if container is relative,
    // or fixed positioning if we had coords.
    // Simplified: Tooltip is rendered next to trigger in DOM for CSS simplicity or using absolute.
    return {};
});

</script>

<template>
  <div
    class="heroui-tooltip-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="triggerRef"
  >
    <slot></slot>

    <transition name="tooltip-fade">
        <div
          v-if="isVisible"
          :class="classes"
          role="tooltip"
          ref="tooltipRef"
        >
          <div v-if="showArrow" class="heroui-tooltip-arrow-element"></div>
          <div class="heroui-tooltip-content">
             <slot name="content">{{ content }}</slot>
          </div>
        </div>
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-tooltip-wrapper
  display inline-block
  position relative

.heroui-tooltip
  position absolute
  z-index 50
  padding 4px 8px
  border-radius $radius-small
  font-size $font-tiny
  white-space nowrap
  box-shadow 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  pointer-events none

  &-content
    position relative
    z-index 2

  // Placements (Simplified CSS positioning)
  &-top
    bottom 100%
    left 50%
    transform translateX(-50%) translateY(-8px) // Offset
    margin-bottom 4px

  &-bottom
    top 100%
    left 50%
    transform translateX(-50%) translateY(8px)
    margin-top 4px

  &-left
    right 100%
    top 50%
    transform translateY(-50%) translateX(-8px)
    margin-right 4px

  &-right
    left 100%
    top 50%
    transform translateY(-50%) translateX(8px)
    margin-left 4px

  // Colors
  &-default
    background-color var(--heroui-foreground)
    color var(--heroui-background)
    .heroui-tooltip-arrow-element
        background-color var(--heroui-foreground)

  &-primary
    background-color var(--heroui-primary)
    color var(--heroui-primary-foreground)
    .heroui-tooltip-arrow-element
        background-color var(--heroui-primary)

  // Arrow
  &-arrow-element
    position absolute
    width 8px
    height 8px
    transform rotate(45deg)
    z-index 1

.heroui-tooltip-top .heroui-tooltip-arrow-element
    bottom -4px
    left 50%
    margin-left -4px

.heroui-tooltip-bottom .heroui-tooltip-arrow-element
    top -4px
    left 50%
    margin-left -4px

.heroui-tooltip-left .heroui-tooltip-arrow-element
    right -4px
    top 50%
    margin-top -4px

.heroui-tooltip-right .heroui-tooltip-arrow-element
    left -4px
    top 50%
    margin-top -4px

// Transitions
.tooltip-fade-enter-active,
.tooltip-fade-leave-active
  transition opacity 0.2s, transform 0.2s

.tooltip-fade-enter-from,
.tooltip-fade-leave-to
  opacity 0
  // Scale or translate slightly?

</style>
