<script setup lang="ts">
import { computed, ref } from 'vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox/Listbox.vue';

interface Props {
  label?: string;
  placeholder?: string;
  selectedKeys?: Set<string | number>;
  defaultSelectedKeys?: Set<string | number>;
  isDisabled?: boolean;
  variant?: 'solid' | 'bordered' | 'underlined' | 'flat' | 'faded';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  variant: 'flat',
  color: 'default',
  size: 'md',
  isDisabled: false
});

const emit = defineEmits<{
  (e: 'update:selectedKeys', value: Set<string | number>): void;
  (e: 'selectionChange', value: Set<string | number>): void;
}>();

const isOpen = ref(false);

const displayValue = computed(() => {
    // Logic to find label from children or items prop?
    // This is hard without explicit items prop.
    // For now, simple placeholder or count.
    if (props.selectedKeys && props.selectedKeys.size > 0) {
        return Array.from(props.selectedKeys).join(', '); // Simple join
    }
    return props.placeholder;
});

const classes = computed(() => {
    return [
        'heroui-select',
        `heroui-select-${props.variant}`,
        `heroui-select-${props.size}`,
        {
            'heroui-select-disabled': props.isDisabled
        }
    ]
});
</script>

<template>
  <div :class="classes">
    <label v-if="label" class="heroui-select-label">{{ label }}</label>

    <Popover placement="bottom" :is-open="isOpen" @update:is-open="isOpen = $event" trigger="click">
        <template #trigger>
            <button class="heroui-select-trigger" type="button" :disabled="isDisabled">
                <span class="heroui-select-value">{{ displayValue }}</span>
                <svg class="heroui-select-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="1em" height="1em"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </button>
        </template>

        <template #content>
            <Listbox class="heroui-select-listbox">
                <slot></slot>
            </Listbox>
        </template>
    </Popover>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-select
  display flex
  flex-direction column
  width 100%
  min-width 200px

  &-label
    font-size $font-small
    margin-bottom 4px
    color var(--heroui-foreground)

  &-trigger
    display flex
    justify-content space-between
    align-items center
    width 100%
    padding $spacing-2 $spacing-3
    background-color var(--heroui-default-100)
    border none
    border-radius $radius-medium
    cursor pointer
    font-size $font-medium
    color var(--heroui-foreground)
    transition background-color 0.2s, outline 0.2s
    outline none

    &:hover:not(:disabled)
        background-color var(--heroui-default-200)

    &:focus-visible
        outline 2px solid var(--heroui-focus)

    &:disabled
        opacity 0.5
        cursor not-allowed

  &-value
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

  &-chevron
    transition transform 0.2s

.heroui-select-listbox
    max-height 300px
    overflow-y auto

</style>
