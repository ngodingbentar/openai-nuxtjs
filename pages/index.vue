<template>
  <div />
</template>

<script lang="ts" setup>
import { onBeforeMount, useRouter } from '#imports'
const router = useRouter()

onBeforeMount(() => {
  router.push('/chat')
})

</script>
