<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">New Supplier</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="supplier.name" label="Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="supplier.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="supplier.accountType" label="Account Type"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="close">
        Cancel
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Supplier, Suppliers } from '@/models/suppliers.js'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    dialogFunction: Function,
  },
  data: () => ({
    supplier: Supplier(
      this.item.name,
      this.item.email,
      true,
      this.item.accountType
    ),
  }),
  methods: {
    async saves() {
      Suppliers.createSupplier(this.supplier);
    },
    close() {
      this.dialogFunction();
    },
  },
};
</script>