<template>
  <div class="absolute inset-0 -z-10">
    <div
      v-for="(circle, i) in circles"
      :key="i"
      class="absolute rounded-full opacity-30 blur-[100px]"
      :style="{
        width: circle.size,
        height: circle.size,
        background: circle.color,
        top: circle.top,
        left: circle.left,
        right: circle.right,
      }"
    />
  </div>
</template>

<script setup lang="ts">
const circles = [
  { size: '400px', color: 'var(--color-primary)', top: '-5%', left: '-5%' },
  { size: '500px', color: 'var(--color-peach)', top: '20%', right: '0%' },
  { size: '300px', color: 'var(--color-blue-blizzard)', top: '50%', left: '30%' },
  { size: '600px', color: 'var(--color-lavender-deep)', top: '80%', right: '0%' },
  { size: '350px', color: 'var(--color-secondary)', top: '95%', left: '0%' },
]
</script>
