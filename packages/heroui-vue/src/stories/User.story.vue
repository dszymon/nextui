<script setup lang="ts">
import User from '../components/user/User.vue';
</script>

<template>
  <Story title="User">
    <Variant title="Default">
      <User
        name="Jane Doe"
        description="Product Designer"
        :avatarProps="{
          src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
        }"
      />
    </Variant>
  </Story>
</template>
