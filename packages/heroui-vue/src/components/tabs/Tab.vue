<script setup lang="ts">
import { computed } from 'vue';

// Tab component is mostly a data holder for the parent Tabs component in this architecture
// But it also renders its content when active.
// In the Tabs render function, we render the 'tab' VNode directly in the panel.
// So this component just needs to render its default slot.

interface Props {
  title?: string;
  isDisabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="heroui-tab-content">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.heroui-tab-content
  height 100%
  width 100%
</style>
