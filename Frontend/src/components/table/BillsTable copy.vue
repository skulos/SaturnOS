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

    <template v-slot:[`item.payed`]="{ value }">
      <v-chip variant="flat" :color="paymentColour(value)">
        {{ paymentStatus(value) }}
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>Bill List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="950px">
          <template v-slot:activator="{ props }">
            <v-btn color="black" dark v-bind="props">
              New Bill
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-col cols="12">
                    <v-text-field v-model="supplier" variant="outlined" label="Supplier"></v-text-field>
                  </v-col> -->
                  <v-col cols="6">
                    <v-autocomplete cols="6" :items="supplierList" variant="outlined" v-model="supplier"
                      label="Supplier"></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="supplierRef" variant="outlined" label="Supplier Reference"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <!-- <v-text-field v-model="issueDate" variant="outlined" label="Issued Date"></v-text-field> -->
                    <!-- <v-date-picker v-model="issueDate" celevation="24"></v-date-picker> -->
                    <!-- <input type="date" v-model="issueDate" required
                        class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-black"> -->
                    <div class="input-wrapper">
                      <input type="date" v-model="issueDate" required
                        class="border tw=border-4 tw-border-black tw-rounded-md tw-px-3 tw-py-4 focus:tw-outline-black focus:tw-border-black">
                    </div>

                  </v-col>
                  <v-col cols="6">
                    <!-- <v-text-field v-model="paymentMethod" variant="outlined" label="Payment Method"></v-text-field> -->
                    <v-select cols="6" :items="['CASH', 'EFT', 'CARD']" variant="outlined" v-model="paymentMethod"
                      label="Payment Method"></v-select>
                  </v-col>
                  <!-- <v-col cols="12">
                    <v-text-field v-model="products" variant="outlined" label="Products"></v-text-field>
                  </v-col> -->
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
                <v-row>
                  <v-col cols="12">
                    <!-- <v-list>
                      <v-list-item v-for="(product, index) in addedProducts" :key="index">
                        <v-list-item-content>
                          <v-list-item-title>{{ product.name }}</v-list-item-title>
                          <v-list-item-subtitle>Qty: {{ product.qty }}, Cost: {{ product.cost }}, Price: {{
        product.price
      }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list> -->

                    <v-data-table :items="addedProducts" :headers="productHeaders">
                      <template v-slot:item="{ item }">
                        <td>{{ item.code }}</td>
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ item.qty }}</td>
                        <td class="text-center">{{ item.cost }}</td>
                        <td class="text-center">{{ item.price }}</td>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>


              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" @click="close">
                Cancel
              </v-btn>
              <v-btn color="black" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      { title: 'Name', key: 'name'},
      { title: 'QTY', key: 'qty', align: 'center'},
      { title: 'Cost', key: 'cost', align: 'center'},
      { title: 'Price', key: 'price', align: 'center'},
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


    console.log("Bills = ", this.billStore.bills)

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
          qty:  parseInt(this.cost),
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
