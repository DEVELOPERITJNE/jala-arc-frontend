<template>
    <v-container class="h-100" fluid>
        <v-row justify="center">
            <v-col cols="12">
                <div class="d-flex flex-row">
                    <h1>Welcome to &#160;</h1>
                    <h1 class="text-arcPurple">ARC</h1>
                </div>
            </v-col>
        </v-row>
        <v-row class="mb-10 pb-10">
            <v-col cols="12">
                <div class="d-flex flex-row">
                    <h1 class="_tytyd text-arcPurple">{{ displayedText  }}</h1>
                </div>
            </v-col>
        </v-row>
        <v-row class="ma-0 align-stretch _tolol">
            <v-col cols="12" md="4" class="ps-0">
                <v-img
                    :src="imgHomeFinance"
                    class="hero-image-fnc pa-0"
                />
            </v-col>

            <!-- CONTENT -->
            <v-col cols="12" md="8" class="pa-0">
                <h1 class="mb-4 ms-5">FINANCE PANEL</h1>
                <div class="_custom_container_fnc bg-arcPurple">

                <div class="content-inside-fnc ps-5">
                    <h2 class="mb-6">
                        Manage Finance Data & Generate Agent Reports.
                    </h2>

                    <div class="d-flex ga-5 flex-wrap">
                        <v-btn variant="tonal">Finance Dashboard</v-btn>
                        <v-btn variant="tonal">Top 10 Report</v-btn>
                        <v-btn variant="tonal">Data Management</v-btn>
                        <v-btn variant="tonal">Validation</v-btn>
                    </div>

                    <div class="border-b-lg border-background mt-5"></div>
                </div>
                </div>
            </v-col>
        </v-row>
        <v-row class="my-10 py-10">
            <v-col cols="12" class="pa-0">
                <v-container fluid>
                    <div class="finance-wrapper">
                        <!-- SHAPE + CONTENT -->
                        <h1 class="ms-10 mb-6">AGENT PANEL</h1>
                        <div class="_custom_container_agp bg-arcBlue d-flex align-center justify-start ps-10">
                            <div class="content-inside ">
                                <h2 class="mb-6">Manage Agent Data & Reconciliation</h2>
                                <div class="d-flex ga-4">
                                    <v-btn variant="tonal">Agent Dashboard</v-btn>
                                    <v-btn variant="tonal">Reconciliation</v-btn>
                                </div>
                                <div class="border-b-lg border-background mt-5"></div>
                            </div>
                        </div>

                        <!-- IMAGE (OVERLAY) -->
                        <v-img :src="imgHomeAgenPanel" class="hero-image" />
                    </div>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

._tolol { 
    --v-layout-gap: 0px;
}

._tytyd { 
    min-height: 60px;
}

.content-inside {
    max-width: 900px;
}

.content-inside-fnc {
    max-width: 900px;
}

.finance-wrapper {
    left: -4rem;
    top: 20px;
    position: relative;
    min-height: 500px;
}

._custom_container_agp {
    min-height: 300px;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
    z-index: 1;
}

.hero-image {
    position: absolute;
    right: -110px;
    top: -30px;
    width: 500px;
    z-index: 2;
}

.hero-image-fnc { 
    height: 100%;
    width: 100%;
}

.h1_babi {
    margin-left: 32rem;
}

._custom_container_fnc {
    margin: 0;
    min-height: 300px;
    border-top-right-radius: 200px;
    border-bottom-right-radius: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
}

</style>

<script>
import { mapGetters } from 'vuex';
import imgHomeFinance from '../../src/assets/imgs/home-finance-panel.png'
import imgHomeAgenPanel from '../assets/imgs/home-agent-panel.png'
import _ractangle from '../assets/imgs/Rectangle-259.png'

export default { 
    name: 'BaseHomeView',
    data() {
        return { 
            // image
            imgHomeFinance,
            imgHomeAgenPanel,
            _ractangle,

            // type write monyed
            fullText: '',
            displayedText: '',
            speed: 120,
            typingInterval: null,
            pauseDelay: 1500,
        }
    },
    computed: { 
        ...mapGetters({
        }),
    },
    methods: {
        async typeLoop() {
            while (true) {
                for (let i = 0; i <= this.fullText.length; i++) {
                    this.displayedText = this.fullText.substring(0, i)
                    await this.sleep(this.speed)
                }

                await this.sleep(this.pauseDelay)
                for (let i = this.fullText.length; i >= 0; i--) {
                    this.displayedText = this.fullText.substring(0, i)
                    await this.sleep(this.deleteSpeed)
                }
                await this.sleep(500)
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
    },
    mounted() {
        this.fullText = "AGENT REVENUE COMMISION"
        this.typeLoop()
    },
    beforeUnmount() {
        clearInterval(this.typingInterval)
    }

}

</script>