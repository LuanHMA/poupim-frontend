// O acesso ao localStorage lança exceção em modo privado do Safari e quando o
// usuário bloqueia armazenamento de sites, por isso todo acesso é protegido.
function getStorage() {
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

export function getStorageItem<T>(key: string, fallback: T): T {
    const storage = getStorage();
    if (!storage) return fallback;

    try {
        const raw = storage.getItem(key);
        return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
        return fallback;
    }
}

export function setStorageItem<T>(key: string, value: T) {
    const storage = getStorage();
    if (!storage) return;

    try {
        storage.setItem(key, JSON.stringify(value));
    } catch {
        // Ignora quando a cota de armazenamento é excedida.
    }
}

export function removeStorageItem(key: string) {
    const storage = getStorage();
    if (!storage) return;

    try {
        storage.removeItem(key);
    } catch {
        // Ignora quando o armazenamento está indisponível.
    }
}
