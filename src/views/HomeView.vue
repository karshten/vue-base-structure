<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import PostHog from "posthog-js";
import { useGtag } from "vue-gtag-next";
const gtag = useGtag();
const t = "dsads";
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
