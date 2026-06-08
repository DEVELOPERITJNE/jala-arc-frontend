<template>
    <div class="main-header">
        <v-app-bar  class="px-10" flat>
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none">
                <v-icon icon="fa-solid fa-bars" />
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <router-link :to="{name : ''}" style="color: #223">
                    ARC
                </router-link>
            </v-app-bar-title>

            <v-spacer />

            <v-btn @click="$emit('toggle-drawer')" color="primary">
                <v-icon>
                    mdi-dots-grid
                </v-icon>
            </v-btn>

            <div class="d-none d-md-flex align-items-center">Hello, <span class="text-red mx-1 no-wrap">{{ getAUTH_PROFILE?.name }}</span></div>
            <v-menu offset-y eager>
                <template #activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar size="36">
                            <img src="https://i.pravatar.cc/150?img=8" alt="Avatar" />
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card min-width="430" min-height="500" class="pa-2">
                    <iframe role="presentation" title="account" frameborder="0" name="account" :src="panelUrl" style="min-height: 500px; width: 100%;" ref="panel-account"></iframe>
                </v-card>
            </v-menu>
            
        </v-app-bar>
    </div>
</template>

<script>

import { AUTH_PROFILE, LOGOUT } from '../stores/actions/reqApi';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
    name: 'HeaderErrorPage',
    data() { 
        return { 
            panelUrl: import.meta.env.VITE_APP_PANEL_ACCOUNT_URL,
            drawer: false,
            drawer_app: false,
        }
    },
    computed: { 
        ...mapGetters({
            getAUTH_PROFILE:'auth/'+AUTH_PROFILE,
        })
    },
    methods: {
        toggleDrawer() {
            this.drawer_app = !this.drawer_app
        },
    }
}
</script>