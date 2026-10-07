export function sortCategoriesByName<T extends { name: string }>(categories: T[]) {
    return [...categories].sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
}
