<script setup lang="ts">
import Checkbox from '../components/checkbox/Checkbox.vue';
import { ref } from 'vue';

const isSelected = ref(false);
</script>

<template>
  <Story title="Checkbox">
    <Variant title="Default">
      <Checkbox v-model:isSelected="isSelected">Option</Checkbox>
    </Variant>
  </Story>
</template>
