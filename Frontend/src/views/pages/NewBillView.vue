<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">New Bill</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-autocomplete cols="6" :items="supplierList" variant="outlined" v-model="supplier"
              label="Supplier"></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="supplierRef" variant="outlined" label="Supplier Reference"></v-text-field>
          </v-col>
          <v-col cols="6">
            <div class="input-wrapper">
              <input type="date" v-model="issueDate" required
                class="border tw=border-4 tw-border-black tw-rounded-md tw-px-3 tw-py-4 focus:tw-outline-black focus:tw-border-black">
            </div>
          </v-col>
          <v-col cols="6">
            <v-select cols="6" :items="['CASH', 'EFT', 'CARD']" variant="outlined" v-model="paymentMethod"
              label="Payment Method"></v-select>
          </v-col>
        </v-row>

        <!-- Product Section -->
        <v-row>

          <v-col cols="3">
            <v-autocomplete :items="productList" label="Select Product" item-text="name" item-value="id"
              v-model="selectedProduct" variant="outlined"></v-autocomplete>

          </v-col>
          <v-col cols="3">
            <v-text-field v-model="qty" label="Quantity" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="cost" label="Cost" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="price" label="Price" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="black" @click="addProduct">Add Product</v-btn>
          </v-col>
        </v-row>

        <!-- List view of added products -->
        <!-- <v-row>
          <v-col cols="12">
            <v-data-table :items="addedProducts" :headers="productHeaders" dense class="elevation-2">
              <template v-slot:item="{ item }">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-center">{{ item.cost }}</td>
                <td class="text-center">{{ item.price }}</td>
              </template>
</v-data-table>
</v-col>
</v-row> -->


      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="black" class="tw-mr-5" @click="close">
        Cancel
      </v-btn>
      <v-btn color="black" class="tw-mr-5" @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-divider class="tw-mt-8"></v-divider>

  <!-- <v-data-table :items="addedProducts" :headers="headers" > -->
  <!-- <template v-slot:item="{ item }">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-center">{{ item.cost }}</td>
                <td class="text-center">{{ item.price }}</td>
              </template> -->


  <!-- </v-data-table> -->

  <v-data-table :headers="headers" :items="data">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Products List</v-toolbar-title>
      </v-toolbar>
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
</style>

<script>
import { useBillsStore } from '@/stores/billsStore.js';
import { useSuppliersStore } from '@/stores/suppliersStore.js';
import { useProductsStore } from '@/stores/productStore.js';
import Stock from '@/models/stock';

export default {
  data: () => ({
    headers: [
      { title: 'Code', key: 'code', align: 'start' },
      { title: 'Name', key: 'name' },
      { title: 'QTY', key: 'qty' },
      { title: 'Cost', key: 'cost' },
      { title: 'Price', key: 'price'},
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
      return this.addedProducts;
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

        console.log("product = ", product)
        console.log("id = ", id)
        console.log("name = ", name)

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
