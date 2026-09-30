export function isIosDevice() {
    const { userAgent, platform, maxTouchPoints } = window.navigator;
    // iPadOS se identifica como macOS, então é detectado pelo suporte a toque.
    const isIpadOs = platform === "MacIntel" && maxTouchPoints > 1;

    return /iPad|iPhone|iPod/.test(userAgent) || isIpadOs;
}

export function isStandaloneMode() {
    const isIosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    return window.matchMedia("(display-mode: standalone)").matches || isIosStandalone;
}
