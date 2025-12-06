<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}

const props = defineProps<Props>();

const classes = computed(() => ['heroui-card-header', props.className]);
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-card-header
  display flex
  align-items center
  padding $spacing-3
  z-index 20
  width 100%
  flex-shrink 0
  overflow hidden
  color inherit
  box-sizing border-box
</style>
