
import { onMounted } from 'vue';
<template>
    <div class="container xl:mx-auto sm:mx-4">
        <div class="panel my-6">
            <p class="text-xl font-bold" v-if="studentNameDob[0] && studentNameDob[0][0]">
                {{ studentNameDob[0][0][0] }} - {{ dayjs(studentNameDob[0][0][1]).format('DD/MM/YYYY') }}
            </p>
            <p class="text-xl font-bold" v-else>...</p>
        </div>
        <div v-for="(report) in reports" class="panel my-6">
            <div class="flex m-1 p-4">
                <div class="flex-1">
                    <h4 class="font-semibold text-lg mb-2 text-primary">{{ report.date }}</h4>
                    <ul class="list-disc">
                        <li>Làm bài tập về nhà: {{ report.homeworkCompletion }}</li>
                        <li>Đi học đúng giờ: {{ report.onTime }}</li>
                        <li>Thái độ học tập: {{ report.studyingAttitude }}</li>
                        <li>Nhận xét chung:
                            <ul class="list-disc">
                                <!-- <li v-for="cmt in reports.generalComment.split('\n')" :key="cmt">{{ cmt }}</li> -->
                                <li>sdfsadfsdf</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axios from 'axios';
import IconBell from '@/components/icon/icon-bell.vue';
import IconCode from '@/components/icon/icon-code.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconAirplay from '@/components/icon/icon-airplay.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconLayout from '@/components/icon/icon-layout.vue'; import VueCollapsible from 'vue-height-collapsible/vue3';
import { useMeta } from '@/composables/use-meta';
import dayjs from 'dayjs'

useMeta({ title: 'Nhận xét học sinh' });
const reports = ref([]);
const studentNameDob = ref([]);

function getReportsById(encodedId) {
    const apiUrl = import.meta.env.VITE_APP_API_URL + `session-reports?encodedId=${encodedId}`;

    axios
        .get(apiUrl)
        .then((response) => {
            const mappedData = response.data.data.map((item) => ({
                date: dayjs(item.date).format('DD/MM/YYYY'),
                generalComment: item.generalComment,
                homeworkCompletion: item.homeworkCompletion,
                onTime: item.onTime,
                studyingAttitude: item.studyingAttitude
            }));

            reports.value = mappedData;
        })


}

function getStudentNameById(id) {
    const apiUrl = import.meta.env.VITE_APP_API_URL + `admin/students/name-dob?id=${id}`;

    axios
        .get(apiUrl)
        .then((response) => {
            studentNameDob.value.push(response.data.data);
            console.log(studentNameDob.value[0][0][1]);
        }).catch((error) => {
            console.error('Error fetching student data:', error);
        });

}

onMounted(() => {

    const route = useRoute();
    let encodedId = route.params.id;
    getStudentNameById(atob(encodedId + '='));
    getReportsById(encodedId);
    // accordions.value = new Array(2).fill(1)

})
</script>