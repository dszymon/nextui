<script setup lang="ts">
import Calendar from '../components/calendar/Calendar.vue';
import { ref } from 'vue';

const date = ref(new Date());
</script>

<template>
  <Story title="Calendar">
    <Variant title="Default">
      <Calendar v-model="date" />
    </Variant>
  </Story>
</template>
