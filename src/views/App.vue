<template>
    <router-view v-if="!loading" />
    <v-app v-else>
        <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
            <v-progress-circular indeterminate color="accent" />
        </v-main>
    </v-app>
</template>

<script>
import { AUTH_PROFILE, IS_403 } from '../stores/actions/reqApi';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    name: 'App',
    data() {
        return { 
            loading: true,
            forbidden:false,
        }
    },
    computed: { 
        ...mapState('auth', {
            state_IS_403: state => state[IS_403]
        })
    },
    methods: {
        handleIframeMessage(event) {
            if (event.data?.action === 'RELOAD_PARENT') window.location.reload()
        },
        ...mapActions({
            act_AUTH_PROFILE: 'auth/' + AUTH_PROFILE,
        }),
        ...mapMutations({
            mut_IS_403: 'auth/'+IS_403
        })
    },
    async created() {
        // this.loading = false
        try {
            const profile = await this.act_AUTH_PROFILE()
            if (!profile?.authz) {
                this.forbidden = true
                this.mut_IS_403(true)
                await this.$router.replace('/403')
                return
            }
        } catch (e) {
            this.forbidden = true
            this.mut_IS_403(true)
            await this.$router.replace('/403')
        } finally {
            this.loading = false
        }
    },
    mounted() {
        window.addEventListener('message', this.handleIframeMessage)
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleIframeMessage)
    }
}
</script>