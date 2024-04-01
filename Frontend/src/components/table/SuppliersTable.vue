<template>

  <v-card title="Search For Supplier" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>
  </v-card>

  <div class="tw-mb-10"></div>

  <v-data-table :headers="headers" :items="data" :search="search">
    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>Supplier List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="black" dark v-bind="props">
              New Supplier
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
                    <v-text-field v-model="supplierName" variant="outlined" label="Supplier Name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="supplierEmail" variant="outlined" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select cols="12" :items="['CASH', 'EFT', 'ACCOUNT']" variant="outlined"
                      v-model="supplierAccountType" label="Account Type"></v-select>
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
import { useSuppliersStore } from '@/stores/suppliersStore.js';

export default {
  data: () => ({
    headers: [
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Email', key: 'email' },
      { title: 'Account Type', key: 'accountType' },
      { title: 'Active', key: 'active' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    supplierStore: useSuppliersStore(),
    search: '',
    dialog: false,
    dialogDelete: false,
    supplierId: '',
    supplierName: '',
    supplierEmail: '',
    supplierAccountType: '',
    editedSupplier: false,
  }),

  computed: {
    data() {
      return this.supplierStore.suppliers;
    },
    formTitle() {
      return this.supplierId === '' ? 'New Supplier' : 'Edit Supplier'
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
    await this.supplierStore.readSuppliers();
  },

  methods: {

    editItem(item) {
      this.supplierId = item.id
      this.supplierName = item.name
      this.supplierEmail = item.email
      this.supplierAccountType = item.account_type

      this.editedSupplier = true
      this.dialog = true
    },

    deleteItem(item) {
      this.supplierId = item.id
      this.supplierName = item.name
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.supplierStore.deleteSupplier(this.supplierId);

      this.supplierId = '';
      this.supplierName = '';

      this.closeDelete()
    },

    close() {
      this.supplierId = '';
      this.supplierName = '';
      this.supplierEmail = '';
      this.supplierAccountType = '';
      
      this.dialog = false
      this.editedSupplier = false
    },

    closeDelete() {
      this.dialogDelete = false
    },

    async save() {

      if (this.editedSupplier == false) {
        await this.supplierStore.createSupplierFromData(this.supplierName, this.supplierEmail, this.supplierAccountType);
      } else {
        await this.supplierStore.updateSupplier(this.supplierId, this.supplierName, this.supplierEmail, this.supplierAccountType);
      }

      this.supplierId = '';
      this.supplierName = '';
      this.supplierEmail = '';
      this.supplierAccountType = '';

      this.close()
    },
  },
}
</script>