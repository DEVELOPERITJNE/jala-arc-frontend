<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer_app"
            location="right"
            class="control-sidebar"
            width="450"
            temporary
            scrim="false"
        >
            <div class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button"></div>
        </v-navigation-drawer>
        <Header @toggle-drawer="toggleDrawer" />
        <router-view />
        <Footer />
    </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'MainLayout',
    components: { Header, Footer },
    data() {
        return { drawer_app: false }
    },
    methods: {
        toggleDrawer() {
            this.drawer_app = !this.drawer_app
        }
    }
}
</script>