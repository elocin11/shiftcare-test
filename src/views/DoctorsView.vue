<template>
  <div class="mt-[20px]">
    <loading v-model:active="loading" :can-cancel="true" :is-full-page="false" />
    <div v-if="!loading">
      <h1 class="text-[1.5rem] text-black">Discover our healthcare providers</h1>
      <ul class="mt-[20px]">
        <li v-for="doctor in doctors" :key="doctor.name" class="mb-5">
          <DoctorProfileCard :doctor="doctor" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default defineComponent({
  components: {
    DoctorProfileCard,
    Loading,
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
