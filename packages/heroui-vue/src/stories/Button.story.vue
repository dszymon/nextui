<script setup lang="ts">
import Button from '../components/button/Button.vue';
</script>

<template>
  <Story title="Button">
    <Variant title="Default">
      <Button>Button</Button>
    </Variant>

    <Variant title="Colors">
        <div class="flex">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
        </div>
    </Variant>

    <Variant title="Variants">
        <div class="flex">
            <Button variant="solid">Solid</Button>
            <Button variant="bordered">Bordered</Button>
            <Button variant="light">Light</Button>
            <Button variant="flat">Flat</Button>
            <Button variant="faded">Faded</Button>
            <Button variant="shadow">Shadow</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>
