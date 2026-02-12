<template>
    <v-app>
        <!-- drawer badjingan -->

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
        <v-main class="main-wrapper">
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>

<style scoped>

</style>

<script>
import { LIBRARY_GET_CATEGORY, LIBRARY_GET_USER } from '../stores/actions/reqApi';
import { mapActions } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';

export default {
    name: 'App',
    components: {
        BaseIndex,
        Header,
        Footer,
    },
    data() {
        return { 
            drawer_app: false,
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer_app = !this.drawer_app
        },
        ...mapActions({
            act_LIBRARY_GET_CATEGORY: 'library/'+LIBRARY_GET_CATEGORY,
            act_LIBRARY_GET_USER: 'user/'+LIBRARY_GET_USER,
        }),
    },
    created() {
        this.$nextTick(async()=>{
            // await this.act_LIBRARY_GET_CATEGORY();
            // await this.act_LIBRARY_GET_USER();
        })
    },
}

</script>