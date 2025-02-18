<template>
  <div class="mt-[20px] mb-[30px]">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <DoctorProfileCard :doctor="doctor" />
      <AppointmentForm :doctor="doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import AppointmentForm from '@/components/AppointmentForm.vue'
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DoctorProfileCard,
    AppointmentForm,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const loading = computed(() => store.state.doctorStore.loading)
    const error = computed(() => store.state.doctorStore.error)
    const doctor = computed(() => store.state.doctorStore.doctorProfile)

    console.log(doctor, 'doctor')

    onMounted(() => {
      store.dispatch('doctorStore/fetchDoctorProfile', route?.params?.name)
      console.log('mounted')
    })

    return {
      doctor,
      loading,
      error,
    }
  },
})
</script>
