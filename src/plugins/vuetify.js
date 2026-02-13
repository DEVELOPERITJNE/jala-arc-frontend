// Vuetify setup
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({ 
    components, 
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#ffffff',
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    ligthCustom: '#F2F9FF',
                    arcPurple: '#806EE1',
                    arcBlue: '#5A8EE9',
                    arcPink: '#F39AA5',
                    arcYellow: '#F8D089'
                }
            }
        }
    },
 });

export default vuetify;