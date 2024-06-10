<template>

  <v-card title="Search For Accounts" flat class="tw-mt-4">
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>

    <!-- <template v-slot:text>
      <SearchInput :type="search" v-model="search" :searchIcon="true" :clearIcon="true" :hideShortcutIconOnBlur="false"
        :clearOnEsc="false" />
    </template> -->
  </v-card>

  <div class="tw-mb-10"></div>

  <v-data-table :headers="headers" :items="data" :search="search">
    <template v-slot:top>
      <v-toolbar flat class="toolbar-background">

        <v-toolbar-title class="tw-text-white">Accounts List</v-toolbar-title>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="white" dark v-bind="props">
              New Account
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

    <template v-slot:[`item.balance_type`]="{ value }">
      <v-chip variant="flat" :color="balanceColour(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:[`item.account_type`]="{ value }">
      <v-chip variant="flat" :color="accountColour(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <!-- <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon> -->
      <v-icon class="me-2" size="small" @click="editItem(item)">
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
import { useAccountsStore } from '@/stores/accountsStore.js'

import SearchInput from 'vue-search-input'
// Optionally import default styling
import 'vue-search-input/dist/styles.css'

export default {
  components: {
    SearchInput
  },
  data: () => ({
    headers: [
      { title: 'Name', key: 'name', align: 'start' },
      { title: 'Balance Type', key: 'balance_type', searchable: false },
      { title: 'Account Type', key: 'account_type', searchable: false },
      { title: 'Active', key: 'active' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    accountStore: useAccountsStore(),
    search: '',
    dialog: false,
    dialogDelete: false,
    accountId: '',
    accountName: '',
    accountBalanceType: '',
    accountAccountType: '',
    editedAccount: false,
  }),

  computed: {
    data() {
      return this.accountStore.accounts;
    },
    formTitle() {
      return this.accountId === '' ? 'New Account' : 'Edit Account'
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
    await this.accountStore.readAccounts();
  },

  methods: {

    balanceColour(val) {
      // pink and purple
      if (val === 'debit')
        return '#90EE90';
      else
        return '#ADD8E6';
    },

    accountColour(val) {
      // I green
      // E red
      //
      // E yellow
      // A blue
      // L orange
      switch (val) {
        case 'expense':
          return '#ADD8E6'; // Light Blue
        case 'asset':
          return '#90EE90'; // Light Green
        case 'income':
          return '#FFFFE0'; // Light Yellow
        case 'equity':
          return '#F08080'; // Light Coral
        case 'liability':
          return '#FFB6C1'; // Light Pink
        default:
          return '#E6E6FA'; // Lavender (default color)
      }
    },

    editItem(item) {
      this.accountId = item.id
      this.accountName = item.name
      this.accountBalanceType = item.balance_type
      this.accountAccountType = item.account_type

      this.editedAccount = true
      this.dialog = true
    },

    deleteItem(item) {
      this.accountId = item.id
      this.accountName = item.name
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.accountStore.deleteAccount(this.accountId);

      this.accountId = '';
      this.accountName = '';

      this.closeDelete()
    },

    close() {
      this.accountId = '';
      this.accountName = '';
      this.accountBalanceType = '';
      this.accountAccountType = '';

      this.dialog = false
      this.editedAccount = false
    },

    closeDelete() {
      this.dialogDelete = false
    },

    async save() {

      if (this.editedAccount == false) {
        await this.accountStore.createAccountFromData(this.accountName, this.accountBalanceType, this.accountAccountType);
      } else {
        await this.accountStore.updateAccount(this.accountId, this.accountName, this.accountBalanceType, this.accountAccountType);
      }

      this.accountId = '';
      this.accountName = '';
      this.accountBalanceType = '';
      this.accountAccountType = '';

      this.close()
    },
  },
}
</script>