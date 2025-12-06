<script setup lang="ts">
import Input from '../components/input/Input.vue';
</script>

<template>
  <Story title="Input">
    <Variant title="Default">
      <Input label="Email" placeholder="Enter your email" />
    </Variant>

    <Variant title="Variants">
        <div class="flex-col">
            <Input variant="flat" label="Flat" placeholder="Flat input" />
            <Input variant="bordered" label="Bordered" placeholder="Bordered input" />
            <Input variant="underlined" label="Underlined" placeholder="Underlined input" />
            <Input variant="faded" label="Faded" placeholder="Faded input" />
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 300px;
}
</style>
