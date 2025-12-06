<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  x?: number | string;
  y?: number | string;
}

const props = defineProps<Props>();

const style = computed(() => {
  return {
    marginLeft: typeof props.x === 'number' ? `${props.x}px` : props.x,
    marginTop: typeof props.y === 'number' ? `${props.y}px` : props.y,
    width: props.x ? '100%' : '1px',
    height: props.y ? '100%' : '1px',
    display: 'block'
  };
});
</script>

<template>
  <span :style="style" aria-hidden="true" class="heroui-spacer"></span>
</template>

<style lang="stylus" scoped>
.heroui-spacer
  flex-shrink 0
</style>
