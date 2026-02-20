<template>
  <div class="home">
    <h1>Writings</h1>
    <section v-if="loading">Loading…</section>
    <template v-else>
      <ul class="post-list">
        <li v-for="post in displayedPosts" :key="post.slug">
          <router-link :to="`/post/${post.slug}`">{{ post.title }}</router-link>
          <span class="meta">
            {{ post.tags.join(', ') }} · {{ formatDate(post.date) }}
          </span>
        </li>
      </ul>
      <p v-if="!filteredPosts.length" class="empty">No posts match the selected tags.</p>
      <button
        v-else-if="visibleCount < filteredPosts.length"
        type="button"
        class="load-more"
        @click="visibleCount += pageSize"
      >
        Load more
      </button>
      <div class="filters">
        <span class="filter-label">Filter by tag:</span>
        <label v-for="tag in allTags" :key="tag" class="tag-checkbox">
          <input
            v-model="selectedTags"
            type="checkbox"
            :value="tag"
          />
          {{ tag }}
        </label>
        <button
          v-if="selectedTags.length"
          type="button"
          class="clear-filters"
          @click="selectedTags = []"
        >
          Clear
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { loadPosts, getAllTags, filterPostsByTags } from '../content'

const loading = ref(true)
const allPosts = ref([])
const selectedTags = ref([])
const visibleCount = ref(10)
const pageSize = 10

const allTags = computed(() => getAllTags(allPosts.value))

const filteredPosts = computed(() =>
  filterPostsByTags(allPosts.value, selectedTags.value)
)

const displayedPosts = computed(() =>
  filteredPosts.value.slice(0, visibleCount.value)
)

// Reset "load more" when filters change
watch(selectedTags, () => {
  visibleCount.value = pageSize
}, { deep: true })

onMounted(async () => {
  allPosts.value = await loadPosts()
  loading.value = false
})

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  return isNaN(date.getTime()) ? d : date.toLocaleDateString()
}
</script>

