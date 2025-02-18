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
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DoctorProfileCard,
  },
  setup() {
    const store = useStore()
    const doctors = computed(() => store.state.doctor.doctorList)
    const loading = computed(() => store.state.doctor.loading)
    const error = computed(() => store.state.doctor.error)

    onMounted(() => {
      store.dispatch('doctor/fetchDoctorList')
      console.log('fetch doctor!')
    })

    return { doctors, loading, error }
  },
})
</script>
