<script setup lang="ts">
import Badge from '../components/badge/Badge.vue';
import Avatar from '../components/avatar/Avatar.vue';
</script>

<template>
  <Story title="Badge">
    <Variant title="Default">
      <Badge content="5">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </Badge>
    </Variant>

    <Variant title="Dot">
      <Badge content="" color="success" size="sm" shape="circle">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </Badge>
    </Variant>
  </Story>
</template>
