export const formatations = {
    toBRL: (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    },
    toDDMMHHMM: (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: "long",
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}