<script setup lang="ts">
import Popover from '../components/popover/Popover.vue';
import Button from '../components/button/Button.vue';
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <Story title="Popover">
    <Variant title="Default">
      <Popover v-model:isOpen="isOpen">
        <template #trigger>
            <Button>Open Popover</Button>
        </template>
        <template #content>
            <div class="px-1 py-2">
                <div class="text-small font-bold">Popover Content</div>
                <div class="text-tiny">This is the popover content</div>
            </div>
        </template>
      </Popover>
    </Variant>
  </Story>
</template>

<style scoped>
.px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.text-small { font-size: 0.875rem; }
.font-bold { font-weight: 700; }
.text-tiny { font-size: 0.75rem; }
</style>
