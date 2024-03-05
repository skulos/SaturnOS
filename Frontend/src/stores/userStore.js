import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    // Initialize state with data from localStorage or defaults
    const storedData = JSON.parse(localStorage.getItem('user')) || {}
    return {
      id: storedData.id || '',
      name: storedData.name || '',
      username: storedData.username || '',
      // add more if needed
      isAuthenticated: false,
      // Add timeout related properties
      timeoutId: null,
      timeoutDuration: 600000,
      lastLoginTimestamp: storedData.lastLoginTimestamp || null
    }
  },

  getters: {
    userData: (state) => {
      state.id, state.name, state.username, state.isAuthenticated
    }
  },

  actions: {
    reset() {
      this.id  = '',
      this.name = '',
      this.username = '',

      this.isAuthenticated = false,

      this.timeoutId =null,
      this.timeoutDuration =  600000,
      this.lastLoginTimestamp = null
    },
    // add functions
    setUserData({ id, username, name, isAuthenticated }) {
      this.id = id
      this.name = name
      this.username = username
      this.isAuthenticated = isAuthenticated
      this.lastLoginTimestamp = Date.now()

      // Reset the timeout whenever user activity occurs
      this.resetTimeout()

      localStorage.setItem('user', JSON.stringify(this.$state))
    },

    // Reset the timeout function
    resetTimeout() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.timeoutId = setTimeout(() => {
        this.isAuthenticated = false
        localStorage.removeItem('user')
      }, this.timeoutDuration)
    },

    // Method to clear the timeout
    clearTimeout() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
    },

    checkAuthentication() {
      const now = Date.now()
      const tenMinutesInMilliseconds = 600000

      if (this.lastLoginTimestamp && now - this.lastLoginTimestamp < tenMinutesInMilliseconds) {
        this.isAuthenticated = true
        this.resetTimeout()
        return true;
      } else {
        this.isAuthenticated = false
        this.clearTimeout()
        // localStorage.removeItem('user')
        localStorage.clear();
        return false;
      }
    },

    // Call checkAuthentication when the store is created
    created() {
      this.checkAuthentication()
    }
  }
})

// avatar: ""
// collectionId: "_pb_users_auth_"
// collectionName: "users"
// created: "2023-12-30 08:41:08.847Z"
// email: "hendre@activitar.com"
// emailVisibility: true
// id: "eg3x33gatra9gp9"
// name: "Hendre Hayman"
// updated: "2023-12-30 08:42:44.815Z"
// username: "users85838"
// verified: true
