<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  underline?: 'none' | 'hover' | 'always' | 'active' | 'focus';
  isExternal?: boolean;
  showAnchorIcon?: boolean;
  href?: string;
  isDisabled?: boolean;
  isBlock?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  underline: 'hover',
  isExternal: false,
  showAnchorIcon: false,
  isDisabled: false,
  isBlock: false
});

const classes = computed(() => {
  return [
    'heroui-link',
    `heroui-link-${props.size}`,
    `heroui-link-${props.color}`,
    `heroui-link-underline-${props.underline}`,
    {
      'heroui-link-disabled': props.isDisabled,
      'heroui-link-block': props.isBlock
    }
  ];
});

const target = computed(() => props.isExternal ? '_blank' : undefined);
const rel = computed(() => props.isExternal ? 'noopener noreferrer' : undefined);
</script>

<template>
  <a :href="href" :class="classes" :target="target" :rel="rel">
    <slot></slot>
    <svg
      v-if="showAnchorIcon"
      class="heroui-link-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-link
  display inline-flex
  align-items center
  text-decoration none
  cursor pointer
  outline none
  transition opacity 0.2s

  &:hover
    opacity 0.8

  &-icon
    width 1em
    height 1em
    margin-left 4px

  &-disabled
    opacity 0.5
    pointer-events none
    cursor default

  &-block
    display flex
    width 100%

  // Sizes
  &-sm
    font-size $font-small
  &-md
    font-size $font-medium
  &-lg
    font-size $font-large

  // Colors
  &-foreground
    color var(--heroui-foreground)
  &-primary
    color var(--heroui-primary)
  &-secondary
    color var(--heroui-secondary)
  &-success
    color var(--heroui-success)
  &-warning
    color var(--heroui-warning)
  &-danger
    color var(--heroui-danger)

  // Underline
  &-underline-none
    text-decoration none
  &-underline-hover
    &:hover
      text-decoration underline
  &-underline-always
    text-decoration underline
  &-underline-active
    &:active
      text-decoration underline
  &-underline-focus
    &:focus
      text-decoration underline

</style>
