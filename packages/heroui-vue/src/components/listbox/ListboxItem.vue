<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  key?: string | number; // Not prop in vue usually, but logic might need it
  title?: string;
  description?: string;
  startContent?: any;
  endContent?: any;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false,
    isSelected: false
});

const classes = computed(() => {
    return [
        'heroui-listbox-item',
        {
            'heroui-listbox-item-selected': props.isSelected,
            'heroui-listbox-item-disabled': props.isDisabled
        },
        props.className
    ]
});
</script>

<template>
  <li :class="classes" role="option" :aria-selected="isSelected" :aria-disabled="isDisabled">
    <div class="heroui-listbox-item-content">
        <span v-if="startContent" class="heroui-listbox-item-start">
            <component :is="startContent" />
        </span>
        <div class="heroui-listbox-item-text">
            <span v-if="title" class="heroui-listbox-item-title">{{ title }}</span>
            <slot>{{ title }}</slot> <!-- Allow default slot -->
            <span v-if="description" class="heroui-listbox-item-description">{{ description }}</span>
        </div>
        <span v-if="endContent" class="heroui-listbox-item-end">
            <component :is="endContent" />
        </span>
    </div>
  </li>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-listbox-item
  padding $spacing-2 $spacing-3
  border-radius $radius-small
  cursor pointer
  color var(--heroui-foreground)
  transition background-color 0.2s
  outline none

  &:hover:not(.heroui-listbox-item-disabled)
     background-color var(--heroui-default-100)

  &-disabled
     opacity 0.5
     cursor not-allowed

  &-selected
     background-color var(--heroui-default-200)
     // Or color based on listbox variant (requires inject or CSS variable cascade)

  &-content
     display flex
     align-items center
     gap $spacing-2
     width 100%

  &-text
     display flex
     flex-direction column
     flex 1

  &-title
     font-size $font-medium

  &-description
     font-size $font-tiny
     color var(--heroui-default-500)

</style>
