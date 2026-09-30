import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import { Download, Share, SquarePlus, XIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { useInstallAppPrompt } from "../hooks/use-install-app-prompt";

export function InstallAppPrompt() {
    const {
        isMounted,
        isVisible,
        isIos,
        isInstalling,
        canInstallDirectly,
        closePrompt,
        handleInstall,
        handleTransitionEnd,
    } = useInstallAppPrompt();

    if (!isMounted) return null;

    return createPortal(
        <div
            className={cn(
                "fixed inset-0 z-1200 flex items-end justify-center transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0",
            )}
            onTransitionEnd={handleTransitionEnd}
        >
            <button
                type="button"
                aria-label="Fechar recomendação de instalação"
                className="absolute inset-0 cursor-pointer border-0 bg-background-base/80 p-0"
                onClick={closePrompt}
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="install-app-title"
                aria-describedby="install-app-description"
                className={cn(
                    "relative w-full rounded-t-3xl border-t border-brd-default bg-background-surface p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
                    "transition-transform duration-300 ease-out",
                    isVisible ? "translate-y-0" : "translate-y-full",
                )}
            >
                <Button size="icon" variant="outline" className="absolute right-4 top-4" onClick={closePrompt}>
                    <XIcon className="text-content-muted" />
                </Button>

                <img src="/logo.svg" alt="" aria-hidden className="size-14 rounded-2xl" />

                <h2 id="install-app-title" className="mt-4 text-lg font-semibold text-content-primary">
                    Instale o app
                </h2>
                <p id="install-app-description" className="mt-2 text-sm text-content-muted">
                    Adicione o Gerenciador de despesas à sua tela de início para uma experiência mais rápida, em tela
                    cheia e com acesso offline.
                </p>

                {isIos && !canInstallDirectly ? (
                    <ol className="mt-6 flex flex-col gap-3 text-sm text-content-muted">
                        <li className="flex items-center gap-3">
                            <Share className="size-5 shrink-0 text-content-accent" aria-hidden />
                            Toque em <span className="font-semibold text-content-primary">Compartilhar</span> no Safari
                        </li>
                        <li className="flex items-center gap-3">
                            <SquarePlus className="size-5 shrink-0 text-content-accent" aria-hidden />
                            Escolha{" "}
                            <span className="font-semibold text-content-primary">Adicionar à Tela de Início</span>
                        </li>
                    </ol>
                ) : null}

                <div className="mt-6 flex flex-col gap-2">
                    {canInstallDirectly ? (
                        <Button size="full" leftIcon={<Download />} isLoading={isInstalling} onClick={handleInstall}>
                            Instalar app
                        </Button>
                    ) : null}

                    <Button size="full" variant="outline" onClick={closePrompt}>
                        Agora não
                    </Button>
                </div>
            </section>
        </div>,
        document.body,
    );
}
