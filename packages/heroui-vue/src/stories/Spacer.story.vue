<script setup lang="ts">
import Spacer from '../components/spacer/Spacer.vue';
import Card from '../components/card/Card.vue';
</script>

<template>
  <Story title="Spacer">
    <Variant title="Default">
      <div class="flex">
        <Card class="w-10 h-10 bg-primary" />
        <Spacer x="4" />
        <Card class="w-10 h-10 bg-primary" />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex { display: flex; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.bg-primary { background-color: var(--heroui-primary); }
</style>
