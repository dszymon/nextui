<script setup lang="ts">
import ListboxItem from '../listbox/ListboxItem.vue';
</script>

<template>
  <ListboxItem v-bind="$attrs">
    <slot></slot>
  </ListboxItem>
</template>
