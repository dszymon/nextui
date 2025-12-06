<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  as?: string;
}
const props = withDefaults(defineProps<Props>(), {
    as: 'th'
});
const classes = computed(() => ['heroui-table-column', props.className]);
</script>

<template>
  <component :is="as" :class="classes">
    <slot></slot>
  </component>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-table-column
  padding $spacing-3 $spacing-4
  text-align left
  font-size $font-tiny
  letter-spacing 0.05em
</style>
