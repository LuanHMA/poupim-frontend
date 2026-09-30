export function TransactionDetailsDrawer({ children }: { children: React.ReactNode }) {
    return (
        <>
            <button type="button" onClick={() => {
                console.log('Clicou')
            }}>
                {children}
            </button>
        </>
    )
}