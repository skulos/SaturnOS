<template>

    <v-card title="Search For Expense" flat class="tw-mt-6">
        <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template>
    </v-card>

    <div class="tw-mb-10"></div>

    <div v-if="dataLoaded">

        <v-data-table :headers="headers" :items="data" :search="search">
            <template v-slot:top>
                <v-toolbar flat class="toolbar-background">

                    <v-toolbar-title class="tw-text-white">Expense List</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="750px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="white" dark v-bind="props">
                                New Expense
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title>
                                <span class="text-h5">New Expense</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <!-- <v-col cols="6">
                                        <v-text-field v-model="customerName" variant="outlined"
                                            label="Expense Name"></v-text-field>
                                    </v-col> -->
                                        <v-col cols="6">
                                            <v-text-field prefix="R" v-model="expenseAmount" label="Amount"
                                                variant="outlined"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="expenseAccount" variant="outlined"
                                                label="Expense Account"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="assetAccount" variant="outlined"
                                                label="Paid From"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="black" variant="text" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="black" variant="text" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" class="tw-text-center" max-width="650px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete {{ supplierName
                                }}?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="black" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="black" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>

            <!-- <template v-slot:item.pay_from="{ item }">
            {{ accountStore.getAccountNameById(item.pay_from) }}
        </template> -->

            <!-- <template v-slot:item.expense_account="{ item }">
            {{ accountStore.getAccountNameById(item.expense_account) }}
        </template> -->

        </v-data-table>
    </div>
</template>

<style scoped>
.toolbar-background {
    background-color: #1f2937;
}
</style>


<script>
import { useExpensesStore } from '@/stores/expenseStore.js';
import { useAccountsStore } from '@/stores/accountsStore.js';
import Expense from '@/models/expense';


export default {
    data: () => ({
        headers: [
            { title: 'Expense', key: 'expense_account', align: 'start' },
            { title: 'Paying From', key: 'pay_from', align: 'start' },
            { title: 'Amount (R)', key: 'amount' },
            { title: 'Paid', key: 'paid', sortable: false }
        ],
        expenseStore: useExpensesStore(),
        accountStore: useAccountsStore(),
        search: '',
        dataLoaded: false,
        dialog: false,
        dialogDelete: false,
        expenseAmount: 0,
        assetAccount: '',
        expenseAccount: '',
        editedExpsense: false,
    }),

    computed: {
        data() {
            const newExpenses = []
            const expenses = this.expenseStore.expenses

            expenses.forEach((element) => {
                const expense = new Expense(this.accountStore.getAccountNameById(element.expense_account), this.accountStore.getAccountNameById(element.pay_from), element.amount, element.paid)
                newExpenses.push(expense)
            })

            return newExpenses
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    async created() {
        await this.expenseStore.readExpenses();
        await this.accountStore.readAccounts();
        this.dataLoaded = true
    },

    methods: {

        editItem(item) {
            this.customerId = item.id
            this.customerName = item.name


            this.editedCustomer = true
            this.dialog = true
        },

        deleteItem(item) {
            this.customerId = item.id
            this.customerName = item.name
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            await this.customerStore.deleteCustomer(this.customerId);

            this.customerId = '';
            this.customerName = '';

            this.closeDelete()
        },

        close() {
            this.customerId = '';
            this.customerName = '';

            this.dialog = false
            this.editedCustomer = false
        },

        closeDelete() {
            this.dialogDelete = false
        },

        async save() {

            if (this.editedCustomer == false) {
                await this.customerStore.createCustomerFromData(this.customerName);
            } else {
                await this.customerStore.updateCustomer(this.customerId, this.customerName);
            }

            this.customerId = '';
            this.customerName = '';

            this.close()
        },
    },
}
</script>
