<script setup lang="ts">
import { computed } from 'vue';
import Modal from '../modal/Modal.vue';

// Drawer is essentially a Modal with specific placement/animation
interface Props {
  isOpen?: boolean;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  placement: 'right',
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
  (e: 'close'): void;
}>();

const modalPlacement = computed(() => {
    // Mapping drawer placement to modal placement classes
    // Modal supports 'top', 'bottom', 'center'.
    // Drawer needs strict edge positioning.
    // For now we reuse Modal but might need CSS overrides in Drawer context.
    return 'center'; // Placeholder, actual drawer logic needs custom CSS overrides
});

const classes = computed(() => {
    return [
        'heroui-drawer',
        `heroui-drawer-${props.placement}`
    ]
});
</script>

<template>
  <Modal
    :is-open="isOpen"
    @update:is-open="emit('update:isOpen', $event)"
    @close="emit('close')"
    :class="classes"
    :size="size === 'full' ? 'full' : undefined"
    scroll-behavior="inside"
  >
    <div class="heroui-drawer-content">
        <slot></slot>
    </div>
  </Modal>
</template>

<style lang="stylus" scoped>
// Ideally Drawer should inherit or reuse Modal but override positioning.
// Since Modal uses fixed positioning and transforms, Drawer needs to override.
// Vue scoped styles might struggle to override child component unless deep.
:deep(.heroui-modal-wrapper)
    justify-content flex-end // For right placement default

:deep(.heroui-modal-content)
    height 100%
    margin 0
    border-radius 0

.heroui-drawer-right :deep(.heroui-modal-wrapper)
    justify-content flex-end

.heroui-drawer-left :deep(.heroui-modal-wrapper)
    justify-content flex-start

// Animations would need to slide instead of scale/fade
</style>
