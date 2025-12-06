<script setup lang="ts">
import Spinner from '../components/spinner/Spinner.vue';
</script>

<template>
  <Story title="Spinner">
    <Variant title="Default">
      <Spinner />
    </Variant>

    <Variant title="Colors">
        <div class="flex gap-4">
            <Spinner color="default" />
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
            <Spinner color="warning" />
            <Spinner color="danger" />
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex { display: flex; }
.gap-4 { gap: 1rem; }
</style>
