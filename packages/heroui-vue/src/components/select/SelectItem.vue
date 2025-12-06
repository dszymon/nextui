<script setup lang="ts">
import { computed } from 'vue';

// Similar to ListboxItem but for Select context
// Can reuse ListboxItem logic or be a wrapper
import ListboxItem from '../listbox/ListboxItem.vue';

interface Props {
  key?: string | number;
  value?: string | number;
}

const props = defineProps<Props>();
</script>

<template>
  <ListboxItem v-bind="$attrs">
    <slot></slot>
  </ListboxItem>
</template>
