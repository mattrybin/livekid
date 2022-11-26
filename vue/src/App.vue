<script setup lang="ts">
import { reactive } from 'vue'
import { useQuery } from './utils/trpc';

const { data } = useQuery('account', reactive({
  email: "matt@dsadas.com",
  type: "Awesome"
}), { immediate: true })
</script>

<template>
  <div>Typescript - using tRPC</div>
  <div>accountId: {{ data?.accountId }}</div>
  <div>givenName: {{ data?.givenName }}</div>
  <div>familyName: {{ data?.familyName }}</div>
  <div>gender: {{ data?.gender }}</div>
</template>