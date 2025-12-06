<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  symbol?: string;
  codeString?: string;
  hideSymbol?: boolean;
  hideCopyButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'flat' | 'solid' | 'bordered' | 'shadow';
}

const props = withDefaults(defineProps<Props>(), {
  symbol: '$',
  hideSymbol: false,
  hideCopyButton: false,
  size: 'md',
  color: 'default',
  radius: 'lg',
  variant: 'flat'
});

const classes = computed(() => {
  return [
    'heroui-snippet',
    `heroui-snippet-${props.size}`,
    `heroui-snippet-${props.color}`,
    `heroui-snippet-${props.variant}`,
    `heroui-snippet-radius-${props.radius}`
  ];
});

const handleCopy = () => {
    if (props.codeString || !props.hideCopyButton) {
        // Copy logic
        const text = props.codeString || ""; // Or extract from slot if possible
        navigator.clipboard.writeText(text);
    }
}
</script>

<template>
  <div :class="classes">
    <div class="heroui-snippet-content">
       <span v-if="!hideSymbol" class="heroui-snippet-symbol">{{ symbol }}</span>
       <pre class="heroui-snippet-pre"><slot>{{ codeString }}</slot></pre>
    </div>

    <button v-if="!hideCopyButton" class="heroui-snippet-copy-button" @click="handleCopy" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    </button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-snippet
  display flex
  align-items center
  justify-content space-between
  padding $spacing-2 $spacing-4
  gap $spacing-4
  width fit-content
  min-width 200px
  max-width 100%
  font-family monospace

  &-content
    display flex
    align-items center
    gap $spacing-2
    overflow hidden
    flex 1

  &-symbol
    user-select none
    opacity 0.7

  &-pre
    margin 0
    padding 0
    background transparent
    border none
    font-family inherit
    white-space pre-wrap
    word-break break-all
    overflow hidden
    text-overflow ellipsis

  &-copy-button
    flex-shrink 0
    background transparent
    border none
    cursor pointer
    padding 4px
    border-radius $radius-small
    transition background-color 0.2s
    color inherit
    opacity 0.7
    &:hover
      opacity 1
      background-color rgba(0,0,0,0.1)

  // Sizes
  &-sm
    font-size $font-tiny
    padding $spacing-1 $spacing-2
  &-md
    font-size $font-small
    padding $spacing-2 $spacing-4
  &-lg
    font-size $font-medium
    padding $spacing-3 $spacing-6

  // Radius
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large

  // Variants
  &-flat
    background-color var(--heroui-default-100)
    color var(--heroui-foreground)

    &.heroui-snippet-primary
        background-color var(--heroui-primary-100)
        color var(--heroui-primary-700)
        // copy button color?

  &-solid
    &.heroui-snippet-default
        background-color var(--heroui-default)
        color var(--heroui-default-foreground)

  &-bordered
    background-color transparent
    border 2px solid var(--heroui-default-200)

</style>
