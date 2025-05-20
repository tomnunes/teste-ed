<template>
	<div class="q-py-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Página do personagem" />
    </q-breadcrumbs>
  </div>
	<q-card v-if="character" class="my-card">
    <q-card-section horizontal>
      <q-img
      	class="col-4"
        :src="character.image"
      />
      <q-card-section class="q-pa-lg col-6">
    		<div class="text-h4">{{ character.name }}</div>
        <div class="text-grey-6 text-subtitle1">{{ character.species }}</div>

      	<div class="q-py-lg">
	        <div class="text-body1 text-grey-6">
	        	<div class="text-weight-bold text-grey-9">Gender</div>
		        {{ character.gender }}
		      </div>
	        <div class="text-body1 text-grey-6">
	        	<div class="text-weight-bold text-grey-9">Localização</div>
		        {{ character.location.name }}
		      </div>
		    </div>

      	<div class="text-h5">Episodes</div>
      	<div class="q-py-sm">
      		<q-scroll-area
			      style="height: 146px; width: 100%"
			      class="bg-grey-1"
			    >
        		<div v-if="character.episode.length > 0" v-for="episode in character.episode" :key="episode.id" v-ripple class="q-pa-sm">
	          	<div class="text-body1 text-grey-8">{{ episode.episode }} - {{ episode.name }}</div>
		          <div class="text-grey-6">{{ episode.air_date }}</div>
		          <q-separator v-if="character.episode[character.episode.length - 1] !== episode" spaced />
			      </div>
		      </q-scroll-area>
		    </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
	import { useRoute } from 'vue-router'
	import { ref, onMounted } from 'vue'
	import { client } from 'src/utils/graphql-client'

	const route = useRoute()
	const userId = ref(route.params.id)
	const character = ref(null)

	onMounted(async () => {
	  const query = `
	    query GetCharacter($id: ID!) {
	      character(id: $id) {
					name
					image
					species
					gender
			  	location {name}
					episode {name, id, air_date, episode}
	      }
	    }
	  `

	  const data = await client.request(query, { id: userId.value })
	  character.value = data.character
	})
</script>