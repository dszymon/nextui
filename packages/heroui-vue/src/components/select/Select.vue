<script lang="ts">
import { defineComponent, h, Fragment, VNode, ref, watch, computed, inject, nextTick } from 'vue';
import type { PropType, Component } from 'vue';
import Popover from '../popover/Popover.vue';
import Listbox from '../listbox/Listbox.vue';
import { vRipple } from '../../directives/ripple';

// Workaround for TS4082 & TS4023: Explicitly define component to avoid private type export issues
// We cast components to any or define simple component type to avoid complex type inference that leads to private type exposure
const PopoverComp = Popover as unknown as Component;
const ListboxComp = Listbox as unknown as Component;

const Select = defineComponent({
  name: 'Select',
  components: { Popover: PopoverComp, Listbox: ListboxComp },
  directives: { Ripple: vRipple },
  props: {
    label: String,
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    selectedKeys: {
        type: Object as PropType<Set<string | number>>,
        default: undefined
    },
    defaultSelectedKeys: Object as PropType<Set<string | number>>,
    isDisabled: Boolean,
    variant: {
        type: String,
        default: 'flat'
    },
    color: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'md'
    },
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: undefined
    }
  },
  emits: ['update:selectedKeys', 'selectionChange', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const isOpen = ref(false);

    // Helper function moved inside setup to avoid export issues
    const getSelectItemLabel = (nodes: VNode[], key: string | number): string | null => {
        for (const node of nodes) {
            if (node.type === Fragment && Array.isArray(node.children)) {
                const found = getSelectItemLabel(node.children as VNode[], key);
                if (found) return found;
            } else if (typeof node.type === 'object' || typeof node.type === 'string') {
                const nodeKey = node.props?.key ?? (node as any).key;
                if (nodeKey == key) {
                    if (typeof node.children === 'string') return node.children;
                    if (typeof node.children === 'object' && !Array.isArray(node.children)) {
                       if ((node.children as any).default) {
                           const defaults = (node.children as any).default();
                           if (defaults.length > 0 && typeof defaults[0].children === 'string') {
                               return defaults[0].children;
                           }
                       }
                    }
                    return String(nodeKey);
                }
            }
        }
        return null;
    };

    return () => {
        const children = slots.default ? slots.default() : [];

        // Use type assertion to avoid strict null check issues if needed
        let keys = props.selectedKeys as Set<string | number> | undefined;
        if (!keys && props.modelValue) {
            keys = new Set([props.modelValue as string | number]);
        }

        let displayLabel = props.placeholder;

        if (keys && keys.size > 0) {
            const labels: string[] = [];
            keys.forEach(k => {
                const label = getSelectItemLabel(children, k);
                if (label) labels.push(label);
                else labels.push(String(k));
            });
            if (labels.length > 0) displayLabel = labels.join(', ');
        }

        const trigger = h('button', {
            class: [
                'heroui-select-trigger',
                `heroui-select-${props.variant}`,
                `heroui-select-${props.size}`,
                props.isDisabled ? 'heroui-select-disabled' : ''
            ],
            type: 'button',
            disabled: props.isDisabled,
            onClick: () => {
                if (!props.isDisabled) isOpen.value = !isOpen.value;
            }
        }, [
            h('span', { class: 'heroui-select-value' }, displayLabel),
            h('svg', {
                class: 'heroui-select-chevron',
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                width: "1em",
                height: "1em"
            }, [
                h('path', {
                    'stroke-linecap': "round",
                    'stroke-linejoin': "round",
                    'stroke-width': "1.5",
                    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                })
            ])
        ]);

        const enhancedChildren = children.map(vnode => {
             const nodeKey = vnode.props?.key ?? (vnode as any).key;
             if (!nodeKey) return vnode;

             const handleClick = () => {
                 const newSet = new Set([nodeKey]);
                 emit('update:selectedKeys', newSet);
                 emit('update:modelValue', nodeKey);
                 emit('selectionChange', newSet);
                 isOpen.value = false;
             };

             const props = vnode.props || {};
             return h(vnode, {
                 onClick: (e: MouseEvent) => {
                     props.onClick?.(e);
                     handleClick();
                 },
                 isSelected: keys?.has(nodeKey)
             });
        });

        return h('div', { class: 'heroui-select' }, [
            props.label ? h('label', { class: 'heroui-select-label' }, props.label) : null,
            h(Popover, {
                placement: 'bottom',
                isOpen: isOpen.value,
                'onUpdate:isOpen': (val: boolean) => isOpen.value = val,
                trigger: 'click',
                showArrow: false
            }, {
                trigger: () => trigger,
                content: () => h(Listbox, { class: 'heroui-select-listbox' }, () => enhancedChildren)
            })
        ]);
    }
  }
});

export default Select;
</script>

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
