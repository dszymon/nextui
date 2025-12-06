<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}

const props = defineProps<Props>();

const classes = computed(() => ['heroui-card-body', props.className]);
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-card-body
  display flex
  flex-direction column
  padding $spacing-3 $spacing-3
  width 100%
  flex 1 1 auto
  overflow-y auto
  box-sizing border-box
  position relative
  text-align left
  color inherit
</style>
