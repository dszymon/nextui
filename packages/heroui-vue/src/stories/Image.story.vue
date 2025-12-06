<script setup lang="ts">
import Image from '../components/image/Image.vue';
</script>

<template>
  <Story title="Image">
    <Variant title="Default">
      <Image
        width="300"
        src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        alt="NextUI hero Image"
      />
    </Variant>

    <Variant title="Blurred">
      <Image
        isBlurred
        width="240"
        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
        alt="NextUI Album Cover"
        class="m-5"
      />
    </Variant>
  </Story>
</template>
