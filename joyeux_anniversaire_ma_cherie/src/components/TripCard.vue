<template>
  <div class="trip-card">
    <img :src="trip.image" :alt="trip.destination" class="trip-image" />
    
    <div class="trip-content">
      <h2 class="destination">{{ trip.destination }}</h2>
      <p class="description">{{ trip.description }}</p>
      
      <div class="trip-details">
        <div class="detail">
          <span class="label">Départ :</span>
          <span>{{ trip.departure }}</span>
        </div>
        <div class="detail">
          <span class="label">Dates :</span>
          <span>{{ trip.departureDate }} - {{ trip.returnDate }}</span>
        </div>
        <div class="detail">
          <span class="label">Durée :</span>
          <span>{{ trip.duration }}</span>
        </div>
      </div>

      <div class="highlights">
        <span v-for="highlight in trip.highlights" :key="highlight" class="highlight-tag">
          {{ highlight }}
        </span>
      </div>

      <button @click="selectTrip" class="select-button">
        Choisir ce voyage
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Définition du type Trip
interface Trip {
  id: number
  destination: string
  departure: string
  departureDate: string
  returnDate: string
  duration: string
  image: string
  description: string
  highlights: string[]
}

// Props
const props = defineProps<{
  trip: Trip
}>()

// Router pour navigation
const router = useRouter()

// Fonction pour sélectionner un voyage
const selectTrip = () => {
  router.push(`/trip/${props.trip.id}`)
}
</script>

<style scoped>
.trip-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.trip-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.trip-content {
  padding: 1.5rem;
}

.destination {
  font-size: 1.8rem;
  color: #082548;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.description {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.trip-details {
  margin-bottom: 1.5rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  font-weight: 600;
  color: #082548;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.highlight-tag {
  background: #e8f4f8;
  color: #0088ce;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.select-button {
  width: 100%;
  background: #cd0067;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.select-button:hover {
  background: #a50053;
}
</style>