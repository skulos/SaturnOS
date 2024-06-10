<template>

  <v-card title="Search For Bills" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>
  </v-card>

  <div class="tw-mb-10"></div>

  <v-data-table :headers="headers" :items="data" :search="search">

    <template v-slot:[`item.id`]="{ item }">
      <router-link :to="`/bills/${item.id}`">{{ item.id.toUpperCase() }}</router-link>
    </template>

    <!-- TODO: add chips for payment types too -->
    <template v-slot:[`item.payed`]="{ value }">
      <v-chip variant="flat" :color="paymentColour(value)" class="payment-status-chip">
        {{ paymentStatus(value) }}
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar flat class="toolbar-background">

        <v-toolbar-title class="tw-text-white">Bill List</v-toolbar-title>
        <!-- <v-divider class="mx-4 bg-divider-transparent" inset vertical hidden></v-divider> -->
        <v-spacer></v-spacer>

        <v-btn color="white" dark @click="navigate">
          New Bill
        </v-btn>

        <v-dialog v-model="dialogDelete" class="tw-text-center" max-width="650px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete {{ id }}?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" @click="closeDelete">Cancel</v-btn>
              <v-btn color="black" @click="deleteItemConfirm">OK</v-btn>
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
.input-wrapper {
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  box-sizing: border-box;
}

.toolbar-background {
  background-color: #1f2937;
}

.bg-divider-transparent {
  background-color: transparent;
}

.payment-status-chip {
  color: black !important;
}
</style>

<script>
import { useBillsStore } from '@/stores/billsStore.js';
import { useSuppliersStore } from '@/stores/suppliersStore.js';
import { useProductsStore } from '@/stores/productStore.js';
import Stock from '@/models/stock';
import { useRouter } from 'vue-router';



export default {
  data: () => ({
    headers: [
      { title: 'Id', key: 'id', align: 'start' },
      { title: 'Supplier', key: 'expanded.supplier.name', align: 'start' },
      { title: 'Suppler Reference', key: 'supplier_ref' },
      { title: 'Issued Date', key: 'issue_date' },
      { title: 'Payment Method', key: 'payment_method' },
      { title: 'Payment Status', key: 'payed' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    productHeaders: [
      { title: 'Code', key: 'code', align: 'start' },
      { title: 'Name', key: 'name' },
      { title: 'QTY', key: 'qty', align: 'center' },
      { title: 'Cost', key: 'cost', align: 'center' },
      { title: 'Price', key: 'price', align: 'center' },

    ],
    billStore: useBillsStore(),
    supplierStore: useSuppliersStore(),
    productStore: useProductsStore(),
    selectedProduct: null,
    supplierMap: {},
    productMap: {},
    search: '',
    dialog: false,
    dialogDelete: false,
    id: '',
    supplier: '',
    supplierRef: '',
    issueDate: new Date().toISOString().slice(0, 10),
    paymentMethod: 'CASH',
    payed: false,
    products: [],
    addedProducts: [],
    qty: 0,
    cost: 0,
    price: 0,
    editedBill: false,
  }),

  computed: {

    data() {
      return this.billStore.bills;
    },
    supplierList() {
      return this.supplierStore.suppliers.map((supplier) => supplier.name);
    },
    productList() {
      return this.productStore.products.map((product) => product.code);
    },
    formTitle() {
      return this.id === '' ? 'New Bill' : 'Edit Bill'
    },
    formattedIssueDate() {
      if (this.issueDate) {
        const date = new Date(this.issueDate)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      }
      return ''
    },
    issueDateString() {
      return this.issueDate + ' 00:00:00.000Z';
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
    await this.billStore.readBills();
    await this.supplierStore.readSuppliers();
    await this.productStore.readProducts();

    this.supplierMap = this.supplierStore.suppliers.reduce((map, supplier) => {
      map[supplier.name] = supplier.id;
      return map;
    }, {});

    this.productMap = this.productStore.products.reduce((map, product) => {
      map[product.code] = { id: product.id, name: product.name };
      return map;
    }, {});
  },

  methods: {

    addProduct() {
      if (this.selectedProduct && this.qty > 0 && this.cost > 0 && this.price > 0) {
        const name = this.productMap[this.selectedProduct].name
        const product = new Stock(this.selectedProduct, name, parseFloat(this.cost), parseFloat(this.price))
        const id = this.productMap[this.selectedProduct].id

        this.addedProducts.push({
          id: id,
          code: this.selectedProduct,
          name: name,
          qty: parseInt(this.cost),
          cost: parseFloat(this.cost),
          price: parseFloat(this.price)
        })

        this.selectedProduct = null;
        this.qty = 0;
        this.cost = 0;
        this.price = 0;

      }
    },

    paymentStatus(val) {
      if (val) return 'Paid'
      else return 'Unpaid'
    },

    navigate() {
      this.$router.push('/bills/new')
    },

    paymentColour(value) {
      if (value) return 'green'
      else return 'red'
    },

    editItem(item) {
      this.id = item.id
      this.supplier = item.supplier
      this.supplierRef = item.supplierRef
      this.issueDate = item.issueDate
      this.paymentMethod = item.paymentMethod
      this.products = item.products

      this.editedBill = true
      this.dialog = true
    },

    deleteItem(item) {
      this.id = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.billStore.deleteBill(this.id);
      this.id = '';
      this.closeDelete();
    },

    close() {
      this.id = '';
      this.supplier = '';
      this.paymentMethod = 'CASH';

      this.dialog = false
      this.editedBill = false
    },

    closeDelete() {
      this.dialogDelete = false
    },

    async save() {

      if (this.editedBill == false) {
        await this.billStore.createBillFromData(this.supplierMap[this.supplier], this.supplierRef, this.issueDateString, this.paymentMethod.toLowerCase(), this.payed, this.products);
      } else {
        await this.billStore.updateBill(this.id, this.supplier, this.supplierRef, this.issueDateString, this.paymentMethod.toLowerCase(), this.payed, this.products);
      }

      this.id = '';

      this.close()
    },
  },
}
</script>
