<template>
    <div class="panel">
        <div class="mb-5">
            <!-- <div class="mb-5">
                <flat-pickr @input="getStudents" v-model="today" class="form-input text-center w-1/6"></flat-pickr>
            </div> -->
            <form @submit.prevent="submitAttendance()">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ tên</th>
                                <th>Điểm danh</th>
                                <th>Giáo viên dạy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(student, index) in students" :key="student.id">
                                <tr :class="{ 'grayed-out': !student.present }">
                                    <td class="whitespace-nowrap">{{ index + 1 }}</td>
                                    <td>{{ student.fullName }}</td>
                                    <input type="text" class="form-input" hidden v-model="student.id">
                                    <td>
                                        <label class="inline-flex">
                                            <input type="checkbox" class="form-checkbox text-success"
                                                v-model="student.present"/>
                                            <span>Có mặt</span>
                                        </label>
                                    </td>
                                    <td>
                                        <select v-if="student.present" id="teacher" name="teacher" class="form-select" :disabled="student.hasTeacher" v-model="student.teacherId">
                                            <option disabled value="" selected>Select a teacher</option>
                                            <template v-for="teacher in teachers" :key="teacher.id">
                                            <option :value="teacher.id">{{ teacher.fullName }}</option>
                                            </template>
                                        </select>
                                    </td>
                                </tr>
                            </template>
                            
                        </tbody>
                    </table>
                </div>
            </form>
            <div class="mt-5 w-50 flex justify-center">
                <button type="button" class="btn btn-danger">Thêm học sinh</button>
            </div>
            <div class="mt-5 w-50 flex justify-center">
                <button type="button" class="btn btn-outline-success w-1/4" @click="submitForm()">Xác nhận</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import { useAppStore } from '@/stores/index';
import { ref, onMounted, getCurrentInstance, watch, onBeforeUnmount, computed } from 'vue';
import highlight from '@/components/plugins/highlight.vue';
import IconCode from '@/components/icon/icon-code.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { log } from 'console';

const store = useAppStore();
const teachers = ref([]);
const selectedTeachers = ref([]); // Array to store selected teacher IDs

const students = ref([]);
interface Attendance {
    id: {
        id: number,
        date: date
    }; 
    fullName: string;
    present: boolean; 
    teacherId?: number;
}
async function fetchData() {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/students/names-and-ids';
    const response = await axios.get(apiUrl);
    students.value = response.data.data; // Update students with fetched data
    
  } catch (error) {
    console.error('Error fetching student data:', error);
    // Handle error, e.g., display an error message to the user
  }
}

fetchData();
let today = ref();


const date1 = ref(new Date().toISOString().substr(0, 10));
const basic: any = ref({
    dateFormat: 'Y-m-d',
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
});


async function getTeachers() {
    const apiUrl = import.meta.env.VITE_APP_API_URL + 'admin/students/names-and-ids';
    const response = await axios.get(apiUrl);
    teachers.value = response.data.data;
};

function updateLocalStorage() {
  localStorage.setItem('selectedTeachers', JSON.stringify(selectedTeachers.value));
}
let attendances = [];


// async function submitAttendance(this: { $forceUpdate(): void }) {
//     const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/attendances`;

//     try {
//         const dataToSend = students.value.map(student => ({
//             id: {
//                 id: student.id,
//                 date: date1.value
//             },
//             present: student.present,
//             teacherId: student.teacherId ? student.teacherId.id : null
//         }));

//         if (dataToSend.some(student => student.present && !student.teacherId)) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Đã có lỗi xảy ra',
//                 text: 'Hãy chọn giáo viên dạy!',
//                 padding: '2em',
//                 customClass: 'sweet-alerts',
//             });
//             return;
//         }

//         const response = await axios.post(apiUrl, dataToSend);
//         showAlert();
//         const instance = getCurrentInstance();
//         instance?.proxy?.$forceUpdate();
//     } catch (error) {
//         console.error('Error sending data:', error);
//     }
// }

const showAlert = async () => {
    Swal.fire({
        icon: 'success',
        title: 'Điểm danh thành công',
        padding: '2em',
        customClass: 'sweet-alerts',
    });
}

onMounted(async () => {
  await getTeachers();
  const storedSelection = localStorage.getItem('selectedTeachers');
  if (storedSelection) {
    selectedTeachers.value = JSON.parse(storedSelection);
  }
});
// onMounted(() => {
//     // getStudents();
//     await fetchTeachers();
//   const storedSelection = localStorage.getItem('selectedTeachers');
//   if (storedSelection) {
//     selectedTeachers.value = JSON.parse(storedSelection);
//   }
// });

</script>
