import {useTheme} from 'vuetify'
export default { 
    data() { 
        return { 
            tete: useTheme(),
        }
    },
    computed: {
        gradientStyle2() { 
            const colors = this.tete.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.2)},
                    ${this.hexToRgba(colors.arcBlue, 0.2)},
                    ${this.hexToRgba(colors.arcYellow, 0.2)}
                )`
            }
        },
        gradientStyle() { 
            const colors = this.tete.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.75)},
                    ${this.hexToRgba(colors.arcBlue, 0.75)},
                    ${this.hexToRgba(colors.arcYellow, 0.75)}
                )`
            }
        },
    },
    methods: {
        hexToRgba(hex, o){
            const r = parseInt(hex.slice(1,3), 16)
            const g = parseInt(hex.slice(3,5), 16)
            const b = parseInt(hex.slice(5,7), 16)

            return `rgba(${r}, ${g}, ${b}, ${o})`
        }
    }
}