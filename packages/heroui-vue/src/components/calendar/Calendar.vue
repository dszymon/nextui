<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue?: Date;
  minValue?: Date;
  maxValue?: Date;
  isDisabled?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();

const currentMonth = ref(new Date());

const daysInMonth = computed(() => {
    const year = currentMonth.value.getFullYear();
    const month = currentMonth.value.getMonth();
    return new Date(year, month + 1, 0).getDate();
});

const startDay = computed(() => {
    const year = currentMonth.value.getFullYear();
    const month = currentMonth.value.getMonth();
    return new Date(year, month, 1).getDay();
});

const days = computed(() => {
    const res: (number | null)[] = [];
    for (let i = 0; i < startDay.value; i++) res.push(null);
    for (let i = 1; i <= daysInMonth.value; i++) res.push(i);
    return res;
});

const selectDate = (day: number) => {
    if (!day) return;
    const newDate = new Date(currentMonth.value);
    newDate.setDate(day);
    emit('update:modelValue', newDate);
};

const prevMonth = () => {
    currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
};

const nextMonth = () => {
    currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
};
</script>

<template>
  <div class="heroui-calendar">
    <div class="heroui-calendar-header">
        <button type="button" @click="prevMonth">&lt;</button>
        <span>{{ currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) }}</span>
        <button type="button" @click="nextMonth">&gt;</button>
    </div>
    <div class="heroui-calendar-grid">
        <div class="heroui-calendar-cell" v-for="(day, index) in days" :key="index" @click="day && selectDate(day)">
            {{ day }}
        </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-calendar
  display inline-block
  background-color var(--heroui-background)
  border-radius $radius-large
  padding $spacing-4
  box-shadow 0 4px 6px -1px rgba(0,0,0,0.1)

  &-header
    display flex
    justify-content space-between
    align-items center
    margin-bottom $spacing-4

  &-grid
    display grid
    grid-template-columns repeat(7, 1fr)
    gap $spacing-1

  &-cell
    width 32px
    height 32px
    display flex
    align-items center
    justify-content center
    cursor pointer
    border-radius $radius-medium
    &:hover
       background-color var(--heroui-default-100)
</style>
