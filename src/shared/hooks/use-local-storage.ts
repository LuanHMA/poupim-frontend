import { getStorageItem, removeStorageItem, setStorageItem } from "@/shared/utils/local-storage.client";
import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => getStorageItem(key, initialValue));

    const storeValue = useCallback(
        (nextValue: T) => {
            setValue(nextValue);
            setStorageItem(key, nextValue);
        },
        [key],
    );

    const clearValue = useCallback(() => {
        setValue(initialValue);
        removeStorageItem(key);
    }, [key, initialValue]);

    return {
        value,
        storeValue,
        clearValue,
    };
}
