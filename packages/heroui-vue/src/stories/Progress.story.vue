<script setup lang="ts">
import Progress from '../components/progress/Progress.vue';
</script>

<template>
  <Story title="Progress">
    <Variant title="Default">
      <Progress :value="60" label="Loading..." />
    </Variant>

    <Variant title="Indeterminate">
      <Progress isIndeterminate size="sm" />
    </Variant>
  </Story>
</template>
