<template>
    <data-table/>
</template>

<script setup>
import DataTable from '@/components/table/CustomersTable.vue';
</script>



<!-- <template>
    <v-container fluid class="fill-height tw-bg-gray-200">
        <h1>Customers Page</h1>
    </v-container>
</template> -->

<!-- <template>
    <v-app>
        <v-btn @click="openDialog">Add Supplier</v-btn>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>Add Supplier</v-card-title>
                <v-card-text>
                    <v-text-field v-model="name" label="Name"></v-text-field>
                    <v-text-field v-model="email" label="Email"></v-text-field>
                    <v-text-field v-model="accountType" label="Account Type"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="createSupplier">Add</v-btn>
                    <v-btn @click="closeDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table :headers="this.headers" :items="suppliers"></v-data-table>
    </v-app>
</template>

<script>
import { Supplier, Suppliers}  from '@/models/suppliers';
// import Supplier from '@/models/suppliers';

// const suppliers = Suppliers;

export default {
    name: 'SupplierManagement',
    data() {
        return {
            handler: new Suppliers(),
            dialog: false,
            name: '',
            email: '',
            accountType: '',
            suppliers: [],
            headers: [
                { title: 'Name', key: 'name', align: 'start' },
                { title: 'Email', key: 'email' },
                { title: 'Account Type', key: 'accountType' },
                { title: 'Active', key: 'active' },
                { title: 'Actions', key: 'actions', sortable: false },
            ]
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        async createSupplier() {
            // const supplier = Supplier(
            //     name: this.name,
            //     email: this.email,
            //     accountType: this.accountType,
            //     active: true // Set active to true
            // };
            
            const supplier = new Supplier(this.name, this.email, true, this.accountType)
            console.log('Supplier', supplier);

            try {
                await this.handler.createSupplier(supplier);
                this.closeDialog();
                this.loadSuppliers();
            } catch (error) {
                console.error('Error creating supplier:', error);
            }
        },
        async loadSuppliers() {
            try {
                const suppliers = await this.handler.readSuppliers();
                this.suppliers = suppliers;
            } catch (error) {
                console.error('Error loading suppliers:', error);
            }
        }
    },
    created() {
        this.loadSuppliers();
    }
};
</script> -->

