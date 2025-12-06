<script setup lang="ts">
import NumberInput from '../components/number-input/NumberInput.vue';
</script>

<template>
  <Story title="NumberInput">
    <Variant title="Default">
      <NumberInput :model-value="0" />
    </Variant>
  </Story>
</template>
