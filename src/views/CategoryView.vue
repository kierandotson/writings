<template>
  <div class="category">
    <h1>{{ title }}</h1>
    <section v-if="loading">Loading…</section>
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.slug">
        <router-link :to="`/post/${post.slug}`">{{ post.title }}</router-link>
        <span class="meta">{{ formatDate(post.date) }}</span>
        <p v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getPostsByCategory } from '../content'

const props = defineProps({
  category: { type: String, required: true },
})

const loading = ref(true)
const posts = ref([])

const title = computed(() => props.category.charAt(0).toUpperCase() + props.category.slice(1))

onMounted(async () => {
  posts.value = await getPostsByCategory(props.category)
  loading.value = false
})

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  return isNaN(date.getTime()) ? d : date.toLocaleDateString()
}
</script>
