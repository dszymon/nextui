<script setup lang="ts">
import Navbar from '../components/navbar/Navbar.vue';
import Link from '../components/link/Link.vue';
</script>

<template>
  <Story title="Navbar">
    <Variant title="Default">
      <Navbar>
        <Link href="#">Features</Link>
        <Link href="#">Customers</Link>
        <Link href="#">Integrations</Link>
      </Navbar>
    </Variant>
  </Story>
</template>
