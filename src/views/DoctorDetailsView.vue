<template>
  <div class="mt-[20px] mb-[30px]">
    <loading v-model:active="loading" :can-cancel="true" :is-full-page="false" />
    <div v-if="!loading">
      <DoctorProfileCard :doctor="doctor" />
      <AppointmentForm :doctor="doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import AppointmentForm from '@/components/AppointmentForm.vue'
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import { computed, defineComponent, onMounted, watch } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DoctorProfileCard,
    AppointmentForm,
    Loading,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const loading = computed(() => store.state.doctorStore.loading)
    const doctor = computed(() => store.state.doctorStore.doctorProfile)
    const error = computed(() => store.state.doctorStore.error)

    onMounted(() => {
      store.dispatch('doctorStore/fetchDoctorProfile', route?.params?.name)
      console.log('mounted')
    })

    watch([loading, doctor], ([watchLoading, watchDoctor]) => {
      if (!watchLoading && !watchDoctor.name) {
        router.push({ name: 'not-found' })
      }
    })

    return {
      doctor,
      loading,
      error,
    }
  },
})
</script>
