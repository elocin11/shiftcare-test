<template>
  <div class="mt-[20px]">
    <loading v-model:active="loading" :can-cancel="true" :is-full-page="false" />
    <div v-if="error" class="p-[20px] mt-5 text-[#f15054] bg-[#ffe5e4] border-0 rounded border">
      {{ error }}
    </div>
    <div v-if="!loading && !error">
      <h1 class="text-[1.5rem] text-black">My Appointments</h1>
      <ul class="mt-[20px]">
        <li v-for="appointment in appointments" :key="appointment.name" class="mb-5">
          <AppointmentCard :appointment="appointment" />
        </li>
      </ul>
      <div v-if="!appointments.length">No data to display</div>
    </div>
  </div>
</template>

<script lang="ts">
import AppointmentCard from '@/components/AppointmentCard.vue'
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default defineComponent({
  components: {
    AppointmentCard,
    Loading,
  },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.appointmentStore.loading)
    const error = computed(() => store.state.appointmentStore.error)
    const appointments = computed(() => store.state.appointmentStore.appointments)

    onMounted(() => {
      store.dispatch('appointmentStore/fetchAppointments')
      // console.log('fetched doctor!')
    })

    // clean up
    onUnmounted(() => {
      store.commit('appointmentStore/setError', null)
    })

    return { appointments, loading, error }
  },
})
</script>
