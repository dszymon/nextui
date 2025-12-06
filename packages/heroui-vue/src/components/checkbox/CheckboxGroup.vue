<script setup lang="ts">
import { computed, provide } from 'vue';

interface Props {
  modelValue?: string[];
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  orientation?: 'vertical' | 'horizontal';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  lineThrough?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  orientation: 'vertical',
  color: 'primary',
  size: 'md',
  isDisabled: false,
  isReadOnly: false,
  isInvalid: false,
  lineThrough: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

const updateValue = (value: string) => {
    if (props.isDisabled || props.isReadOnly) return;
    const newValues = [...props.modelValue];
    if (newValues.includes(value)) {
        newValues.splice(newValues.indexOf(value), 1);
    } else {
        newValues.push(value);
    }
    emit('update:modelValue', newValues);
    emit('change', newValues);
};

provide('checkboxGroup', {
    modelValue: computed(() => props.modelValue),
    updateValue,
    color: computed(() => props.color),
    size: computed(() => props.size),
    isDisabled: computed(() => props.isDisabled),
    isReadOnly: computed(() => props.isReadOnly),
    lineThrough: computed(() => props.lineThrough)
});

const classes = computed(() => {
    return [
        'heroui-checkbox-group',
        `heroui-checkbox-group-${props.orientation}`
    ]
});
</script>

<template>
  <div :class="classes" role="group" :aria-label="label">
    <span v-if="label" class="heroui-checkbox-group-label">{{ label }}</span>
    <div class="heroui-checkbox-group-wrapper">
        <slot></slot>
    </div>
    <div v-if="isInvalid && errorMessage" class="heroui-checkbox-group-error">{{ errorMessage }}</div>
    <div v-else-if="description" class="heroui-checkbox-group-description">{{ description }}</div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-checkbox-group
  display flex
  flex-direction column
  gap $spacing-2

  &-label
    font-size $font-medium
    color var(--heroui-foreground)
    margin-bottom $spacing-1

  &-wrapper
    display flex
    gap $spacing-2

  &-vertical .heroui-checkbox-group-wrapper
     flex-direction column

  &-horizontal .heroui-checkbox-group-wrapper
     flex-direction row

  &-error
     font-size $font-tiny
     color var(--heroui-danger)

  &-description
     font-size $font-tiny
     color var(--heroui-default-500)

</style>
