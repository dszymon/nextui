<script setup lang="ts">
import Tabs from '../components/tabs/Tabs.vue';
import Tab from '../components/tabs/Tab.vue';
import { ref } from 'vue';

const selected = ref('photos');
</script>

<template>
  <Story title="Tabs">
    <Variant title="Default">
      <Tabs v-model="selected">
        <Tab key="photos" title="Photos">
            <p class="p-4">Photos content</p>
        </Tab>
        <Tab key="music" title="Music">
            <p class="p-4">Music content</p>
        </Tab>
        <Tab key="videos" title="Videos">
            <p class="p-4">Videos content</p>
        </Tab>
      </Tabs>
    </Variant>
  </Story>
</template>

<style scoped>
.p-4 { padding: 1rem; }
</style>
