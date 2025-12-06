<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}

const props = defineProps<Props>();

const classes = computed(() => ['heroui-modal-footer', props.className]);
</script>

<template>
  <footer :class="classes">
    <slot></slot>
  </footer>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-modal-footer
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content flex-end
  align-items center
  gap $spacing-2
  padding $spacing-4 $spacing-6
  color inherit
</style>
