<script setup lang="ts">
import ScrollShadow from '../components/scroll-shadow/ScrollShadow.vue';
</script>

<template>
  <Story title="ScrollShadow">
    <Variant title="Default">
      <ScrollShadow class="w-[300px] h-[200px]">
        <p v-for="i in 20" :key="i">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </ScrollShadow>
    </Variant>
  </Story>
</template>

<style scoped>
.w-\[300px\] { width: 300px; }
.h-\[200px\] { height: 200px; }
</style>
