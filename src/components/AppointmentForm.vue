<template>
  <form @submit.prevent="submitForm">
    <!-- form schedule section -->
    <div class="flex flex-col bg-[white] p-[30px] mt-5 rounded">
      <h1 class="block text-[1.2rem] text-black">Appointment Schedule</h1>
      <small
        >Note: Some dates and time slots may no longer be available as the doctor's schedule may
        already be full
      </small>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[13px]">Select a date*</label>
        <flat-pickr
          placeholder="YYYY-MM-DD"
          v-model="formData.schedule.date"
          :config="datePickerOptions"
          class="w-auto border p-[15px]"
          required
        />
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[13px]"
          >Select a time slot*</label
        >
        <ul>
          <li v-for="slot in slots" :key="slot">
            <input
              v-model="formData.schedule.slot"
              type="radio"
              name="slot"
              :id="`slot-${slot}`"
              :value="`${slot}`"
              required
            />
            <label :for="`slot-${slot}`">{{ slot }}</label>
          </li>
        </ul>
      </div>
    </div>
    <!-- form patient information section  -->
    <div class="flex flex-col bg-[white] p-[30px] mt-5 rounded">
      <h1 class="block text-[1.2rem] text-black">Patient Information</h1>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[13px]">Patient Name*</label>
        <div class="grid grid-cols-2 gap-4">
          <input
            v-model="formData.firstName"
            type="text"
            class="border p-[15px]"
            placeholder="First Name"
            required
          />
          <input
            v-model="formData.lastName"
            type="text"
            class="border p-[15px]"
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[13px]">Contact Details*</label>
        <div class="grid grid-cols-2 gap-4">
          <input
            v-model="formData.emailAddress"
            type="text"
            class="border p-[15px]"
            placeholder="Email Address"
            required
          />
          <input
            v-model="formData.mobileNumber"
            type="text"
            class="border p-[15px]"
            placeholder="Mobile Number "
            required
          />
        </div>
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[13px]">Chief Complaint*</label>
        <textarea
          v-model="formData.chiefComplaint"
          class="border h-[100px] p-[15px]"
          required
        ></textarea>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <button
        :disabled="loading"
        type="submit"
        class="min-w-[100px] px-[15px] py-[10px] text-[white] bg-[#fdbb46] rounded-full mt-[15px] text-md ml-auto disabled:bg-[#FFAAE0]"
      >
        {{ loading ? 'Submitting' : 'Submit' }}
      </button>
    </div>
  </form>
  <loading v-model:active="loading" :can-cancel="true" :is-full-page="true" />
</template>

<script lang="ts">
import type { IDoctorProfile, IDoctorSchedule } from '@/types/Doctor'
import 'flatpickr/dist/flatpickr.css'
import { uniqBy } from 'lodash'
import { computed, defineComponent, reactive, type PropType } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    FlatPickr,
    Loading,
  },
  props: {
    doctor: {
      type: Object as PropType<IDoctorProfile>,
      required: true,
    },
  },
  setup(props) {
    const { doctor } = props
    const store = useStore()
    // const route = useRoute()
    const formData = reactive({
      firstName: 'Nicole',
      lastName: 'Alday',
      emailAddress: 'nicole.alday1111@gmail.com',
      mobileNumber: '09161848618',
      chiefComplaint: 'Backpain',
      doctor: doctor?.name,
      schedule: {
        date: '2025-02-20',
        slot: 'Monday',
      },
    })

    const loading = computed(() => store.state.appointmentStore.loading)
    const error = computed(() => store.state.appointmentStore.error)

    const enabledDays = computed(() => {
      const mappedDays = doctor?.schedule?.map((s: IDoctorSchedule) => s?.day_of_week)
      // distinct days of week, example: (Dr. Geovany Keebler contains 2 sets of thursday schedule )
      return uniqBy(mappedDays, (day) => day)
    })
    // console.log(doctor, 'doctor')

    const slots = computed(() => doctor?.schedule?.map((s: IDoctorSchedule) => s?.day_of_week))

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const datePickerOptions = computed(() => {
      return {
        disable: [
          (date: { getDay: () => number }) => {
            // Get the day index
            const dayIndex = date.getDay()
            // console.log(dayIndex, 'day index')

            // Get the name of the current day
            const currentDayName = dayNames[dayIndex]
            // console.log(currentDayName, 'currentDayName')

            // If the day is not in the enabledDays array, return true to disable it
            return !enabledDays.value.includes(currentDayName)
          },
          '2025-02-03',
        ],
      }
    })

    const submitForm = async () => {
      await store.dispatch('appointmentStore/saveFormData', formData)
      console.log(formData, 'formData')
      // alert('Successfully Submitted!')
    }

    return {
      loading,
      error,
      enabledDays,
      slots,
      datePickerOptions,
      submitForm,
      formData,
    }
  },
})
</script>

<style scoped>
ul {
  display: flex;
}

ul > li > label {
  padding: 5px 10px;
  border: 1px solid #ababab;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  color: #ababab;
  font-size: 13px;
}

input[type='radio'] {
  /* visibility: hidden; */
  opacity: 0;
  position: absolute;
}

input[type='radio']:checked + label {
  background: #5fb587;
  color: #ffffff;
  border: 1px solid #5fb587;
}

input:not(:placeholder-shown),
textarea:not(:placeholder-shown) {
  border: 1px solid #5fb587;
}
</style>
