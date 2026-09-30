const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

// "2026-09-30" é interpretado como UTC pelo construtor de Date, o que adianta/atrasa o dia
// em fusos negativos. Adicionando o horário, a string passa a ser lida no fuso local.
const parseDate = (date: string) => {
    return new Date(DATE_ONLY_PATTERN.test(date) ? `${date}T00:00:00` : date)
}

export const formatations = {
    currency: (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    },
    date: (date: string) => {
        return parseDate(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    },
    dateTime: (date: string) => {
        return parseDate(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: "2-digit",
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    },
    dateTimeLong: (date: string) => {
        return parseDate(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: "long",
            hour: '2-digit',
            minute: '2-digit'
        })
    },
    dayMonth: (date: string) => {
        return parseDate(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: "long"
        })
    },
    time: (date: string) => {
        return parseDate(date).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}
