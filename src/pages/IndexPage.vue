<template>
  <div class="q-pa-md">
    <q-input
      filled
      type="search"
      placeholder="Digite o nome do personagem"
      v-model="searchName"
      outlined
      debounce="500"
      @keydown.space.prevent="searchName = searchName.trim() + ' '"
      @update:model-value="fetchCharacters"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <div class="q-pa-md flex flex-center">
    <q-pagination
      v-model="currentPage"
      :max="maxPages"
      :max-pages="6"
      direction-links
      @update:model-value="fetchCharacters"
    />
  </div>

  <div v-if="characters.length > 0" class="q-pa-md row items-start q-gutter-md">
    <q-card v-ripple v-for="character in characters" :key="character.id" class="my-card">
      <img :src="character.image">
      <q-card-section>
          <q-btn flat :to="`/character/${character.id}`">{{ character.name }}</q-btn>
      </q-card-section>
    </q-card>
  </div>

  <q-inner-loading :showing="loading" />
  
  <q-banner v-if="characters.length === 0 && !loading" class="bg-warning text-black q-mt-md">
    Nenhum personagem encontrado com o nome "{{ searchName }}".
  </q-banner>
</template>

<script setup>
  import { client } from 'src/utils/graphql-client'
  import { ref, watch, onMounted } from 'vue'

  const searchName = ref('')
  const currentPage = ref(1)
  const maxPages = ref(1)
  const characters = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCharacters = async () => {
    loading.value = true
    error.value = null

    try {
      const query = `
        query GetCharacters($page: Int!, $name: String) {
          characters(page: $page, filter: { name: $name }) {
            info {
              pages
            }
            results {
              id
              name
              image
            }
          }
        }
      `

      const variables = {
        page: currentPage.value,
        name: searchName.value.trim() || undefined // Envia `null` se vazio
      }

      const data = await client.request(query, variables)
      
      if (data.characters.info) {
        maxPages.value = data.characters.info.pages || 0
        characters.value = data.characters.results || []
      } else {
        maxPages.value = 1
        characters.value = []
      }
    } catch (err) {
      error.value = "Erro ao buscar personagens: " + err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchCharacters()
  })

  watch(searchName, (newVal) => {
    if (newVal.trim()) {
      currentPage.value = 1
    }
    fetchCharacters()
  })

  watch(currentPage, fetchCharacters)

  fetchCharacters()
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 200px
</style>
