<template>
  <div class="trip-card" @click="selectTrip">
    <div class="image-container">
      <img 
        :src="trip.destinationImages?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'" 
        :alt="trip.destination" 
        class="trip-image" 
      />
    </div>
    
    <div class="trip-info">
      <h3 class="destination">{{ trip.destination }}</h3>
      <p class="region">{{ trip.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface TripStep {
  order: number
  city: string
  images: string[]
}

interface Trip {
  id: number
  destination: string
  departure: string
  departureDate: string
  returnDate: string
  duration: string
  destinationImages: string[]
  description: string
  highlights: string[]
  steps: TripStep[]
}

const props = defineProps<{
  trip: Trip
}>()

const router = useRouter()

const selectTrip = () => {
  router.push(`/trip/${props.trip.id}`)
}
</script>

<style scoped>
.trip-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.trip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.trip-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trip-card:hover .trip-image {
  transform: scale(1.05);
}

.trip-info {
  padding: 1.5rem;
}

.destination {
  font-size: 1.3rem;
  color: #2c2c2c;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.region {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}
</style>