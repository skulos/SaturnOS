<template>
    <v-app>

        <v-navigation-drawer expand-on-hover rail fixed permanent :width="250"
            style="background-color: #1f2937; color: white;">

            <v-list-item :prepend-avatar="dashboard" title="Dashboard" value="dashboard" @click="navigateToHome"
                class="tw-text-white tw-mt-6 tw-mb-4 rounded-pill">
            </v-list-item>

            <v-divider></v-divider>

            <!-- <v-list>
                <v-list-item v-for="department in departments" :key="department.value" :prepend-icon="department.icon"
                    :title="department.title" :value="department.value" :color="department.colour" style=""
                    class="rounded-pill non-selectable" @click="navigateToDepartment(department.value)"></v-list-item>
            </v-list> -->

            <v-list>

                <!-- Department: Accounts -->
                <v-list-item :key="'accounts'" prepend-icon="mdi-book-open-page-variant" title="Accounts"
                    value="accounts" class="rounded-pill non-selectable" @click="navigateToDepartment('accounts')">
                </v-list-item>

                <!-- Department: Bank -->
                <v-list-item :key="'bank'" prepend-icon="mdi-bank" title="Bank" value="bank"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('bank')">
                </v-list-item>

                <!-- Department: Bills -->
                <v-list-item :key="'bills'" prepend-icon="mdi-currency-usd" title="Bills" value="bills"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('bills')">
                </v-list-item>

                <!-- Department: Payments -->
                <v-list-item :key="'bills'" prepend-icon="mdi-cash" title="Payments" value="payments"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('payments')">
                </v-list-item>

                <v-divider class="tw-mb-4 tw-mt-4"></v-divider>

                <!-- Department: Barcodes -->
                <v-list-item :key="'barcodes'" prepend-icon="mdi-barcode-scan" title="Barcodes" value="barcodes"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('barcodes')">
                </v-list-item>

                <!-- Department: Reports -->
                <v-list-item :key="'reports'" prepend-icon="mdi-file-document" title="Reports" value="reports"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('reports')">
                </v-list-item>

                <!-- Department: Statistics -->
                <v-list-item :key="'statistics'" prepend-icon="mdi-chart-line" title="Statistics" value="statistics"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('statistics')">
                </v-list-item>

                <v-divider class="tw-mb-4 tw-mt-4"></v-divider>

                <!-- Department: Customers -->
                <v-list-item :key="'customers'" prepend-icon="mdi-account-multiple" title="Customers" value="customers"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('customers')">
                </v-list-item>

                <!-- Department: Suppliers -->
                <v-list-item :key="'suppliers'" prepend-icon="mdi-account-box-outline" title="Suppliers"
                    value="suppliers" class="rounded-pill non-selectable" @click="navigateToDepartment('suppliers')">
                </v-list-item>

                <v-divider class="tw-mb-4 tw-mt-4"></v-divider>

                <!-- Department: Products -->
                <v-list-item :key="'product'" prepend-icon="mdi-shopping" title="Products" value="product"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('product')">
                </v-list-item>

                <!-- Department: Stock Control -->
                <v-list-item :key="'stockcontrol'" prepend-icon="mdi-package-variant-closed" title="Stock Control"
                    value="stockcontrol" class="rounded-pill non-selectable"
                    @click="navigateToDepartment('stockcontrol')">
                </v-list-item>

                <!-- Department: Sales -->
                <v-list-item :key="'sales'" prepend-icon="mdi-cash-register" title="Sales" value="sales"
                    class="rounded-pill non-selectable" @click="navigateToDepartment('sales')">
                </v-list-item>

            </v-list>

            <template v-slot:append>
                <div class="pa-2 ">

                    <div class="text-center tw-mb-4">
                        <span class="tw-text-s  tw-text-gray-500 tw-mr-10 non-selectable">v 0.0.1</span>
                    </div>

                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" class="rounded-pill"
                            @click="logout"></v-list-item>
                    </v-list>
                </div>
            </template>

        </v-navigation-drawer>

        <ApplicationBar />
        <v-main>

            <v-container fluid class="scrollable-container">
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.scrollable-container {
    max-height: calc(100vh - 64px);
    overflow-y: auto;
}
</style>

<script setup>
import ApplicationBar from '@/components/appbar/ApplicationBar.vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import pb from '@/pocketbase/pocketbase';
import dashboard from '@/assets/dashboard.png';

const router = useRouter();
const userStore = useUserStore();

const navigateToDepartment = (departmentValue) => {
    router.push({ path: departmentValue });
};

const logout = async () => {

    pb.authStore.clear();
    userStore.$reset();
    localStorage.clear();

    await router.replace({ path: '/login' });
    await router.push({ path: '/login' });
};

const navigateToHome = () => {
    router.push('/home');
};

// const departments = [
//   { icon: 'mdi-book-open-page-variant', title: 'Accounts', value: 'accounts', showDivider: true },
//   { icon: 'mdi-bank', title: 'Bank', value: 'bank' },
//   { icon: 'mdi-currency-usd', title: 'Bills', value: 'bills' },
//   { icon: 'mdi-cash', title: 'Payments', value: 'payments', showDivider: true },
//   { icon: 'mdi-barcode-scan', title: 'Barcodes', value: 'barcodes' },
//   { icon: 'mdi-file-document', title: 'Reports', value: 'reports' },
//   { icon: 'mdi-chart-line', title: 'Statistics', value: 'statistics', showDivider: true },
//   { icon: 'mdi-account-multiple', title: 'Customers', value: 'customers' },
//   { icon: 'mdi-account-box-outline', title: 'Suppliers', value: 'suppliers', showDivider: true },
//   { icon: 'mdi-package-variant-closed', title: 'Stock Control', value: 'stockcontrol' },
//   { icon: 'mdi-cash-register', title: 'Sales', value: 'sales' }
// ];

// const filteredDepartments = ref([]);

// // Filter out the departments that don't need dividers
// for (let i = 0; i < departments.length; i++) {
//   if (departments[i].showDivider) {
//     departments[i].showDivider = false;
//     filteredDepartments.value.push(departments[i]);
//   } else {
//     filteredDepartments.value.push(departments[i]);
//   }
// }

// const avatar = document.querySelector('.v-list-item__avatar img');
// avatar.style.filter = 'invert(100%)';

// const departments = [
//     //  { icon: 'mdi-home', title: 'Dashboard', }, // variant="text" icon="mdi-home" @click="navigateToHome"

//     { icon: 'mdi-book-open-page-variant', title: 'Accounts', value: 'accounts', colour: Colors.ONBOARDING },
//     { icon: 'mdi-currency-usd', title: 'Bills', value: 'Bills', colour: Colors.BILLINGREVENUE },
//     { icon: 'mdi-barcode-scan', title: 'Barcodes', value: 'barcodes', colour: Colors.SALES },
//     { icon: 'mdi-account-multiple', title: 'Customers', value: 'customers', colour: Colors.MARKETING },
//     { icon: 'mdi-account-box-outline', title: 'Suppliers', value: 'suppliers', colour: Colors.SALES },
//     { icon: 'mdi-file-document', title: 'Reports', value: 'reports', colour: Colors.PRODUCT },
//     { icon: 'mdi-package-variant-closed', title: 'Stock Control', value: 'stockcontrol', colour: Colors.DISTRIBUTION },
//     { icon: 'mdi-chart-line', title: 'Statistics', value: 'statistics', colour: Colors.SUPPORT },

//     // Suppliers
//     // mdi-account-card-details


//     { icon: 'mdi-cash-register', title: 'Sales', value: 'sales', colour: Colors.SALES },
// ];

// const groups = [
//     {
//         title: 'Accounting',
//         icon: 'mdi-accounting',
//         items: [
//             { icon: 'mdi-book-open-page-variant', title: 'Accounts', value: 'accounts', colour: Colors.ONBOARDING },
//             { icon: 'mdi-currency-usd', title: 'Bills', value: 'Bills', colour: Colors.BILLINGREVENUE }
//         ]
//     },
//     {
//         title: 'Manage',
//         icon: 'mdi-cash-register',
//         items: [
//             { icon: 'mdi-barcode-scan', title: 'Barcodes', value: 'barcodes', colour: Colors.SALES },
//             { icon: 'mdi-account-multiple', title: 'Customers', value: 'customers', colour: Colors.MARKETING },
//             { icon: 'mdi-account-box-outline', title: 'Suppliers', value: 'suppliers', colour: Colors.SALES }
//         ]
//     },
//     // Add more groups as needed
// ];

// const groups = [
//     {
//         title: 'Accounting',
//         icon: 'mdi-accounting',
//         items: [
//             { title: 'Accounts', value: 'accounts', colour: Colors.ONBOARDING },
//             { title: 'Bills', value: 'Bills', colour: Colors.BILLINGREVENUE }
//         ]
//     },
//     {
//         title: 'Sales',
//         icon: 'mdi-cash-register',
//         items: [
//             { title: 'Barcodes', value: 'barcodes', colour: Colors.SALES },
//             { title: 'Customers', value: 'customers', colour: Colors.MARKETING },
//             { title: 'Suppliers', value: 'suppliers', colour: Colors.SALES }
//         ]
//     },
//     // Add more groups as needed
// ];


</script>