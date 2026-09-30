export const formatations = {
    currency: (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    },
    date: (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    },
    dateTime: (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: "2-digit",
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    },
    dateTimeLong: (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: "long",
            hour: '2-digit',
            minute: '2-digit'
        })
    },
    dayMonth: (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: "long"
        })
    },
    time: (date: string) => {
        return new Date(date).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}