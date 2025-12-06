<script setup lang="ts">
import Radio from '../components/radio/Radio.vue';
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
  <Story title="Radio">
    <Variant title="Default">
      <Radio v-model:isSelected="selected">Option</Radio>
    </Variant>
  </Story>
</template>
