<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

interface Props {
  isOpen?: boolean;
  isDisabled?: boolean;
  closeOnSelect?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: undefined,
  isDisabled: false,
  closeOnSelect: true
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const internalOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

const isVisible = computed(() => {
    return props.isOpen !== undefined ? props.isOpen : internalOpen.value;
});

const toggle = () => {
    if (props.isDisabled) return;
    const newState = !isVisible.value;
    internalOpen.value = newState;
    emit('update:isOpen', newState);
};

const close = () => {
    internalOpen.value = false;
    emit('update:isOpen', false);
};

const handleClickOutside = (event: MouseEvent) => {
    if (!isVisible.value) return;
    const target = event.target as Node;
    if (
        triggerRef.value && !triggerRef.value.contains(target) &&
        menuRef.value && !menuRef.value.contains(target)
    ) {
        close();
    }
};

const handleMenuClick = () => {
    if (props.closeOnSelect) {
        close();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const classes = computed(() => {
    return [
        'heroui-dropdown'
    ]
})
</script>

<template>
  <div :class="classes">
    <div class="heroui-dropdown-trigger" @click="toggle" ref="triggerRef">
        <slot name="trigger"></slot>
        <!-- Fallback if no named slot used (simple usage) -->
        <slot v-if="!$slots.trigger"></slot>
    </div>

    <transition name="dropdown-fade">
        <div v-if="isVisible" class="heroui-dropdown-menu-wrapper" ref="menuRef" @click="handleMenuClick">
            <slot name="menu"></slot>
        </div>
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
.heroui-dropdown
  display inline-block
  position relative

.heroui-dropdown-trigger
  display inline-block
  cursor pointer

.heroui-dropdown-menu-wrapper
  position absolute
  top 100%
  left 0
  margin-top 8px
  z-index 50
  min-width 200px

// Simple transition
.dropdown-fade-enter-active,
.dropdown-fade-leave-active
  transition opacity 0.2s, transform 0.2s

.dropdown-fade-enter-from,
.dropdown-fade-leave-to
  opacity 0
  transform translateY(-10px)
</style>
