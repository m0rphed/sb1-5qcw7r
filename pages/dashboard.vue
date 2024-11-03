<script setup>
const supabase = useSupabaseClient()
const exercises = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
    
    if (error) throw error
    exercises.value = data
  } catch (err) {
    console.error('Error fetching exercises:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
      </div>

      <div v-if="loading" class="text-center text-gray-900 dark:text-white">
        <p>Loading exercises...</p>
      </div>

      <div v-else class="space-y-8">
        <section>
          <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Available Exercises</h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="exercise in exercises"
              :key="exercise.id"
              class="rounded-lg bg-white p-4 shadow dark:bg-gray-800"
            >
              <h3 class="font-medium text-gray-900 dark:text-white">{{ exercise.title }}</h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ exercise.description }}</p>
              <NuxtLink
                :to="`/exercise/${exercise.id}`"
                class="mt-4 inline-block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Start Exercise →
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>