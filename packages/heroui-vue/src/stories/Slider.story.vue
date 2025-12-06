<script setup lang="ts">
import Slider from '../components/slider/Slider.vue';
import { ref } from 'vue';

const value = ref(50);
</script>

<template>
  <Story title="Slider">
    <Variant title="Default">
      <Slider v-model:value="value" label="Volume" />
    </Variant>
  </Story>
</template>
