import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { INSTALL_PROMPT_STORAGE_KEY } from "../constants/storage";
import type { BeforeInstallPromptEvent } from "../types/pwa";
import { isIosDevice, isStandaloneMode } from "../utils/platform";

const APPEARANCE_DELAY_IN_MS = 1500;

export function useInstallAppPrompt() {
    const { isMobile } = useIsMobile({ limitScreenWidth: 768 });
    const { value: wasDismissed, storeValue: setWasDismissed } = useLocalStorage(INSTALL_PROMPT_STORAGE_KEY, false);

    const [isIos] = useState(() => isIosDevice());
    const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode());

    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
            // Impede o banner nativo do navegador para usarmos o popup da aplicação.
            event.preventDefault();
            setInstallEvent(event);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setInstallEvent(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    // No iOS não existe `beforeinstallprompt`, então o popup só pode ensinar o passo a passo.
    const canPrompt = isMobile && !wasDismissed && !isInstalled && (isIos || Boolean(installEvent));

    useEffect(() => {
        if (!canPrompt) return;

        const timeout = setTimeout(() => {
            setIsMounted(true);
            requestAnimationFrame(() => setIsVisible(true));
        }, APPEARANCE_DELAY_IN_MS);

        return () => clearTimeout(timeout);
    }, [canPrompt]);

    const closePrompt = () => {
        setWasDismissed(true);
        setIsVisible(false);
    };

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || event.propertyName !== "opacity" || isVisible) return;

        setIsMounted(false);
    };

    const handleInstall = async () => {
        if (!installEvent) return;

        setIsInstalling(true);

        try {
            await installEvent.prompt();
            await installEvent.userChoice;
        } finally {
            setIsInstalling(false);
            setInstallEvent(null);
            closePrompt();
        }
    };

    return {
        isMounted,
        isVisible,
        isIos,
        isInstalling,
        canInstallDirectly: Boolean(installEvent),
        closePrompt,
        handleInstall,
        handleTransitionEnd,
    };
}
