<template>
  <div class="mt-[20px]">
    <h1 class="text-[1.5rem] text-black">Discover our healthcare providers</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else class="mt-[20px]">
      <li v-for="doctor in doctors" :key="doctor.name" class="mb-[30px]">
        <DoctorProfileCard :doctor="doctor" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import { defineComponent, ref, reactive } from 'vue'
import { type IDoctor } from '@/types/Doctor.ts'

export default defineComponent({
  components: {
    DoctorProfileCard,
  },
  setup() {
    const doctors = reactive<IDoctor[]>([
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

    const loading = ref<boolean>(false)

    return { doctors, loading }
  },
})
</script>
