<template>
  <div>
    <div class="bg-gray-300 flex mb-4 px-4">
      <NuxtLink to="/">
        <div class="header-item">
          Home
        </div>
      </NuxtLink>
      <NuxtLink to="/chat">
        <div class="header-item">
          Chat 1
        </div>
      </NuxtLink>
      <NuxtLink to="/friendchat">
        <div class="header-item">
          Chat 2
        </div>
      </NuxtLink>
      <NuxtLink to="/grammar">
        <div class="header-item">
          Grammar
        </div>
      </NuxtLink>
      <NuxtLink to="/translate">
        <div class="header-item">
          Translate
        </div>
      </NuxtLink>
      <NuxtLink to="/edit">
        <div class="header-item">
          Edit
        </div>
      </NuxtLink>
    </div>
    <slot />
  </div>
</template>

<style lang="postcss">
.header-item {
  @apply bg-gray-200 p-2 m-2 rounded-lg hover:bg-gray-400;
}
</style>