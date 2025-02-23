<template>
  <article class="article-card">
    <img 
      :src="imageUrl" 
      :alt="imgAlt"
      class="article-image" 
    />
    <div class="article-content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <a 
        href="#" 
        class="read-more"
        :aria-label="readMoreText"
      >
        Read more
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string
  title: string
  description: string
  imgAlt: string
  readMoreText?: string
}

defineProps<Props>()
</script> 