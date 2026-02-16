<template>
    <v-container fluid>
        <v-row class="align-center">
            <!-- dua datepicker -->
            <!-- <v-col cols="12" md="3">
                <div class="text-center d-flex ga-5 py-5">
                    <v-menu v-model="menu.start" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field v-bind="props" v-model="formattedDateS" label="Start Date" readonly />
                        </template>

                        <v-date-picker v-model="dateVal.start" @update:model-value="menu.start = false" />
                    </v-menu>
                </div>
            </v-col>
            <v-col cols="12" md="3">
                <div class="text-center d-flex ga-5 py-5">
                    <v-menu v-model="menu.end" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field v-bind="props" v-model="formattedDateE" label="End Date" readonly />
                        </template>

                        <v-date-picker v-model="dateVal.end" @update:model-value="menu.end = false" />
                    </v-menu>
                </div>
            </v-col> -->

            <!-- 1 datepicker range -->
            <v-col cols="12" md="6">
                <div class="text-center d-flex ga-4 flex-wrap">
                    <v-menu v-model="datepickers" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field variant="outlined" v-bind="props" v-model="formattedDates" label="Select Dates" readonly density="compact" max-width="300" />
                        </template>
                        <v-date-picker v-model="dates" @update:model-value="handleChange" multiple="range"/>
                    </v-menu>
                    <v-btn variant="tonal">Get</v-btn>
                    <v-btn variant="tonal" color="success">Download</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Agent</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2></h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Implant</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2></h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="ms-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Marketplace</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2></h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>

</style>

<script>
import { TOP_TEN } from '../stores/actions/reqApi'
import { mapActions, mapGetters } from 'vuex';
import datatop from '../stores/datatop';

export default { 
    name:'BaseTopTenView',
    data() { 
        return { 
            datepickers: false,
            dates: [],
            menu: {
                start: false,
                end: false
            },
            dateVal : {
                start: null,
                end: null,
            }
        }
    },
    computed: { 
        ...mapGetters({
            getTOP_TEN: 'datatop/'+TOP_TEN
        }),
        formattedDates(){
            if (!this.dates || this.dates.length < 2) return ;
            const [start,end] = this.dates
            return (
                new Date(start).toLocaleDateString('id-ID')+'-'+new Date(end).toLocaleDateString('id-ID')
            )
        },
        formattedDateS() { 
            if(!this.dateVal.start) return '';
            return new Date(this.dateVal.start).toLocaleDateString('id-ID')
        },
        formattedDateE() { 
            if(!this.dateVal.end) return '';
            return new Date(this.dateVal.end).toLocaleDateString('id-ID')
        }
    },
    methods: {
        ...mapActions({
            actTOP_TEN: 'datatop/'+TOP_TEN
        }),
        handleChange(val){
            if(val.length >= 2) {
                this.datepickers=false
            }
        }
    },
    async mounted() {
        try {
            await this.actTOP_TEN()
            console.log('monyed' , this.getTOP_TEN)
        } catch (error) {
            
        }
        
    }
}
</script>