<script setup lang="ts">
import { ref } from 'vue';
import Popover from '../popover/Popover.vue';
import Calendar from '../calendar/Calendar.vue';
import DateInput from '../date-input/DateInput.vue';

const isOpen = ref(false);
const date = ref(new Date());
</script>

<template>
  <Popover :is-open="isOpen" @update:is-open="isOpen = $event" trigger="click">
    <template #trigger>
        <DateInput :model-value="date.toISOString().split('T')[0]" />
    </template>
    <template #content>
        <Calendar v-model="date" />
    </template>
  </Popover>
</template>
