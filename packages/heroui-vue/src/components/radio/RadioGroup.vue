<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  orientation?: 'vertical' | 'horizontal';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  orientation: 'vertical',
  color: 'primary',
  size: 'md',
  isDisabled: false,
  isReadOnly: false,
  isInvalid: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const updateValue = (value: string) => {
    if (props.isDisabled || props.isReadOnly) return;
    emit('update:modelValue', value);
    emit('change', value);
};

provide('radioGroup', {
    modelValue: computed(() => props.modelValue),
    updateValue,
    color: computed(() => props.color),
    size: computed(() => props.size),
    isDisabled: computed(() => props.isDisabled),
    isReadOnly: computed(() => props.isReadOnly)
});

const classes = computed(() => {
    return [
        'heroui-radio-group',
        `heroui-radio-group-${props.orientation}`
    ]
});
</script>

<template>
  <div :class="classes" role="radiogroup" :aria-label="label">
    <span v-if="label" class="heroui-radio-group-label">{{ label }}</span>
    <div class="heroui-radio-group-wrapper">
        <slot></slot>
    </div>
    <div v-if="isInvalid && errorMessage" class="heroui-radio-group-error">{{ errorMessage }}</div>
    <div v-else-if="description" class="heroui-radio-group-description">{{ description }}</div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-radio-group
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

  &-vertical .heroui-radio-group-wrapper
     flex-direction column

  &-horizontal .heroui-radio-group-wrapper
     flex-direction row

  &-error
     font-size $font-tiny
     color var(--heroui-danger)

  &-description
     font-size $font-tiny
     color var(--heroui-default-500)

</style>
