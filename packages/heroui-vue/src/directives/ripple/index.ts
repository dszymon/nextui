import type { Directive, DirectiveBinding } from 'vue';

interface RippleOptions {
  color?: string;
  disabled?: boolean;
}

const createRipple = (event: MouseEvent, el: HTMLElement, options: RippleOptions) => {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'heroui-ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.top = `${y}px`;
  ripple.style.left = `${x}px`;

  if (options.color) {
    ripple.style.backgroundColor = options.color;
  }

  const container = el.querySelector('.heroui-ripple-container') || createContainer(el);
  container.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
    // if (container.childNodes.length === 0) {
    //   container.remove();
    // }
  });
};

const createContainer = (el: HTMLElement) => {
  const container = document.createElement('span');
  container.className = 'heroui-ripple-container';
  el.appendChild(container);
  return container;
};

// Map to store handlers for cleanup
const handlers = new Map<HTMLElement, (e: MouseEvent) => void>();

export const vRipple: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean | RippleOptions>) {
    const handler = (event: MouseEvent) => {
      const value = binding.value;
      const disabled = typeof value === 'object' && value ? value.disabled : false;

      if (disabled) return;

      const options: RippleOptions = typeof value === 'object' && value ? value : {};

      createRipple(event, el, options);
    };

    handlers.set(el, handler);
    el.addEventListener('click', handler);

    // Ensure parent is relative or absolute for positioning
    const style = window.getComputedStyle(el);
    if (style.position === 'static') {
      el.style.position = 'relative';
    }
    // Ensure overflow hidden so ripple doesn't spill out
    if (style.overflow !== 'hidden') {
        el.style.overflow = 'hidden';
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean | RippleOptions>) {
     // Handle updates if necessary
  },
  unmounted(el: HTMLElement) {
    const handler = handlers.get(el);
    if (handler) {
      el.removeEventListener('click', handler);
      handlers.delete(el);
    }
  }
};
