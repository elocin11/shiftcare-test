<template>
  <div class="flex bg-[white] p-[30px] rounded">
    <div class="flex-1">
      <span class="block mb-1 text-[1.5rem] font-semibold text-black"
        >{{ formattedDate }} ({{ appointment?.schedule?.slot }})</span
      >
      <span class="block font-light">Assigned doctor: {{ appointment?.doctor }}</span>
      <span class="block font-light"
        >Patient: {{ appointment?.firstName }} {{ appointment?.lastName }}</span
      >
      <span class="block font-light"
        >Contact: {{ appointment?.mobileNumber }} / {{ appointment?.emailAddress }}</span
      >
      <br />
      <span class="block font-semibold text-black">Chief Complaint:</span>
      <p class="block font-light">
        {{ appointment?.chiefComplaint }}
      </p>
    </div>
    <button
      @click="cancelAppointment"
      class="mb-auto py-[5px] px-[10px] rounded text-[#df5547] mt-[10px] flex items-center flex-column border border-[#df5547]"
    >
      Cancel appointment
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { type IAppointment } from '@/types/Appointment.ts'
import { useStore } from 'vuex'
import moment from 'moment'

export default defineComponent({
  props: {
    appointment: {
      type: Object as PropType<IAppointment>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const { appointment } = props
    const formattedDate = computed(() =>
      moment(appointment?.schedule?.date).format('MMMM DD, YYYY, dddd'),
    )
    const loading = computed(() => store.state.appointmentStore.loading)
    const error = computed(() => store.state.appointmentStore.error)

    const cancelAppointment = () => {
      const result = confirm('Confirm cancellation?')

      if (result) {
        store.dispatch('appointmentStore/removeAppointment', appointment)
      }

      if (!loading.value && error.value) {
        alert(error.value)
      }
    }

    return { data: appointment, formattedDate, cancelAppointment }
  },
})
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

ul > li {
  font-size: 14px;
  font-weight: light;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: #ffffff;
  background-color: #5fb587;
}
</style>
