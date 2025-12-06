<script setup lang="ts">
import { computed, ref, inject, watch, onMounted, getCurrentInstance } from 'vue';

interface Props {
  title?: string;
  subtitle?: string;
  indicator?: any;
  isDisabled?: boolean;
  // Key prop is reserved in Vue, so we need another way to identify items if not provided explicitly.
  // Using 'value' or just relying on internal ID.
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false
});

const instance = getCurrentInstance();
const itemKey = props.value || `accordion-item-${instance?.uid}`;

const accordion = inject('accordion', {
    openItems: ref(new Set<string>()),
    toggleItem: (key: string) => {},
    variant: 'light'
});

const isOpen = computed(() => accordion.openItems.value.has(itemKey));

const toggle = () => {
  if (props.isDisabled) return;
  accordion.toggleItem(itemKey);
};

const classes = computed(() => {
  return [
    'heroui-accordion-item',
    {
      'heroui-accordion-item-open': isOpen.value,
      'heroui-accordion-item-disabled': props.isDisabled
    }
  ];
});
</script>

<template>
  <div :class="classes">
    <button
      class="heroui-accordion-item-trigger"
      @click="toggle"
      :aria-expanded="isOpen"
      :disabled="isDisabled"
      type="button"
    >
      <div class="heroui-accordion-item-title-wrapper">
        <span v-if="title" class="heroui-accordion-item-title">{{ title }}</span>
        <span v-if="subtitle" class="heroui-accordion-item-subtitle">{{ subtitle }}</span>
        <slot name="title"></slot>
      </div>
      <span class="heroui-accordion-item-indicator">
        <slot name="indicator">
          <!-- Default chevron -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="heroui-accordion-chevron"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </slot>
      </span>
    </button>

    <div
      class="heroui-accordion-item-content"
      :style="{ maxHeight: isOpen ? '1000px' : '0px' }"
    >
      <div class="heroui-accordion-item-content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-accordion-item
  border-bottom 1px solid var(--heroui-divider)
  &:last-child
    border-bottom none

  &-disabled
    opacity 0.5
    pointer-events none

  &-trigger
    display flex
    align-items center
    justify-content space-between
    width 100%
    padding $spacing-4 0
    background transparent
    border none
    cursor pointer
    text-align left
    outline none

    &:focus-visible
      z-index 1
      outline 2px solid var(--heroui-focus)
      border-radius $radius-small

  &-title-wrapper
    display flex
    flex-direction column

  &-title
    font-size $font-medium
    font-weight 500
    color var(--heroui-foreground)

  &-subtitle
    font-size $font-small
    color var(--heroui-default-500)

  &-indicator
    margin-left $spacing-2
    color var(--heroui-default-500)
    transition transform 0.3s ease

  &-content
    overflow hidden
    transition max-height 0.3s cubic-bezier(0, 1, 0, 1) // Ease-out

  &-content-inner
    padding-bottom $spacing-4
    color var(--heroui-default-700)

  // Open state
  &-open
    .heroui-accordion-chevron
      transform rotate(-90deg)

.heroui-accordion-chevron
  width 1.5em
  height 1.5em
  transition transform 0.3s ease
  transform rotate(0deg)

</style>
