<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
}

const props = defineProps<Props>();

const classes = computed(() => ['heroui-modal-header', props.className]);
</script>

<template>
  <header :class="classes">
    <slot></slot>
  </header>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-modal-header
  display flex
  flex-direction column
  padding $spacing-4 $spacing-6
  font-size $font-large
  font-weight 600
  color inherit
</style>
