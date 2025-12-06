<script setup lang="ts">
import Avatar from '../components/avatar/Avatar.vue';
</script>

<template>
  <Story title="Avatar">
    <Variant title="Default">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </Variant>

    <Variant title="Initials">
      <Avatar name="Junior" />
    </Variant>

    <Variant title="Sizes">
        <div class="flex">
            <Avatar size="sm" name="Small" />
            <Avatar size="md" name="Medium" />
            <Avatar size="lg" name="Large" />
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 10px;
}
</style>
