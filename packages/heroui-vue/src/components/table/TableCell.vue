<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  className?: string;
  as?: string; // 'th' or 'td'
}
const props = withDefaults(defineProps<Props>(), {
    as: 'td'
});
const classes = computed(() => ['heroui-table-cell', props.className]);
</script>

<template>
  <component :is="as" :class="classes">
    <slot></slot>
  </component>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-table-cell
  padding $spacing-3 $spacing-4
  vertical-align middle
</style>
