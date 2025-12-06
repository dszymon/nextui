<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}

const props = defineProps<Props>();

const classes = computed(() => ['heroui-modal-body', props.className]);
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-modal-body
  flex 1 1 auto
  padding $spacing-2 $spacing-6
  overflow-y auto
  display flex
  flex-direction column
  color inherit
</style>
