<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';

interface Props {
  length?: number;
  modelValue?: string;
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  length: 4,
  modelValue: '',
  isDisabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'complete', value: string): void;
}>();

const inputs = ref<(HTMLInputElement | null)[]>([]);

const values = computed({
    get: () => {
        const val = props.modelValue || '';
        return Array.from({ length: props.length }, (_, i) => val[i] || '');
    },
    set: (newVal) => {
        // Not used directly, events handle updates
    }
});

const handleInput = (index: number, event: Event) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    if (!/^\d*$/.test(val)) {
        target.value = values.value[index]; // Revert
        return;
    }

    const newValues = [...values.value];
    newValues[index] = val.slice(-1); // Take last char

    const result = newValues.join('');
    emit('update:modelValue', result);

    if (val && index < props.length - 1) {
        nextTick(() => inputs.value[index + 1]?.focus());
    }

    if (result.length === props.length) {
        emit('complete', result);
    }
};

const handleKeydown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && !values.value[index] && index > 0) {
        inputs.value[index - 1]?.focus();
    }
};

const classes = computed(() => ['heroui-input-otp']);
</script>

<template>
  <div :class="classes">
    <input
      v-for="(val, index) in length"
      :key="index"
      :ref="(el) => inputs[index] = el as HTMLInputElement"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="heroui-input-otp-slot"
      :value="values[index]"
      :disabled="isDisabled"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
    />
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-input-otp
  display flex
  gap $spacing-2
  align-items center

  &-slot
    width 40px
    height 40px
    text-align center
    font-size $font-medium
    border 2px solid var(--heroui-default-200)
    border-radius $radius-medium
    background-color transparent
    outline none
    transition border-color 0.2s

    &:focus
       border-color var(--heroui-focus)

    &:disabled
       opacity 0.5
       cursor not-allowed

</style>
