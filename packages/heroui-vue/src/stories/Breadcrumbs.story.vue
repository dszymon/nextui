<script setup lang="ts">
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../components/breadcrumbs/BreadcrumbItem.vue';
</script>

<template>
  <Story title="Breadcrumbs">
    <Variant title="Default">
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Music</BreadcrumbItem>
        <BreadcrumbItem>Artist</BreadcrumbItem>
        <BreadcrumbItem>Album</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Song</BreadcrumbItem>
      </Breadcrumbs>
    </Variant>
  </Story>
</template>
