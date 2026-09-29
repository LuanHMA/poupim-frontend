import { useEffect, useState } from "react";

export function useIsMobile({ limitScreenWidth = 639 }: { limitScreenWidth?: number }) {
    const MOBILE_QUERY = `(max-width: ${limitScreenWidth}px)`;

    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

    useEffect(() => {
        const media = window.matchMedia(MOBILE_QUERY);
        const handleChange = () => setIsMobile(media.matches);
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    return {
        isMobile
    };
}