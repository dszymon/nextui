<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  total: number;
  initialPage?: number;
  page?: number;
  siblings?: number;
  boundaries?: number;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'flat' | 'bordered' | 'light' | 'faded';
  isDisabled?: boolean;
  showControls?: boolean;
  showShadow?: boolean;
  loop?: boolean;
  dotsJump?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialPage: 1,
  siblings: 1,
  boundaries: 1,
  color: 'primary',
  size: 'md',
  radius: 'full',
  variant: 'flat',
  isDisabled: false,
  showControls: true,
  showShadow: false,
  loop: false,
  dotsJump: 5
});

const emit = defineEmits<{
  (e: 'update:page', value: number): void;
  (e: 'change', value: number): void;
}>();

const activePage = computed({
  get: () => props.page || props.initialPage,
  set: (val) => {
    emit('update:page', val);
    emit('change', val);
  }
});

const range = computed(() => {
  const total = props.total;
  const current = activePage.value;
  const { siblings, boundaries } = props;

  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

  if (totalPageNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblings, 1);
  const rightSiblingIndex = Math.min(current + siblings, total);

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
  const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => total - rightItemCount + i + 1);
    return [1, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [1, '...', ...middleRange, '...', total];
  }

  return [];
});

const handlePage = (p: number | string) => {
  if (typeof p === 'number') {
    activePage.value = p;
  }
}

const handlePrev = () => {
    if (activePage.value > 1) {
        activePage.value--;
    } else if (props.loop) {
        activePage.value = props.total;
    }
}

const handleNext = () => {
    if (activePage.value < props.total) {
        activePage.value++;
    } else if (props.loop) {
        activePage.value = 1;
    }
}

const classes = computed(() => {
  return [
    'heroui-pagination',
    `heroui-pagination-${props.size}`,
    `heroui-pagination-${props.color}`,
    `heroui-pagination-${props.variant}`,
    `heroui-pagination-radius-${props.radius}`
  ];
});
</script>

<template>
  <nav :class="classes">
    <ul class="heroui-pagination-list">
      <li v-if="showControls" class="heroui-pagination-item heroui-pagination-prev" @click="handlePrev" :class="{ disabled: !loop && activePage === 1 }">
         <slot name="prev">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="1em" height="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
         </slot>
      </li>

      <li
        v-for="(item, index) in range"
        :key="index"
        class="heroui-pagination-item"
        :class="{
            'heroui-pagination-item-active': item === activePage,
            'heroui-pagination-item-dots': item === '...'
        }"
        @click="handlePage(item)"
      >
        {{ item }}
      </li>

      <li v-if="showControls" class="heroui-pagination-item heroui-pagination-next" @click="handleNext" :class="{ disabled: !loop && activePage === total }">
         <slot name="next">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="1em" height="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
         </slot>
      </li>
    </ul>
  </nav>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-pagination
  display flex

  &-list
    display flex
    list-style none
    margin 0
    padding 0
    gap $spacing-1
    align-items center

  &-item
    width 36px
    height 36px
    display flex
    align-items center
    justify-content center
    border-radius $radius-medium
    cursor pointer
    user-select none
    font-size $font-small
    background-color var(--heroui-default-100)
    transition background-color 0.2s, color 0.2s

    &:hover:not(.disabled):not(.heroui-pagination-item-active):not(.heroui-pagination-item-dots)
       background-color var(--heroui-default-200)

    &.disabled
       opacity 0.5
       cursor not-allowed

    &-dots
       background-color transparent !important
       cursor default

  &-item-active
    background-color var(--heroui-primary)
    color var(--heroui-primary-foreground)
    box-shadow 0 4px 10px rgba(0,0,0,0.2)
    font-weight 600

  // Sizes
  &-sm .heroui-pagination-item
     width 32px
     height 32px
     font-size $font-tiny
  &-lg .heroui-pagination-item
     width 44px
     height 44px
     font-size $font-medium

  // Radius
  &-radius-full .heroui-pagination-item
     border-radius 9999px

</style>
