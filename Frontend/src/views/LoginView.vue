<template>
    <div class=" justify-center fill-height fill-width pt-10">

        <!-- tw-bg-tactivion-blue -->
        <v-img class="mx-auto" max-width="300"
            :src="this.logoImage" alt="Company Logo"></v-img>

        <v-card v-if="loginMode" class="mx-auto mt-12 pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>

            <v-text-field v-model="password" :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="passwordVisible = !passwordVisible"></v-text-field>

            <v-btn block class="mb-8" color="black" size="large" variant="tonal" @click="login">
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <!-- <a class="text-blue text-decoration-none" @click="toggleMode" href="#" rel="noopener noreferrer" target="_blank"> -->
                <a class="text-black text-decoration-none" @click="toggleMode">
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
        <v-card v-else class="mx-auto mt-12 pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

            <div class="text-subtitle-1 text-medium-emphasis">Email address</div>
            <v-text-field v-model="email" density="compact" placeholder="Enter Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Name</div>
            <v-text-field v-model="name" density="compact" placeholder="Enter Name" prepend-inner-icon="mdi-format-text"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Surname</div>
            <v-text-field v-model="surname" density="compact" placeholder="Enter Surname"
                prepend-inner-icon="mdi-format-text" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Password</div>
            <v-text-field v-model="password" placeholder="Enter Password"
                :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'" density="compact" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="passwordVisible = !passwordVisible"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Confirm Password</div>
            <v-text-field :type="'password'" v-model="confirmPassword" @keyup.enter="test" placeholder="Enter Password"
                density="compact" prepend-inner-icon="mdi-lock-outline" variant="outlined"></v-text-field>

            <v-btn block class="mb-8" color="black" size="large" variant="tonal" @click="signup">
                Signup
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-black text-decoration-none" @click="toggleMode">
                    Login now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
    </div>

    <div class="text-center pa-4">
 
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="600"
        title="⛔ Authentication Service is down ⛔"
        text="The application is unable to authenticate you - please contact Hendré or try again later. 😥"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template> 

  
<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import pb from '@/pocketbase/pocketbase';
import CryptoJS from 'crypto-js';
import logo from '@/assets/logo.jpeg';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// TODO fail if Pocketbase isnt online or display message
export default {
    setup() {
        // localStorage.clear();
        // Check if the user is already authenticated
        // this.checkAuthentication();
        const userStore = useUserStore();
        const router = useRouter();

        // Check if the user is authenticated
        if (userStore.checkAuthentication()) {
            // Redirect to the home page
            router.push('/home');
        }
    },
    data() {
        return {
            loginMode: true,
            passwordVisible: false,
            isPasswordMismathed: false,
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            surname: '',
            dialog: false,
            logoImage: logo,
        };
    },
    computed: {
        username: function () { return this.name + ' ' + this.surname; },
    },
    methods: {
        checkAuthentication() {
            const isAuthenticated = useUserStore().checkAuthentication();
            if (isAuthenticated) {
                // Reset authentication status and navigate to the homepage
                // useUserStore().setAuthentication(false);
                this.navigateToHome();
            }
        },
        navigateToHome() {
            this.$router.push('/home');
        },
        test() {
            if (this.password !== this.confirmPassword) {
                this.isPasswordMismathed = !this.isPasswordMismathed;
            }
        },
        toggleMode() {
            this.loginMode = !this.loginMode;
            this.clearData;
        },
        clearData() {
            this.passwordVisible = false;
            this.isPasswordMismathed = false;
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.name = '';
            this.surname = '';
        },
        async login() {

            const isValid = this.email.includes('@activitar.com');
            const passwordHash = CryptoJS.SHA256(this.password).toString();

            if (isValid) {

                try {
                    const authRecord = await pb.collection('users').authWithPassword(
                    this.email,
                    // this.password,
                    passwordHash,
                );

                const userData = { id: authRecord.record.id, name: authRecord.record.name, username: authRecord.record.username, isAuthenticated: true };

                useUserStore().setUserData(userData);

                this.clearData();
                this.$router.push('/home');
                } catch (error) {
                    this.dialog = true;
                    this.clearData();
                }

            } else {
                alert('Email is not valid');
                this.clearData();
            }

        },
        async signup() {

            const isValid = this.email.includes('@activitar.com');

            const passwordHash = CryptoJS.SHA256(this.password).toString();

            if (isValid) {

                const data = {
                    // "username": "test_username",
                    "email": this.email,
                    "emailVisibility": true,
                    "password": passwordHash,
                    "passwordConfirm": passwordHash,
                    "name": this.username,
                    // "verified": true,
                };

                const record = await pb.collection('users').create(data);

                await sleep(1500);
                await pb.collection('users').authWithPassword(
                    this.email,
                    // this.password,
                    passwordHash
                );

                const userData = { id: record.id, name: record.name, username: record.username, isAuthenticated: true };

                useUserStore().setUserData(userData);

                this.clearData;
                this.$router.push('/home');

            } else {
                alert('Could not complete signup - please try again later');
                this.clearData();
            }

        },
    },
};
</script>
  