<template>
  <div class="post">
    <section v-if="loading">Loading…</section>
    <template v-else-if="post">
      <header>
        <router-link to="/" class="back">← Writings</router-link>
        <h1>{{ post.title }}</h1>
        <p class="meta">{{ post.tags.join(', ') }} · {{ formatDate(post.date) }}</p>
      </header>
      <article class="markdown-body" v-html="post.html"></article>
      <nav v-if="prevPost || nextPost" class="post-nav">
        <router-link v-if="prevPost" :to="`/post/${prevPost.slug}`" class="post-nav-prev">
          ← Previous: {{ prevPost.title }}
        </router-link>
        <span v-else class="post-nav-prev"></span>
        <router-link v-if="nextPost" :to="`/post/${nextPost.slug}`" class="post-nav-next">
          Next: {{ nextPost.title }} →
        </router-link>
      </nav>
    </template>
    <section v-else>
      <p>Post not found.</p>
      <router-link to="/">Go home</router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPostWithNext } from '../content'

const route = useRoute()
const loading = ref(true)
const post = ref(null)
const prevPost = ref(null)
const nextPost = ref(null)

async function fetchPost() {
  loading.value = true
  const { post: p, prevPost: prev, nextPost: next } = await getPostWithNext(route.params.slug)
  post.value = p
  prevPost.value = prev
  nextPost.value = next
  loading.value = false
}

onMounted(fetchPost)
watch(() => route.params.slug, fetchPost)

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  return isNaN(date.getTime()) ? d : date.toLocaleDateString()
}
</script>
