# @heroui/vue

Vue implementation of HeroUI components.

## Installation

```bash
pnpm add @heroui/vue
```

## Setup

Import the styles in your main entry file (e.g., `main.ts` or `App.vue`):

```ts
import '@heroui/vue/dist/style.css';
```

## Usage

### Components

```vue
<script setup>
import { Button, Spinner } from '@heroui/vue';
</script>

<template>
  <Button color="primary">Click me</Button>
  <Spinner />
</template>
```

### Directives

You can also use the ripple directive standalone:

```vue
<script setup>
import { vRipple } from '@heroui/vue';
</script>

<template>
  <div v-ripple class="my-element">Click me</div>
</template>

<style>
.my-element {
  position: relative; /* Required for ripple positioning */
  overflow: hidden;   /* Required for ripple containment */
  padding: 20px;
  background: #eee;
  cursor: pointer;
}
</style>
```

## Components List

- Button
- Spinner
