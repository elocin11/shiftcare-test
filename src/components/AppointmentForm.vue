<template>
  <form @submit.prevent="submitForm">
    <!-- form schedule section -->
    <div class="flex flex-col bg-[white] p-[30px] mt-5 rounded">
      <h1 class="block text-[1.2rem] text-black">Appointment schedule</h1>
      <small
        >Note: Some dates and time slots may no longer be available as the doctor's schedule may
        already be full
      </small>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[14px]">Select a date*</label>
        <flat-pickr
          placeholder="YYYY-MM-DD"
          v-model="selectedDate"
          :config="datePickerOptions"
          class="w-auto border p-[15px]"
        />
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[14px]"
          >Select a time slot*</label
        >
        <ul>
          <li v-for="slot in slots" :key="slot">{{ slot }}</li>
        </ul>
      </div>
    </div>
    <!-- form patient information section  -->
    <div class="flex flex-col bg-[white] p-[30px] mt-5 rounded">
      <h1 class="block text-[1.2rem] text-black">Patient Information</h1>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[14px]">Patient Name*</label>
        <div class="grid grid-cols-2 gap-4">
          <input type="text" class="border p-[15px]" placeholder="First Name" />
          <input type="text" class="border p-[15px]" placeholder="Last Name" />
        </div>
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[14px]">Contact Details*</label>
        <div class="grid grid-cols-2 gap-4">
          <input type="text" class="border p-[15px]" placeholder="Email Address" />
          <input type="text" class="border p-[15px]" placeholder="Mobile Number " />
        </div>
      </div>
      <div class="flex flex-col mt-[30px]">
        <label class="block text-[1rem] text-black mb-[10px] text-[14px]">Chief Complaint*</label>
        <textarea class="border h-[100px] p-[15px]"></textarea>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <button
        class="w-[100px] px-[15px] py-[10px] text-[white] bg-[#fdbb46] rounded-full mt-[15px] text-md ml-auto"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import type { IDoctorProfile, IDoctorSchedule } from '@/types/Doctor'
import 'flatpickr/dist/flatpickr.css'
import { uniqBy } from 'lodash'
import { computed, defineComponent, ref, type PropType } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    FlatPickr,
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
    const route = useRoute()

    const loading = computed(() => store.state.doctorStore.loading)
    const error = computed(() => store.state.doctorStore.error)

    const enabledDays = computed(() => {
      const mappedDays = doctor?.schedule?.map((s: IDoctorSchedule) => s?.day_of_week)
      // distinct days of week, example: (Dr. Geovany Keebler contains 2 sets of thursday schedule )
      return uniqBy(mappedDays, (day) => day)
    })
    console.log(doctor, 'doctor')

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

    const selectedDate = ref('2025-02-19')

    const submitForm = () => {
      // store.dispatch('saveFormData', formData.value)
    }

    return {
      loading,
      error,
      enabledDays,
      slots,
      datePickerOptions,
      selectedDate,
      submitForm,
    }
  },
})
</script>

<style scoped>
ul {
  display: flex;
}

ul > li {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
