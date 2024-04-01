<template>

  <v-card title="Search For Products" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>
  </v-card>

  <div class="tw-mb-10"></div>

  <v-data-table :headers="headers" :items="data" :search="search">
    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>Product List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="black" dark v-bind="props">
              New Product
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
                    <v-text-field v-model="uppercaseCode" variant="outlined" label="Code"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="name" variant="outlined" label="Name"></v-text-field>
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
import { useProductsStore } from '@/stores/productStore.js';

export default {
  data: () => ({
    headers: [
      { title: 'Code', key: 'code', align: 'start' },
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Active', key: 'active' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    productStore: useProductsStore(),
    search: '',
    dialog: false,
    dialogDelete: false,
    id: '',
    name: '',
    code: '',
    active: true,
    editedProduct: false,
  }),

  computed: {
    data() {
      return this.productStore.products;
    },
    formTitle() {
      return this.id === '' ? 'New Product' : 'Edit Product'
    },
    uppercaseCode: {
      get() {
        return this.code.toUpperCase();
      },
      set(value) {
        // You can choose to handle setting the original value here if necessary
        this.code = value;
      }
    }
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
    await this.productStore.readProducts();
  },

  methods: {

    editItem(item) {
      this.id = item.id
      this.name = item.name
      this.code = item.code

      this.editedProduct = true
      this.dialog = true
    },

    deleteItem(item) {
      this.id = item.id
      this.name = item.name
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.productStore.deleteProduct(this.id);

      this.id = '';
      this.name = '';

      this.closeDelete()
    },

    close() {
      this.id = '';
      this.name = '';
      this.code = '';
      
      this.dialog = false
      this.editedProduct = false
    },

    closeDelete() {
      this.dialogDelete = false
    },

    async save() {

      if (this.editedProduct == false) {
        await this.productStore.createProductFromData(this.code, this.name, this.active);
      } else {
        await this.productStore.updateProduct(this.id, this.code, this.name, this.active);
      }

      this.id = '';
      this.name = '';
      this.code = '';
      this.active = true;

      this.close()
    },
  },
}
</script>