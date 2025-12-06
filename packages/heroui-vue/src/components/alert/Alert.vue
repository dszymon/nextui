<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'bordered' | 'flat' | 'faded';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  description?: string;
  isClosable?: boolean;
  icon?: any;
  hideIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'flat',
  radius: 'md',
  isClosable: false,
  hideIcon: false
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const classes = computed(() => {
  return [
    'heroui-alert',
    `heroui-alert-${props.variant}`,
    `heroui-alert-${props.color}`,
    `heroui-alert-radius-${props.radius}`
  ];
});

const handleClose = () => {
    emit('close');
}
</script>

<template>
  <div :class="classes" role="alert">
    <div v-if="!hideIcon" class="heroui-alert-icon">
       <slot name="icon">
         <!-- Default Icons based on color? -->
         <svg v-if="color === 'success'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <svg v-else-if="color === 'danger' || color === 'warning'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
         <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
       </slot>
    </div>

    <div class="heroui-alert-content">
      <div v-if="title" class="heroui-alert-title">{{ title }}</div>
      <div v-if="description || $slots.default" class="heroui-alert-description">
        <slot>{{ description }}</slot>
      </div>
    </div>

    <button v-if="isClosable" class="heroui-alert-close-button" @click="handleClose" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-alert
  display flex
  align-items flex-start
  padding $spacing-3 $spacing-4
  gap $spacing-3
  width 100%
  position relative
  box-sizing border-box

  &-icon
    flex-shrink 0
    margin-top 2px

  &-content
    flex 1
    display flex
    flex-direction column
    gap $spacing-1

  &-title
    font-weight 600
    font-size $font-medium
    line-height 1.25

  &-description
    font-size $font-small
    line-height 1.5

  &-close-button
    flex-shrink 0
    background transparent
    border none
    cursor pointer
    padding 4px
    border-radius 50%
    transition background-color 0.2s
    color inherit
    opacity 0.7
    &:hover
      opacity 1
      background-color rgba(0,0,0,0.05)

  // Radius
  &-radius-sm
    border-radius $radius-small
  &-radius-md
    border-radius $radius-medium
  &-radius-lg
    border-radius $radius-large
  &-radius-full
    border-radius $radius-full

  // Variants & Colors
  &-flat
    &.heroui-alert-default
      background-color var(--heroui-default-100)
      color var(--heroui-foreground)
    &.heroui-alert-primary
      background-color var(--heroui-primary-100)
      color var(--heroui-primary-700)
    &.heroui-alert-success
      background-color var(--heroui-success-100)
      color var(--heroui-success-700)
    &.heroui-alert-warning
      background-color var(--heroui-warning-100)
      color var(--heroui-warning-700)
    &.heroui-alert-danger
      background-color var(--heroui-danger-100)
      color var(--heroui-danger-700)

  &-bordered
    background-color transparent
    border 2px solid currentColor
    &.heroui-alert-primary
      color var(--heroui-primary)
      border-color var(--heroui-primary)
    // ...

  &-solid
    color white
    &.heroui-alert-primary
      background-color var(--heroui-primary)
    &.heroui-alert-success
      background-color var(--heroui-success)
    &.heroui-alert-warning
      background-color var(--heroui-warning)
      color white // Warning text on yellow bg might need check
    &.heroui-alert-danger
      background-color var(--heroui-danger)

</style>
