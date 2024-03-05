<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">VRISTO</span>
                    </router-link>
                    <a href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()">
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <perfect-scrollbar :options="{
                    swipeEasing: true,
                    wheelPropagation: false,
                }" class="h-[calc(100vh-80px)] relative">
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('quản lý học sinh') }}</span>
                        </h2>

                        <li class="nav-item">
                            <ul>
                                <li class="nav-item">
                                    <router-link to="/students" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Học sinh')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/fees" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Học phí')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/attendances" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Điểm danh')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/reports/sessions/add" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Nhận xét sau buổi học')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/reports/assignments/add" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Nhận xét bài làm')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('quản lý bài học') }}</span>
                        </h2>

                        <li class="nav-item">
                            <ul>
                                <li class="nav-item">
                                    <router-link to="/lessons" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Bài học')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/lessons/add" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Thêm bài học')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('quản lý giáo viên') }}</span>
                        </h2>

                        <li class="nav-item">
                            <ul>
                                <li class="nav-item">
                                    <router-link to="/students" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    'Danh sách giáo viên'
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/fees" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Tiền lương')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/attendances" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('Điểm danh')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';

import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
import IconMinus from '@/components/icon/icon-minus.vue';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat.vue';
import IconMenuMailbox from '@/components/icon/menu/icon-menu-mailbox.vue';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo.vue';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes.vue';
import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard.vue';
import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts.vue';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar.vue';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue';
import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets.vue';
import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons.vue';
import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop.vue';
import IconMenuTables from '@/components/icon/menu/icon-menu-tables.vue';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication.vue';
import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation.vue';

const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');

onMounted(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
