<script setup lang="ts">
import { computed, provide, ref } from 'vue';

interface Props {
  variant?: 'light' | 'shadow' | 'bordered' | 'splitted';
  selectionMode?: 'single' | 'multiple';
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  selectionMode: 'single',
  isDisabled: false
});

// State for managing open items
const openItems = ref(new Set<string>());

const toggleItem = (key: string) => {
    if (props.isDisabled) return;

    if (props.selectionMode === 'single') {
        if (openItems.value.has(key)) {
            openItems.value.clear();
        } else {
            openItems.value.clear();
            openItems.value.add(key);
        }
    } else {
        if (openItems.value.has(key)) {
            openItems.value.delete(key);
        } else {
            openItems.value.add(key);
        }
    }
};

provide('accordion', {
    openItems,
    toggleItem,
    variant: props.variant
});

const classes = computed(() => {
  return [
    'heroui-accordion',
    `heroui-accordion-${props.variant}`
  ];
});
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-accordion
  display flex
  flex-direction column
  gap $spacing-2
  width 100%

  // Variants
  &-shadow
    padding $spacing-4
    border-radius $radius-medium
    box-shadow 0 4px 14px 0 rgba(0,0,0,0.1)
    background-color var(--heroui-background)

  &-bordered
    padding $spacing-4
    border-radius $radius-medium
    border 2px solid var(--heroui-default-200)

  &-splitted
    gap $spacing-4
</style>
