<template>
  <div class="mt-[20px]">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <DoctorProfileCard :doctor="doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import { type IDoctor } from '@/types/Doctor.ts'

export default defineComponent({
  components: {
    DoctorProfileCard,
  },
  setup() {
    const doctor = reactive<IDoctor>({
      name: 'Christy Schumm',
      timezone: 'Australia/Sydney',
      day_of_week: 'Monday',
      available_at: ' 9:00AM',
      available_until: ' 5:30PM',
    })

    const loading = ref<boolean>(false)

    return { doctor, loading }
  },
})
</script>
