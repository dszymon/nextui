<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
});

const classes = computed(() => {
  return [
    'heroui-divider',
    `heroui-divider-${props.orientation}`
  ];
});
</script>

<template>
  <div role="separator" :class="classes"></div>
</template>

<style lang="stylus" scoped>
.heroui-divider
  background-color var(--heroui-divider)
  margin 0
  border none
  flex-shrink 0

  &-horizontal
    width 100%
    height 1px

  &-vertical
    width 1px
    height 100%
    display inline-block
    min-height 1em // Default height if not constrained
    vertical-align middle

</style>
