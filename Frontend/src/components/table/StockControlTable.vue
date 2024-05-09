<template>

  <v-card title="Search For Stock" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>
  </v-card>

  <div class="tw-mb-10"></div>
  <!-- Add a stock status here, also I would like a comprehensive list. Maybe use tabs here to switch between the summart and full list -->

  <v-data-table :headers="headers" :items="data" :search="search">

    <template v-slot:[`item.bill`]="{ item }">
      <router-link :to="`/bills/${item.bill}`">{{ item.bill.toUpperCase() }}</router-link>
    </template>

    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>Stock List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="black" dark v-bind="props">
              Stock take
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

        <v-dialog v-model="dialogDelete" class="tw-text-center" max-width="650px" >
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


<script>
import { useStockItemsStore } from '@/stores/stockStore.js';

export default {
  data: () => ({
    // headers: [
    //   { title: 'Code', key: 'code', align: 'start' },
    //   { title: 'Name', key: 'name', align: 'start' },
    //   { title: 'Cost', key: 'cost' },
    //   { title: 'Price', key: 'price' },
    //   { title: 'Sold', key: 'sold' }
    // ],
    headers: [
      { title: 'Code', key: 'code', align: 'start' },
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'QTY', key: 'qty' },
      { title: 'Cost', key: 'cost' },
      { title: 'Price', key: 'price' },
      { title: 'Bill ID', key: 'bill' },
      { title: 'Remaining', key: 'remaining' },
      { title: 'Sold Out', key: 'sold_out' }
    ],
    stockStore: useStockItemsStore(),
    search: '',
    dialog: false,
    dialogDelete: false,
    id: '',
    code: '',
    name: '',
    bill: '',
    qty: 0.00,
    cost: 0.00,
    remaining: 0.00,
    price: 0.00,
    editedStockItem: false,
  }),

  computed: {
    data() {
      return this.stockStore.stockItems;
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
    await this.stockStore.readStockItems();
  },

  methods: {

    // editItem(item) {
    //   this.customerId = item.id
    //   this. customerName = item.name


    //   this.editedCustomer = true
    //   this.dialog = true
    // },

    // deleteItem(item) {
    //   this.customerId = item.id
    //   this.customerName = item.name
    //   this.dialogDelete = true
    // },

    // async deleteItemConfirm() {
    //   await this.customerStore.deleteCustomer(this.customerId);

    //   this.customerId = '';
    //   this.customerName = '';

    //   this.closeDelete()
    // },

    // close() {
    //   this.customerId = '';
    //   this.customerName = '';
      
    //   this.dialog = false
    //   this.editedCustomer = false
    // },

    // closeDelete() {
    //   this.dialogDelete = false
    // },

    // async save() {

    //   if (this.editedCustomer == false) {
    //     await this.customerStore.createCustomerFromData(this.customerName);
    //   } else {
    //     await this.customerStore.updateCustomer(this.customerId, this.customerName);
    //   }

    //   this.customerId = '';
    //   this.customerName = '';

    //   this.close()
    // },
  },
}
</script>