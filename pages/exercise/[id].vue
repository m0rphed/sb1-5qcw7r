<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const router = useRouter()

const exercise = ref(null)
const currentSentenceIndex = ref(0)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', route.params.id)
      .single()
    
    if (error) throw error
    exercise.value = data
  } catch (err) {
    console.error('Error fetching exercise:', err)
  } finally {
    loading.value = false
  }
})

function speakSentence() {
  if (!exercise.value?.sentences[currentSentenceIndex.value]) return
  
  const utterance = new SpeechSynthesisUtterance(
    exercise.value.sentences[currentSentenceIndex.value].text
  )
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}

function nextSentence() {
  if (currentSentenceIndex.value < exercise.value.sentences.length - 1) {
    currentSentenceIndex.value++
  }
}

function skipSentence() {
  nextSentence()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
    <div class="mx-auto max-w-2xl">
      <div v-if="loading" class="text-center text-gray-900 dark:text-white">
        <p>Loading exercise...</p>
      </div>

      <template v-else-if="exercise">
        <div class="mb-8">
          <button
            @click="router.push('/dashboard')"
            class="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Dashboard
          </button>
          <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{{ exercise.title }}</h1>
        </div>

        <div
          v-if="exercise.sentences && exercise.sentences[currentSentenceIndex]"
          class="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
        >
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Exercise {{ currentSentenceIndex + 1 }} of {{ exercise.sentences.length }}
          </p>
          
          <div class="mb-6 space-y-4">
            <p class="text-xl text-gray-900 dark:text-white">
              {{ exercise.sentences[currentSentenceIndex].text }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              {{ exercise.sentences[currentSentenceIndex].phonetic }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              {{ exercise.sentences[currentSentenceIndex].translation }}
            </p>
          </div>

          <div class="flex gap-4">
            <button
              @click="speakSentence"
              class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Listen
            </button>
            <button
              @click="skipSentence"
              class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Skip
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>