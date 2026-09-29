import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useEffect, useState } from "react";
import type { TransactionType } from "../types/transactions";

export function useTransactionDrawer() {
    const { isMobile } = useIsMobile({});
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [isOpenTransactionOptions, setIsOpenTransactionOptions] = useState(false);
    const [transactionType, setTransactionType] = useState<TransactionType | null>(null);

    const handleOpenDrawer = (type: TransactionType) => {
        setTransactionType(type);
        setIsOpenTransactionOptions(false);
        openDrawer();
    }

    const toggleTransactionOptions = () => {
        setIsOpenTransactionOptions((isOpen) => !isOpen);
    }


    const openDrawer = () => {
        setIsMounted(true);
    }

    const closeDrawer = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        if (!isMounted) return;

        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted || !isMobile) return;

        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isMounted, isMobile]);

    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMounted(false);
        }
    }
    return {
        isMounted,
        isVisible,
        openDrawer,
        closeDrawer,
        handleTransitionEnd,
        isOpenTransactionOptions,
        transactionType,
        handleOpenDrawer,
        toggleTransactionOptions,
    };
}