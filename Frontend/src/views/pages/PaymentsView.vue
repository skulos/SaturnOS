<template>
    <v-container fluid class="fill-height tw-bg-gray-200">
        <h1 class="tw-text-center">Payments Page</h1>
    </v-container>
    <v-row>
        <v-col>
            <v-row>
                <v-col cols="4">
                    <v-card rounded height="170" class="tw-mt-4" elevation="6" color="#4f688c">
                        <v-card-title class="text-h5">Bills Unpaid</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-mt-4 tw-text-center">
                            <div v-if="unpaidBillsCountLoaded" class="tw-text-5xl">{{ billCount }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="8">
                    <v-card rounded height="170" class="tw-mt-4" elevation="6" color="#323b49">
                        <v-card-title class="text-h5">Total Bill Amount Due</v-card-title>
                        <v-divider></v-divider>

                        <!-- <v-card-text class="tw-mt-4 tw-text-center">
                            <div class="tw-text-5xl">{{ billStore.unpaidAmount }}</div>
                        </v-card-text> -->

                        <!-- <v-card-text class="tw-text-center">
                            <money :amount=billStore.unpaidAmount class="tw-text-5xl tw-text-center" />
                        </v-card-text> -->


                        <v-card-text class="tw-text-center">
                            <div v-if="unpaidBillsAmountLoaded">
                                <money :amount="billAmount" class="tw-text-5xl tw-text-center" />
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card rounded height="170" class="tw-mb-4" elevation="6" color="#464e5b">
                        <v-card-title class="text-h5">Expenses Loaded</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-mt-4 tw-text-center">
                            <div v-if="unpaidExpensesCountLoaded" class="tw-text-5xl">{{ expenseCount }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="8">
                    <v-card rounded height="170" class="tw-mb-4" elevation="6" color="#374961">
                        <v-card-title class="text-h5">Total Expenses Payable</v-card-title>
                        <v-divider></v-divider>

                        <!-- <v-card-text class="tw-text-center">
                            <money :amount=1230.05 class="tw-text-5xl tw-text-center" />
                        </v-card-text> -->

                        <v-card-text class="tw-text-center">
                            <div v-if="unpaidExpensesAmountLoaded">
                                <money :amount="expenseAmount" class="tw-text-5xl tw-text-center" />
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-col>

        <v-col cols="2">
            <v-row>

                <!-- <v-col cols="12" class="tw-mt-6 text-center">
                    <v-btn elevation="6" width="250" height="50" color="#111D1D">Pay A Bill</v-btn>
                </v-col> -->

                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#111D1D">Pay Expense</v-btn>
                </v-col> -->

                <!-- Blue -->
                <!-- <v-col cols="12" class="tw-mt-6 text-center tw-text-black">
                    <v-btn elevation="6" width="250" height="50" color="#3C91E6" class="text-black">Pay A Bill</v-btn>
                </v-col> -->

                <v-col cols="12" class="tw-mt-6 text-center tw-text-black">
                    <v-btn elevation="6" width="250" height="50" color="#3A3E3B">Pay A Bill</v-btn>
                </v-col>



                <!-- Orange -->
                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#FA824C" class="text-black">Pay Expense</v-btn>
                </v-col> -->

                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#8A95A5" class="text-black">Pay Expense</v-btn>
                </v-col> -->

                <v-col cols="12" class="text-center tw-mt-8">
                    <v-btn elevation="6" width="250" height="50" color="#820933">Pay Expense</v-btn>
                </v-col>

            </v-row>
        </v-col>

    </v-row>

    <data-table />

</template>


<script>
// import DataTable from '@/components/table/ExpensesTable.vue';
import DataTable from '@/components/table/PaymentsTable.vue';
import Money from '@/components/MoneyText.vue';
import { useBillsStore } from '@/stores/billsStore.js';
import { useExpensesStore } from '@/stores/expenseStore.js';

export default {
    components: {
        DataTable,
        Money
    },
    data: () => ({
        billStore: useBillsStore(),
        expenseStore: useExpensesStore(),
        unpaidBillsCountLoaded: false,
        unpaidBillsAmountLoaded: false,
        unpaidExpensesCountLoaded: false,
        unpaidExpensesAmountLoaded: false
    }),
    async created() {
        await this.billStore.readBills();
        this.unpaidBillsCountLoaded = true
        this.unpaidBillsAmountLoaded = true

        await this.expenseStore.readExpenses();
        this.unpaidExpensesCountLoaded = true
        this.unpaidExpensesAmountLoaded = true
    },
    computed: {
        billCount() {
            return this.billStore.getUnpaidBillCount;
        },
        billAmount() {
            return this.billStore.getUnpaidBillAmount;
        },
        expenseCount() {
            return this.expenseStore.getUnpaidExpenseCount;
        },
        expenseAmount() {
            return this.expenseStore.getUnpaidExpenseAmount;
        }
    }
}
</script>