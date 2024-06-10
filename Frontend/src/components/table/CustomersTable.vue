<template>

  <v-card title="Search For Customer" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>
  </v-card>

  <div class="tw-mb-10"></div>

  <v-data-table :headers="headers" :items="data" :search="search">
    <template v-slot:top>
      <v-toolbar flat class="toolbar-background">

        <v-toolbar-title class="tw-text-white">Customer List</v-toolbar-title>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="white" dark v-bind="props">
              New Customer
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="customerName" variant="outlined" label="Customer Name"></v-text-field>
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
            <v-card-title class="text-h5">Are you sure you want to delete {{ supplierName }}?</v-card-title>
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
  </v-data-table>

</template>

<style scoped>
.toolbar-background {
  background-color: #1f2937;
}
</style>


<script>
import { useCustomersStore } from '@/stores/customersStore.js';

export default {
  data: () => ({
    headers: [
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Active', key: 'active' },
      { title: 'Amount', key: 'amount' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    customerStore: useCustomersStore(),
    search: '',
    dialog: false,
    dialogDelete: false,
    customerId: '',
    customerName: '',
    editedCustomer: false,
  }),

  computed: {
    data() {
      return this.customerStore.customers;
    },
    formTitle() {
      return this.editedIndex === '' ? 'New Customer' : 'Edit Customer'
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
    await this.customerStore.readCustomers();
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