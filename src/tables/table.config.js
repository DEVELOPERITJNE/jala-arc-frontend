export const dashboardTableHeaders = [
    { 
        title: 'Month', 
        key: 'month',
        headerProps:{class: 'header-purple'},
    },
    {
        title: 'Cnote',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'cnote_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'cnote_utama',headerProps:{class: 'header-purple'}, }
        ]
    },

    {
        title: 'Gross Omset',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'omset_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'omset_utama', headerProps:{class: 'header-purple'}, }
        ]
    },

    {
        title: 'Commission',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'commission_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'commission_utama', headerProps:{class: 'header-purple'}, }
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
    text: {
        format: (val) => val ?? '-'
    },

    number: {
        format: (val) =>
        new Intl.NumberFormat('id-ID').format(val ?? 0)
    },

    currency: {
        format: (val) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(val ?? 0)
    },

    percent: {
        format: (val) => `${val ?? 0}%`
    }
}

export const buildHeaders = (columns) => {
    return columns
        .filter(col => !col.hidden)
        .map(col => {
        // kalo pake children
        if (col.children && col.children.length) {
            return {
            title: col.title,
            align: col.align,
            children: buildHeaders(col.children)
            }
        }

        // leaf column
        return {
            title: col.title,
            key: col.key,
            sortable: col.sortable,
            align: col.align,
            width: col.width
        }
    })
}

