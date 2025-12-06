<script lang="ts">
import { defineComponent, h, Fragment, VNode, ref, watch, provide, computed } from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    variant: {
      type: String as () => 'solid' | 'bordered' | 'light' | 'underlined',
      default: 'solid'
    },
    color: {
      type: String as () => 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger',
      default: 'default'
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg',
      default: 'md'
    },
    radius: {
      type: String as () => 'none' | 'sm' | 'md' | 'lg' | 'full',
      default: 'lg'
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: undefined
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const selectedKey = ref(props.modelValue);

    watch(() => props.modelValue, (val) => {
        selectedKey.value = val;
    });

    const selectTab = (key: string | number) => {
        if (props.isDisabled) return;
        selectedKey.value = key;
        emit('update:modelValue', key);
        emit('change', key);
    };

    provide('tabsContext', {
        selectedKey,
        selectTab,
        variant: computed(() => props.variant),
        color: computed(() => props.color),
        isDisabled: computed(() => props.isDisabled)
    });

    const classes = computed(() => {
      return [
        'heroui-tabs',
        `heroui-tabs-${props.variant}`,
        `heroui-tabs-${props.size}`,
        `heroui-tabs-${props.color}`,
        `heroui-tabs-radius-${props.radius}`,
        props.fullWidth ? 'heroui-tabs-full-width' : '',
        props.isDisabled ? 'heroui-tabs-disabled' : ''
      ];
    });

    const getTabKey = (vnode: VNode, index: number) => {
        return vnode.props?.key ?? vnode.props?.title ?? index;
    };

    return () => {
        const defaultSlots = slots.default ? slots.default() : [];
        const tabs: VNode[] = [];

        const traverse = (nodes: VNode[]) => {
            nodes.forEach(node => {
                if (node.type === Fragment && Array.isArray(node.children)) {
                    traverse(node.children as VNode[]);
                } else if (typeof node.type === 'object' || typeof node.type === 'string') {
                    // Check if it's a valid element (simplified check)
                    tabs.push(node);
                }
            });
        };
        traverse(defaultSlots);

        const activeKey = selectedKey.value ?? (tabs.length > 0 ? getTabKey(tabs[0], 0) : null);

        const tabList = h('div', { class: 'heroui-tabs-tablist', role: 'tablist' }, tabs.map((tab, index) => {
            const key = getTabKey(tab, index);
            // Loose equality for keys often needed (1 vs "1")
            const isSelected = activeKey == key;
            const tabDisabled = tab.props?.isDisabled === '' || tab.props?.isDisabled === true;

            return h('button', {
                key,
                class: [
                    'heroui-tab',
                    {
                        'heroui-tab-selected': isSelected,
                        'heroui-tab-disabled': tabDisabled
                    }
                ],
                role: 'tab',
                'aria-selected': isSelected,
                disabled: tabDisabled || props.isDisabled,
                type: 'button',
                onClick: () => {
                    if (!tabDisabled && !props.isDisabled) {
                        selectTab(key);
                    }
                }
            }, tab.props?.title || (tab.children as any)?.title?.() || 'Tab');
        }));

        const activeTab = tabs.find((tab, index) => getTabKey(tab, index) == activeKey);

        return h('div', { class: classes.value }, [
            tabList,
            activeTab ? h('div', { class: 'heroui-tab-panel', role: 'tabpanel' }, activeTab) : null
        ]);
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-tabs
  display flex
  flex-direction column
  gap $spacing-4

  &-tablist
    display flex
    background-color var(--heroui-default-100)
    padding 4px
    border-radius $radius-large
    gap 2px
    position relative
    width fit-content

  &-full-width
    width 100%
    .heroui-tabs-tablist
       width 100%

  &-disabled
    opacity 0.5
    pointer-events none

  // Variants
  &-underlined
    .heroui-tabs-tablist
       background-color transparent
       border-bottom 2px solid var(--heroui-default-200)
       border-radius 0
       padding 0
       gap $spacing-4
       width 100%

.heroui-tab
  flex 1
  padding $spacing-2 $spacing-3
  border-radius $radius-medium
  border none
  background transparent
  cursor pointer
  font-weight 500
  color var(--heroui-default-500)
  transition color 0.2s, background-color 0.2s
  outline none
  position relative
  z-index 1
  white-space nowrap

  &:hover:not(.heroui-tab-selected):not(:disabled)
     color var(--heroui-default-800)

  &-selected
     background-color var(--heroui-background)
     color var(--heroui-foreground)
     box-shadow 0 1px 2px rgba(0,0,0,0.1)

  &-disabled
     opacity 0.5
     cursor not-allowed

// Underlined specific overrides
.heroui-tabs-underlined .heroui-tab
  border-radius 0
  border-bottom 2px solid transparent

  &-selected
    background-color transparent
    box-shadow none
    border-bottom-color var(--heroui-primary)
    color var(--heroui-primary)

.heroui-tab-panel
   // styles for panel
</style>
