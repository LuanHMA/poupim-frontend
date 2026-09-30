import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useEffect, useState } from "react";

export function useEditTransactionDrawer(onClose: () => void) {
    const { isMobile } = useIsMobile({});
    const [isVisible, setIsVisible] = useState(false);

    const closeDrawer = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isMobile]);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || isVisible) return;

        onClose();
    };

    return {
        isVisible,
        closeDrawer,
        handleTransitionEnd,
    };
}
