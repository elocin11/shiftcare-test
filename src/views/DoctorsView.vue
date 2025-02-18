<template>
  <div class="mt-[20px]">
    <h1 class="text-[1.5rem] text-black">Discover our healthcare providers</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else class="mt-[20px]">
      <li v-for="doctor in doctors" :key="doctor.name" class="mb-5">
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
    const loading = computed(() => store.state.doctorStore.loading)
    const error = computed(() => store.state.doctorStore.error)
    const doctors = computed(() => store.state.doctorStore.doctors)

    onMounted(() => {
      store.dispatch('doctorStore/fetchDoctors')
      // console.log('fetched doctor!')
    })

    return { doctors, loading, error }
  },
})
</script>
