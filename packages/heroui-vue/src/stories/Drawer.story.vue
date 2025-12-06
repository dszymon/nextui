<script setup lang="ts">
import Drawer from '../components/drawer/Drawer.vue';
import Button from '../components/button/Button.vue';
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <Story title="Drawer">
    <Variant title="Default">
      <Button @click="isOpen = true">Open Drawer</Button>
      <Drawer v-model:isOpen="isOpen">
        <div class="p-4">
            <p>Drawer Content</p>
        </div>
      </Drawer>
    </Variant>
  </Story>
</template>

<style scoped>
.p-4 {
    padding: 1rem;
}
</style>
