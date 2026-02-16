export const dashboardTableHeaders = [
    { 
        title: 'Month', 
        key: 'month',
        headerProps:{class: 'header-purple font-weight-bold'},
    },
    {
        title: 'Cnote',
        align: 'center',
        headerProps:{class: 'header-purple font-weight-bold'},
        children: [
            { title: 'Implants', key: 'cnote_implants', headerProps:{class: 'header-purple font-weight-bold'}, },
            { title: 'Utama', key: 'cnote_utama',headerProps:{class: 'header-purple font-weight-bold'}, }
        ]
    },

    {
        title: 'Gross Omset',
        align: 'center',
        headerProps:{class: 'header-purple font-weight-bold'},
        children: [
            { title: 'Implants', key: 'omset_implants', headerProps:{class: 'header-purple font-weight-bold'}, },
            { title: 'Utama', key: 'omset_utama', headerProps:{class: 'header-purple font-weight-bold'}, }
        ]
    },

    {
        title: 'Commission',
        align: 'center',
        headerProps:{class: 'header-purple font-weight-bold'},
        children: [
            { title: 'Implants', key: 'commission_implants', headerProps:{class: 'header-purple font-weight-bold'}, },
            { title: 'Utama', key: 'commission_utama', headerProps:{class: 'header-purple font-weight-bold'}, }
        ]
    }
]

export const createColumn = ({
    key,
    title,
    type = 'text',
    sortable = true,
    align,
    width,
    hidden = false,
    children = null
}) => ({
    key,
    title,
    type,
    sortable,
    align: align ?? getDefaultAlign(type),
    width,
    hidden,
    children
})

const getDefaultAlign = (type) => {
    switch (type) {
        case 'number':
        case 'currency':
            return 'end'
        case 'action':
            return 'center'
        default:
            return 'start'
    }
}

export const columnTypes = {
    default: {
        format: (value) => value ?? '-'
    },

    number: {
        format: (value) => {
        if (value == null) return '-'
        return new Intl.NumberFormat('id-ID').format(Number(value))
        }
    },

    currency: {
        format: (value) => {
            if (value == null) return '-'
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(Number(value))
        }
    }
}



export const buildHeaders = (columns) => {
    return columns
        .filter(col => !col.hidden)
        .map(col => {
        if (col.children && col.children.length) {
            return {
                title: col.title,
                align: col.align,
                children: buildHeaders(col.children),
                headerProps:{class: 'header-purple font-weight-bold'},
            }
        }

        return {
            title: col.title,
            key: col.key,
            sortable: col.sortable,
            align: col.align,
            width: col.width,
            headerProps:{class: 'header-purple font-weight-bold'},
        }
    })
}
