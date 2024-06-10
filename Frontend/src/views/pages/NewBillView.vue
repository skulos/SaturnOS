<template>
  <v-row>
    <v-col cols="9">
      <v-card variant="outlined" elevation="8">
        <v-card-title>
          <!-- <span class="text-h5">New Bill</span> -->
          <span class="text-h5">Supplier Details</span>
          <v-divider class="tw-mt-3"></v-divider>

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
                <!-- <div class="input-wrapper">
                  <input type="date" v-model="issueDate" required
                    class="border tw=border-4 tw-border-black tw-rounded-md tw-px-3 tw-py-4 focus:tw-outline-black focus:tw-border-black">
                </div> -->
                <v-text-field v-model="issueDate" type="date" variant="outlined" label="Issue Date"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select cols="6" :items="['CASH', 'EFT', 'CARD']" variant="outlined" v-model="paymentMethod"
                  label="Payment Method"></v-select>
              </v-col>
              <v-col cols="12">
                <v-switch v-model="inclusive" color="#1f2937" label="VAT Inclusive"></v-switch>
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
                <v-text-field prefix="R" v-model="cost" label="Cost" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field prefix="R" v-model="price" label="Price" variant="outlined"></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
            <v-switch v-model="inclusive" color="#1f2937" label="VAT Inclusive"></v-switch>
          </v-col> -->
              <v-col cols="12" class="tw-justify-end tw-flex">
                <v-btn color="#1f2937" @click="addProduct">Add Product</v-btn>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="3">
      <!-- <v-card class="tw-border tw-border-black tw-border-solid tw-rounded-lg tw-shadow-md"> -->
      <v-card variant="outlined" elevation="12">
        <v-card-title>
          <span class="text-h5">Bill Totals</span>
          <v-divider class="tw-mt-2"></v-divider>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-divider class="tw-mt-4"></v-divider>
            <v-col cols="6" class="text-right">
              <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">AMOUNT</label>
            </v-col>
            <v-col cols="6">
              <v-text-field prefix="R" v-model="totalAmount" readonly variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="6" class="text-right">
              <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">VAT</label>
            </v-col>
            <v-col cols="6">
              <v-text-field prefix="R" v-model="totalVat" readonly variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="6" class="text-right">
              <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">TOTAL</label>

            </v-col>
            <v-col cols="6">
              <v-text-field prefix="R" v-model="total" readonly variant="outlined"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <div class="flex tw-mt-12 tw-text-center">
        <v-btn color="#1f2937" class="tw-mr-8" @click="submit">Submit</v-btn>
        <v-btn color="#1f2937" @click="cancel">Cancel</v-btn>
      </div>
    </v-col>
  </v-row>

  <v-divider class="tw-mt-8"></v-divider>

  <!-- <v-card variant="outlined"> -->
  <v-data-table :headers="headers" :items="data">
    <template v-slot:top>
      <v-toolbar flat color="#1f2937" dark="true">
        <v-toolbar-title>Products List</v-toolbar-title>
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
  <!-- </v-card> -->

  <v-divider class="tw-mt-8"></v-divider>

  <!-- Accumulative value card section -->
  <!-- <v-card>
    <v-card-text>
      <v-row>
        <v-divider class="tw-mt-4"></v-divider>
        <v-col cols="8" class="text-right">
          <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">AMOUNT</label>
        </v-col>
        <v-col cols="4">
          <v-text-field prefix="R" v-model="totalAmount" readonly variant="outlined"></v-text-field>
        </v-col>

        <v-col cols="8" class="text-right">
          <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">VAT</label>
        </v-col>
        <v-col cols="4">
          <v-text-field prefix="R" v-model="totalVat" readonly variant="outlined"></v-text-field>
        </v-col>

        <v-col cols="8" class="text-right">
          <label class="tw-justify-end tw-flex tw-text-l tw-align-baseline tw-mt-4">TOTAL</label>

        </v-col>
        <v-col cols="4">
          <v-text-field prefix="R" v-model="total" readonly variant="outlined"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card> -->

  <!-- <div class="flex tw-mt-10 tw-text-end">
    <v-btn color="#1f2937" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Cancel</v-btn>
    <v-btn color="#1f2937" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
  </div> -->

  <v-dialog v-model="dialogDelete" class="tw-text-center" max-width="650px">
    <v-card>
      <v-card-title class="text-h5">Are you sure you want to delete {{ productName }}?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1f2937" variant="text" @click="closeDelete">Cancel</v-btn>
        <v-btn color="#1f2937" variant="text" @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog" max-width="650px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Product</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>

            <!-- <v-col cols="12">
              <v-autocomplete :items="productList" label="Select Product" item-text="name" item-value="id"
                v-model="selectedProduct" variant="outlined"></v-autocomplete>
            </v-col> -->

            <v-col cols="4">
              <v-text-field v-model="qty" label="Quantity" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field prefix="R" v-model="cost" label="Cost" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field prefix="R" v-model="price" label="Price" variant="outlined"></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="black" variant="text" @click="update">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


</template>

<script>
import { useBillsStore } from '@/stores/billsStore.js';
import { useSuppliersStore } from '@/stores/suppliersStore.js';
import { useProductsStore } from '@/stores/productStore.js';
import { useStockItemsStore } from '@/stores/stockStore.js';


export default {
  data: () => ({
    headers: [
      { title: 'Code', key: 'code', align: 'start' },
      { title: 'Name', key: 'name' },
      { title: 'QTY', key: 'qty' },
      { title: 'Cost', key: 'cost' },
      { title: 'Price', key: 'price' },
      { title: 'Total Cost', key: 'total' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    billStore: useBillsStore(),
    supplierStore: useSuppliersStore(),
    productStore: useProductsStore(),
    stockStore: useStockItemsStore(),
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
    inclusive: false,
    editedBill: false,
    productName: ''
  }),

  computed: {
    total() {
      return parseFloat(this.totalAmount) + parseFloat(this.totalVat);
    },
    totalPrice() {
      return this.addedProducts.reduce((acc, item) => acc + (parseFloat(item.price) * parseInt(item.qty)), 0);
    },
    totalVat() {
      const amount = this.addedProducts.reduce((acc, item) => acc + (parseFloat(item.cost) * parseInt(item.qty)), 0);
      return Number((amount * 0.15).toFixed(2))
    },
    totalAmount() {
      const amount = this.addedProducts.reduce((acc, item) => acc + (parseFloat(item.cost) * parseInt(item.qty)), 0);
      return Number(amount.toFixed(2))
    },
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
    inclusive: 'recalculate'
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
    recalculate() {
      this.addedProducts.map((product) => {

        if (this.inclusive) {
          const cost = parseFloat(product.cost);

          // const newCost = Number((cost * 0.869565217391).toFixed(2))
          const newCost = Number(((cost * 100) / 115).toFixed(2))
          const newTotal = product.qty * newCost

          product.cost = newCost
          product.total = newTotal

        }
        else {
          const cost = parseFloat(product.cost);
          const newCost = Number((cost * 1.15).toFixed(2))
          const newTotal = product.qty * newCost

          product.cost = newCost
          product.total = newTotal

        }
      })

    },

    addProduct() {
      if (this.selectedProduct && this.qty > 0 && this.cost > 0 && this.price > 0) {
        const name = this.productMap[this.selectedProduct].name
        // const product = new Stock(this.selectedProduct, name, parseFloat(this.cost), parseFloat(this.price))
        const id = this.productMap[this.selectedProduct].id
        const total = (this.qty * this.cost).toFixed(2)

        this.addedProducts.push({
          id: id,
          code: this.selectedProduct,
          name: name,
          qty: parseInt(this.qty),
          cost: parseFloat(this.cost),
          price: parseFloat(this.price),
          total: total
        })

        this.selectedProduct = null;
        this.qty = 0;
        this.cost = 0;
        this.price = 0;

      }
    },

    editItem(item) {

      this.qty = item.qty;
      this.cost = item.cost;
      this.price = item.price;
      this.selectedProduct = item.code

      this.editedBill = true
      this.dialog = true
    },

    deleteItem(item) {
      this.productName = item.name
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.addedProducts = this.addedProducts.filter(product => product.name !== this.productName)
      this.closeDelete();
    },

    close() {

      this.selectedProduct = null;
      this.qty = 0;
      this.cost = 0;
      this.price = 0;

      this.dialog = false
      this.editedBill = false
    },

    closeDelete() {
      this.productName = ''
      this.dialogDelete = false
    },

    cancel() {
      this.$router.go(-1);
    },

    async submit() {

      const productIds = this.addedProducts.map((product) => product.id)

      // Creates Bill
      const billRecord = await this.billStore.createBillFromData(
        this.supplierMap[this.supplier],
        this.supplierRef,
        this.issueDateString,
        this.paymentMethod.toLowerCase(),
        false,
        productIds,
        this.total
      )

      // Create the stock Items
      this.addedProducts.map(async (product) => {

        await this.stockStore.createStockItemFromData(
          product.code,
          product.name,
          parseInt(product.qty),
          parseFloat(product.cost),
          parseFloat(product.price),
          billRecord.id,
          parseInt(product.qty),
          false
        )

      })

      await this.stockStore.readStockItems()

      this.close()
      this.cancel()

    },

    update() {

      this.addedProducts = this.addedProducts.map((product) => {
        if (product.code === this.selectedProduct) {
          return {
            ...product,
            qty: this.qty,
            cost: this.cost,
            price: this.price,
            total: (this.qty * this.cost).toFixed(2) // Calculate and format total
          };
        } else {
          // Return unchanged product for other items
          return product;
        }
      })

      this.close()
    },
  },
}
</script>
