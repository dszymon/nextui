<script setup lang="ts">
import Chip from '../components/chip/Chip.vue';
</script>

<template>
  <Story title="Chip">
    <Variant title="Default">
      <Chip>Chip</Chip>
    </Variant>

    <Variant title="Colors">
        <div class="flex">
            <Chip color="primary">Primary</Chip>
            <Chip color="secondary">Secondary</Chip>
            <Chip color="success">Success</Chip>
            <Chip color="warning">Warning</Chip>
            <Chip color="danger">Danger</Chip>
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 10px;
}
</style>
