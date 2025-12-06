<script setup lang="ts">
import Divider from '../components/divider/Divider.vue';
</script>

<template>
  <Story title="Divider">
    <Variant title="Default">
      <div>
        Text
        <Divider class="my-4" />
        Text
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>
