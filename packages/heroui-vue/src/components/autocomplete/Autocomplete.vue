<script setup lang="ts">
import { computed, ref } from 'vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox/Listbox.vue';
import Input from '../input/Input.vue';

interface Props {
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Type to search...',
  modelValue: ''
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);

const handleInput = (val: string | number) => {
    emit('update:modelValue', String(val));
    isOpen.value = true;
};

const handleFocus = () => {
    isOpen.value = true;
};

const classes = computed(() => ['heroui-autocomplete']);
</script>

<template>
  <div :class="classes">
    <Popover placement="bottom" :is-open="isOpen" @update:is-open="isOpen = $event" trigger="click" :show-arrow="false">
        <template #trigger>
            <Input
                :label="label"
                :placeholder="placeholder"
                :disabled="isDisabled"
                :model-value="modelValue"
                @update:model-value="handleInput"
                @focus="handleFocus"
            />
        </template>

        <template #content>
            <Listbox class="heroui-autocomplete-listbox">
                <slot></slot>
            </Listbox>
        </template>
    </Popover>
  </div>
</template>

<style lang="stylus" scoped>
.heroui-autocomplete
  width 100%

.heroui-autocomplete-listbox
  max-height 300px
  overflow-y auto
  min-width 200px
</style>
