<script setup lang="ts">
import Link from '../components/link/Link.vue';
</script>

<template>
  <Story title="Link">
    <Variant title="Default">
      <Link href="#">Default Link</Link>
    </Variant>

    <Variant title="Colors">
        <div class="flex gap-4">
            <Link href="#" color="foreground">Foreground</Link>
            <Link href="#" color="primary">Primary</Link>
            <Link href="#" color="secondary">Secondary</Link>
            <Link href="#" color="success">Success</Link>
            <Link href="#" color="warning">Warning</Link>
            <Link href="#" color="danger">Danger</Link>
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex {
    display: flex;
}
.gap-4 {
    gap: 1rem;
}
</style>
