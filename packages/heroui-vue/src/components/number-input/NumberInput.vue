<script setup lang="ts">
import { computed } from 'vue';
import Input from '../input/Input.vue';

interface Props {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  step: 1,
  isDisabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const updateValue = (val: number) => {
    if (props.isDisabled) return;
    let newValue = val;
    if (props.min !== undefined) newValue = Math.max(props.min, newValue);
    if (props.max !== undefined) newValue = Math.min(props.max, newValue);
    emit('update:modelValue', newValue);
};

const increment = () => updateValue(props.modelValue + props.step);
const decrement = () => updateValue(props.modelValue - props.step);

const handleInput = (val: string | number) => {
    const num = Number(val);
    if (!isNaN(num)) updateValue(num);
};
</script>

<template>
  <div class="heroui-number-input">
    <button type="button" @click="decrement" :disabled="isDisabled">-</button>
    <Input
        :model-value="String(modelValue)"
        @update:model-value="handleInput"
        type="number"
        :disabled="isDisabled"
    />
    <button type="button" @click="increment" :disabled="isDisabled">+</button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-number-input
  display flex
  align-items center
  gap $spacing-2

  button
    width 32px
    height 32px
    display flex
    align-items center
    justify-content center
    border 1px solid var(--heroui-default-200)
    border-radius $radius-medium
    background transparent
    cursor pointer
    &:hover:not(:disabled)
       background-color var(--heroui-default-100)
    &:disabled
       opacity 0.5
</style>
