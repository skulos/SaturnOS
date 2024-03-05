<template>
    <v-app>

        <ApplicationBar />

        <v-navigation-drawer expand-on-hover rail fixed permanent :width="250">

            <v-list>
                <v-list-item v-for="department in departments" :key="department.value" :prepend-icon="department.icon"
                    :title="department.title" :value="department.value" :color="department.colour" style=""
                    class="rounded-pill non-selectable" @click="navigateToDepartment(department.value)"></v-list-item>
            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-list>
                        <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" class="rounded-pill"
                            @click="logout"></v-list-item>
                    </v-list>
                </div>
            </template>

        </v-navigation-drawer>
        <v-main>
            <v-container fluid class="scrollable-container">
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
.scrollable-container {
    max-height: calc(100vh - 64px);
    overflow-y: auto;
}
</style>
  
<script setup>
import ApplicationBar from '@/components/ApplicationBar.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import pb from '@/pocketbase/pocketbase';
import Colors from '@/utils/colours';

const router = useRouter();
const userStore = useUserStore();

const departments = [
    { icon: 'mdi-currency-usd', title: 'Billing & Revenue', value: 'billingRevenue', colour: Colors.BILLINGREVENUE },
    { icon: 'mdi-package-variant-closed', title: 'Distribution', value: 'distribution', colour: Colors.DISTRIBUTION },
    // { icon: 'mdi-account-multiple', title: 'Marketing', value: 'marketing', colour: Colors.MARKETING },
    { icon: 'mdi-bullhorn', title: 'Marketing', value: 'marketing', colour: Colors.MARKETING },
    { icon: 'mdi-account-plus', title: 'Onboarding', value: 'onboarding', colour: Colors.ONBOARDING },
    { icon: 'mdi-code-braces', title: 'Product', value: 'product', colour: Colors.PRODUCT },
    { icon: 'mdi-cash-register', title: 'Sales', value: 'sales', colour: Colors.SALES },
    { icon: 'mdi-phone', title: 'Support', value: 'support', colour: Colors.SUPPORT },
];

const navigateToDepartment = (departmentValue) => {
    router.push({ path: departmentValue });
};

const logout = async () => {

    pb.authStore.clear();
    userStore.$reset();
    localStorage.clear();

    // router.
    // TODO: router reset

    await router.replace({ path: '/login' });
    await router.push({ path: '/login' });
};

</script>



          <!-- <v-list> -->
            <!-- <v-list-item :title="userStore.name" :subtitle="userStore.username">
                    <template #prepend-avatar>
                    <v-avatar size="60">
                        <minidenticon-svg :username="userStore.username" class="minidenticon-svg"></minidenticon-svg>
                    </v-avatar>
                </template></v-list-item> -->
            <!-- <v-row no-gutters>
                    <v-avatar size="60">
                        <minidenticon-svg :username="userStore.username" class="minidenticon-svg"></minidenticon-svg>
                    </v-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ userStore.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ userStore.username }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-row> -->
            <!-- </v-list> -->

            <!-- <v-divider :thickness="2" color="red" style="background-color: black;"
                        class="custom-divider border-opacity-100"></v-divider>

                    <v-list rounded>

                        <v-list-item @click="navigateToStats" class="rounded-pill">
                            <template v-slot:prepend>
                                <v-icon>mdi-chart-bar</v-icon>
                            </template>
                            <v-list-item-title class="non-selectable">Statistics</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="logout" class="rounded-pill">
                            <template v-slot:prepend>
                                <v-icon>mdi-logout</v-icon>
                            </template>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>

                    </v-list> -->

