<script setup lang="ts">
import Form from '../components/form/Form.vue';
import Input from '../components/input/Input.vue';
import Button from '../components/button/Button.vue';
</script>

<template>
  <Story title="Form">
    <Variant title="Default">
      <Form class="w-full max-w-xs gap-4">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Button type="submit" color="primary">Submit</Button>
      </Form>
    </Variant>
  </Story>
</template>

<style scoped>
.w-full { width: 100%; }
.max-w-xs { max-width: 20rem; }
.gap-4 { gap: 1rem; }
</style>
