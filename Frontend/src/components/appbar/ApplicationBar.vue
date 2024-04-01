<template>

    <v-app-bar >
        <!-- <v-app-bar-nav-icon variant="text" icon="mdi-home" @click="navigateToHome"></v-app-bar-nav-icon> -->

        <v-app-bar-title class="tw-pl-10">
            <img class="tw-mx-auto tw-h-16 tw-w-auto" :src="logoImage" alt="Your Company">
        </v-app-bar-title>

        <div class="text-center tw-pr-5">
            <!-- <span class="tw-text-s tw-text-gray-500 tw-mr-10 non-selectable">v 0.0.1</span> -->
            <v-menu v-model="menu" :close-on-content-click="false" location="bottom">

                <template v-slot:activator="{ props }">
                    <v-btn icon color="black" v-bind="props">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-card min-width="250">

                    <v-list>
                        <v-list-item density="compact" height="55" style="margin-top: 15px;">

                            <v-row no-gutters>
                                <v-avatar size="60">
                                    <minidenticon-svg :username="userStore.username"
                                        class="minidenticon-svg"></minidenticon-svg>
                                </v-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="non-selectable">{{ userStore.name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ userStore.username }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-row>

                        </v-list-item>
                    </v-list>

                    <v-divider :thickness="2" color="black" style="background-color: black;"
                        class="custom-divider border-opacity-100"></v-divider>

                    <v-list rounded>

                        <!-- <v-list-item @click="navigateToStats" class="rounded-pill">

                            <template v-slot:prepend>
                                <v-icon>mdi-chart-bar</v-icon>
                            </template>
                            <v-list-item-title class="non-selectable">Statistics</v-list-item-title>
                        </v-list-item> -->

                        <v-list-item @click="logout" class="rounded-pill">

                            <template v-slot:prepend>
                                <v-icon>mdi-logout</v-icon>
                            </template>
                            <v-list-item-title class="non-selectable">Logout</v-list-item-title>
                        </v-list-item>

                    </v-list>

                </v-card>
            </v-menu>
        </div>

    </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import pb from '@/pocketbase/pocketbase';
import { useRouter } from 'vue-router';
import logo from '@/assets/logo-app-bar.jpeg';

const userStore = useUserStore();
const menu = ref(false);
const logoImage = ref(logo);

const router = useRouter();

// const navigateToStats = () => {
//     menu.value = !menu.value
//     router.push('/statistics');
// };

// const navigateToHome = () => {
//     router.push('/home');
// };

const logout = async () => {
    const userStore = useUserStore();

    pb.authStore.clear();
    userStore.$reset();
    localStorage.clear();

    await router.replace({ path: '/login' });
    await router.push({ path: '/login' });
};

// TODO https://router.vuejs.org/guide/advanced/meta.html
// TODO https://router.vuejs.org/guide/essentials/nested-routes.html


</script>

<style scoped>
.outlined-btn {
    border: 1px solid black !important;
    color: black !important;
}

.custom-divider {
    background-color: black;
}

.minidenticon-svg {
    height: 60px;
    width: 60px;
    margin-right: 10px;
}
</style>