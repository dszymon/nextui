<script setup lang="ts">
import Skeleton from '../components/skeleton/Skeleton.vue';
import Card from '../components/card/Card.vue';
</script>

<template>
  <Story title="Skeleton">
    <Variant title="Default">
      <Card class="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton class="rounded-lg">
          <div class="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div class="space-y-3">
          <Skeleton class="w-3/5 rounded-lg">
            <div class="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton class="w-4/5 rounded-lg">
            <div class="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </Variant>
  </Story>
</template>

<style scoped>
.w-\[200px\] { width: 200px; }
.space-y-5 > * + * { margin-top: 1.25rem; }
.p-4 { padding: 1rem; }
.rounded-lg { border-radius: 0.5rem; }
.h-24 { height: 6rem; }
.bg-default-300 { background-color: #d4d4d8; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.w-3\/5 { width: 60%; }
.h-3 { height: 0.75rem; }
.bg-default-200 { background-color: #e4e4e7; }
.w-4\/5 { width: 80%; }
</style>
