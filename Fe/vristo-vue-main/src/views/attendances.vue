<template>
    <div class="panel">
        <div class="mb-5">
            <div class="flex gap-4 mb-5">
                <div class="dropdown">
                    <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle w-24">
                            {{ state.weekdays.label }}
                        </button>
                        <template #content="{ close }">
                            <ul
                                @click="
                                    ($event) => {
                                        onChangeWeekdays($event);
                                        close();
                                    }
                                "
                                class="whitespace-nowrap w-24"
                            >
                                <template v-for="weekdays in WEEKDAYS_DEFINE" :key="weekdays.value">
                                    <li>
                                        <a class="cursor-pointer" :data-label="weekdays.label" :data-value="weekdays.value">{{ weekdays.label }}</a>
                                    </li>
                                </template>
                            </ul>
                        </template>
                    </Popper>
                </div>
                <div class="dropdown">
                    <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle w-40">
                            {{ state.shifts.label }}
                        </button>
                        <template #content="{ close }">
                            <ul
                                @click="
                                    ($event) => {
                                        onChangeShifts($event);
                                        close();
                                    }
                                "
                                class="whitespace-nowrap w-40"
                            >
                                <template v-for="shifts in SHIFTS_DEFINE" :key="shifts.value">
                                    <li>
                                        <a class="cursor-pointer" :data-label="shifts.label" :data-value="shifts.value">{{ shifts.label }}</a>
                                    </li>
                                </template>
                            </ul>
                        </template>
                    </Popper>
                </div>
                <button type="button" class="btn btn-success" :disabled="!state.weekdays.value || !state.shifts.value" @click="onFetchData">
                    Hiện kết quả
                </button>
                <flat-pickr @input="onChangeDate" v-model="state.date" class="form-input text-center w-1/6"></flat-pickr>
            </div>
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
                        <template v-for="(student, index) in state.listStudent" :key="student.id">
                            <tr :class="{ 'grayed-out': !student.isPresent }">
                                <td class="whitespace-nowrap">{{ index + 1 }}</td>
                                <td>{{ student.fullName }}</td>
                                <input type="text" class="form-input" hidden v-model="student.id" />
                                <td>
                                    <label class="inline-flex">
                                        <input type="checkbox" class="form-checkbox text-success" v-model="student.isPresent" />
                                        <span>Có mặt</span>
                                    </label>
                                </td>
                                <td>
                                    <select
                                        v-if="student.isPresent"
                                        id="teacher"
                                        name="teacher"
                                        class="form-select"
                                        @change="
                                            ($event) => {
                                                onChangeTeacher($event, student.id);
                                            }
                                        "
                                    >
                                        <option disabled value="" selected>Select a teacher</option>
                                        <template v-for="teacher in state.listTeacher" :key="teacher.id">
                                            <option :value="teacher.id">{{ teacher.user.fullName }}</option>
                                        </template>
                                    </select>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="mt-5 w-50 flex justify-center">
                <button type="button" class="btn btn-danger" @click="state.showCreateModal = true">Thêm học sinh</button>
            </div>
            <div class="mt-5 w-50 flex justify-center">
                <button type="button" class="btn btn-outline-success w-1/4" @click.prevent="onSubmitAttendance">Xác nhận</button>
            </div>
        </div>
    </div>

    <div>
        <!-- Modal -->
        <TransitionRoot appear :show="state.showCreateModal" as="template">
            <Dialog as="div" @close="state.showCreateModal = false" class="relative z-50">
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-start justify-center px-4 py-16">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl text-black dark:text-white-dark">
                                <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    Thêm học sinh
                                </div>
                                <div class="px-5 pt-5">
                                    <input type="text" placeholder="Search Student..." class="form-input bg-white" v-model="formState.search" />
                                </div>
                                <div class="p-5 min-h-[500px]">
                                    <div class="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="(student, index) in formState.listStudentRendered" :key="student.id">
                                                    <tr>
                                                        <td class="whitespace-nowrap">{{ index + 1 }}</td>
                                                        <td>{{ student.fullName }}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                :class="`btn ${student.selected ? 'btn-success' : 'btn-outline-success'}`"
                                                                @click="onChangeCreateStudentList(student)"
                                                            >
                                                                {{ student.selected ? 'Selected' : 'Select' }}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="flex justify-end items-center mt-8">
                                        <button type="button" @click="state.showCreateModal = false" class="btn btn-outline-danger">Discard</button>
                                        <button type="submit" @click="onSubmitCreateStudent" class="btn btn-primary ltr:ml-4 rtl:mr-4">Save</button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script lang="ts" setup>
    import { useAppStore } from '@/stores/index';
    import { onMounted, reactive, watch } from 'vue';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import Swal from 'sweetalert2';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { getTeachers, saveAttendances, getAttendances, getStudents } from '@/api/attendances';
    import dayjs from 'dayjs';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
    import { SHIFTS_DEFINE, WEEKDAYS_DEFINE } from '@/constants/attendances';

    type StateType = {
        listStudent: {
            id: string;
            fullName: string;
            isPresent: boolean;
            teacherId: string | null;
        }[];
        listTeacher: {
            id: string;
            salary: number;
            user: {
                authorities: unknown[];
                dateOfBirth: string;
                email: string;
                fullName: string;
                id: string;
                phoneNumber?: string;
                sex: boolean;
                status: number;
                username?: string;
            };
        }[];
        weekdays: {
            label: string;
            value: string | undefined;
        };
        shifts: {
            label: string;
            value: string | undefined;
        };
        date: string;
        showCreateModal: boolean;
    };

    type FormStateType = {
        listStudent: {
            id: string;
            fullName: string;
            selected: boolean;
        }[];
        listStudentRendered: {
            id: string;
            fullName: string;
            selected: boolean;
        }[];
        search: string;
    };

    const store = useAppStore();

    const state: StateType = reactive({
        listStudent: [],
        listTeacher: [],
        weekdays: {
            label: 'Thứ',
            value: undefined,
        },
        shifts: {
            label: 'Ca',
            value: undefined,
        },
        date: dayjs().format('YYYY-MM-DD'),
        showCreateModal: false,
    });

    const formState: FormStateType = reactive({
        listStudent: [],
        listStudentRendered: [],
        search: '',
    });

    watch(
        () => formState.search,
        async (search) => {
            formState.listStudentRendered = formState.listStudent.filter((student) => student.fullName.includes(search));
        }
    );

    const initFetchData = async () => {
        try {
            const { data } = await getStudents();
            formState.listStudent = data.map((student) => ({ ...student, selected: false }));
            formState.listStudentRendered = data
                .filter((student) => {
                    const studentInList = state.listStudent.filter((studentState) => studentState.id === student.id);
                    if (studentInList.length) return;
                    return student;
                })
                .map((student) => ({ ...student, selected: false }));

            const { data: listTeacher } = await getTeachers();
            state.listTeacher = listTeacher;
        } catch (error) {
            console.log('Failed at fetch student list');
        }
    };

    const onFetchData = async () => {
        try {
            const { data: listStudentAttendances } = await getAttendances({
                day: state.weekdays.value,
                time: state.shifts.value,
            });
            state.listStudent = listStudentAttendances.map((student) => ({ ...student, isPresent: false, teacherId: null }));
            await initFetchData();
        } catch (error) {
            console.log('Failed at fetch student attendances');
        }
    };

    const onSubmitAttendance = async () => {
        try {
            const params = state.listStudent.map((student) => ({
                id: {
                    id: student.id,
                    date: state.date,
                },
                present: student.isPresent,
                teacherId: student.teacherId ?? null,
            }));
            if (params.some((student) => student.present && !student.teacherId)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Đã có lỗi xảy ra',
                    text: 'Hãy chọn giáo viên dạy!',
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
                return;
            }
            const response = await saveAttendances(params);
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Điểm danh thành công',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const onSubmitCreateStudent = async () => {
        try {
            state.listStudent = [
                ...state.listStudent,
                ...formState.listStudentRendered
                    .filter((student) => student.selected)
                    .map((student) => ({ id: student.id, fullName: student.fullName, isPresent: false, teacherId: null })),
            ];
            await initFetchData();
            Swal.fire({
                icon: 'success',
                title: 'Thêm học sinh thành công',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            state.showCreateModal = false;
        } catch (error) {
            state.showCreateModal = false;
        }
    };

    const onChangeDate = (event) => {
        state.date = event.target.value;
    };

    const onChangeTeacher = (event, studentId) => {
        state.listStudent = [...state.listStudent].map((student) => {
            if (student.id !== studentId) return student;
            return {
                ...student,
                teacherId: event.target.value,
            };
        });
    };

    const onChangeWeekdays = (event) => {
        state.weekdays = {
            label: event.target.dataset.label,
            value: event.target.dataset.value,
        };
    };

    const onChangeShifts = (event) => {
        state.shifts = {
            label: event.target.dataset.label,
            value: event.target.dataset.value,
        };
    };

    const onChangeCreateStudentList = ({ id }: { id: string; fullName: string }) => {
        formState.listStudent = formState.listStudent
            .filter((student) => {
                const studentInList = state.listStudent.filter((studentState) => studentState.id === student.id);
                if (studentInList.length) return;
                return student;
            })
            .map((student) => {
                if (student.id !== id) return student;
                return {
                    ...student,
                    selected: !student.selected,
                };
            });
        formState.listStudentRendered = formState.listStudentRendered
            .filter((student) => {
                const studentInList = state.listStudent.filter((studentState) => studentState.id === student.id);
                if (studentInList.length) return;
                return student;
            })
            .map((student) => {
                if (student.id !== id) return student;
                return {
                    ...student,
                    selected: !student.selected,
                };
            });
    };

    onMounted(() => {
        initFetchData();
    });
</script>
