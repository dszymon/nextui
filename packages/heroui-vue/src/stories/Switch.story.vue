<script setup lang="ts">
import Switch from '../components/switch/Switch.vue';
import { ref } from 'vue';

const isSelected = ref(true);
</script>

<template>
  <Story title="Switch">
    <Variant title="Default">
      <Switch v-model:isSelected="isSelected">Automatic updates</Switch>
    </Variant>
  </Story>
</template>
