<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  validationBehavior?: 'native' | 'aria';
}

const props = withDefaults(defineProps<Props>(), {
  validationBehavior: 'native'
});

const classes = computed(() => {
  return [
    'heroui-form',
    props.className
  ];
});

const handleSubmit = (e: Event) => {
    // Basic form submission handling
};
</script>

<template>
  <form :class="classes" @submit="handleSubmit">
    <slot></slot>
  </form>
</template>

<style lang="stylus" scoped>
.heroui-form
  display flex
  flex-direction column
  gap 1rem // Standard gap
</style>
