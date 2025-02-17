<template>
  <div class="mt-[20px]">
    <h1 class="text-[1.5rem] text-black">Discover our healthcare providers</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else class="mt-[20px]">
      <li class="flex mb-[50px]" v-for="doctor in doctors" :key="doctor.name">
        <img src="https://placehold.co/150" class="rounded-full h-[150px] w-[150px]" />
        <div class="ml-[30px]">
          <span class="block text-[1.5rem] font-semibold text-black">Christy Schum</span>
          <span class="block font-light">Timezone: Australia/Sydney</span>
          <span class="block font-light">Status: Available</span>
          <p class="block font-light">
            Introduction: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ipsum porro
            enim dolor!
          </p>
          <router-link to="{}">
            <button
              class="py-[5px] text-[#3594e4] font-semibold mt-[10px] flex items-center flex-column border-b border-[#3594e4]"
            >
              Book an appointment
            </button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

interface IDoctor {
  name: string
  timezone: string
  day_of_week: string
  available_at: string
  available_until: string
}

export default {
  setup() {
    const doctors = ref<IDoctor[]>([
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Natalia Stanton Jr.',
        timezone: 'Australia/Perth',
        day_of_week: 'Tuesday',
        available_at: ' 8:00AM',
        available_until: '10:00AM',
      },
      {
        name: 'Nola Murazik V',
        timezone: 'Australia/Darwin',
        day_of_week: 'Monday',
        available_at: ' 8:00AM',
        available_until: '10:00AM',
      },
      {
        name: "Elyssa O'Kon",
        timezone: 'Australia/Perth',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 3:00PM',
      },
      {
        name: 'Dr. Geovany Keebler',
        timezone: 'Australia/Perth',
        day_of_week: 'Thursday',
        available_at: ' 7:00AM',
        available_until: ' 2:00PM',
      },
      {
        name: 'Ramy Malik',
        timezone: 'Australia/Perth',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 3:00PM',
      },
    ])

    const loading = ref(true)

    return { doctors, loading }
  },
}
</script>
