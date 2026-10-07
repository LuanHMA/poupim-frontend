import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type TransitionEvent } from "react";

const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.55;
const INTERACTIVE_SELECTOR = "button, a, input, textarea, select, label, [data-no-drag]";

type DragAxis = "x" | "y";

type UseDragToDismissOptions = {
    axis: DragAxis;
    onDismiss: () => void;
    active?: boolean;
};

export function useDragToDismiss({ axis, onDismiss, active = true }: UseDragToDismissOptions) {
    const sheetRef = useRef<HTMLElement | null>(null);
    const onDismissRef = useRef(onDismiss);
    const axisRef = useRef(axis);
    const offsetRef = useRef(0);
    const pendingDismissRef = useRef(false);
    const dragRef = useRef({
        active: false,
        pointerId: -1,
        start: 0,
        last: 0,
        lastTime: 0,
        velocity: 0,
    });

    const [offset, setOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isSettling, setIsSettling] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);
    const [trackedAxis, setTrackedAxis] = useState(axis);
    const [trackedActive, setTrackedActive] = useState(active);

    onDismissRef.current = onDismiss;
    axisRef.current = axis;
    offsetRef.current = offset;

    if (axis !== trackedAxis || active !== trackedActive) {
        setTrackedAxis(axis);
        setTrackedActive(active);
        pendingDismissRef.current = false;
        dragRef.current.active = false;
        setOffset(0);
        setIsDragging(false);
        setIsSettling(false);
        setIsDismissing(false);
    }

    useEffect(() => {
        if (!isDismissing) return;

        const timeout = window.setTimeout(() => {
            if (!pendingDismissRef.current) return;
            pendingDismissRef.current = false;
            onDismissRef.current();
        }, 380);

        return () => window.clearTimeout(timeout);
    }, [isDismissing]);

    const pointFromEvent = (event: PointerEvent<HTMLElement>) =>
        axisRef.current === "y" ? event.clientY : event.clientX;

    const onPointerDown = (event: PointerEvent<HTMLElement>) => {
        if (!active || event.button !== 0) return;

        const target = event.target;
        if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) return;

        const point = pointFromEvent(event);
        dragRef.current = {
            active: true,
            pointerId: event.pointerId,
            start: point,
            last: point,
            lastTime: event.timeStamp,
            velocity: 0,
        };
        pendingDismissRef.current = false;
        setIsDismissing(false);
        setIsSettling(false);
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        const drag = dragRef.current;
        if (!drag.active || event.pointerId !== drag.pointerId) return;

        const point = pointFromEvent(event);
        const elapsed = event.timeStamp - drag.lastTime;
        if (elapsed > 0) drag.velocity = (point - drag.last) / elapsed;
        drag.last = point;
        drag.lastTime = event.timeStamp;
        setOffset(Math.max(0, point - drag.start));
    };

    const finishDrag = (event: PointerEvent<HTMLElement>) => {
        const drag = dragRef.current;
        if (!drag.active || event.pointerId !== drag.pointerId) return;

        drag.active = false;
        const distance = Math.max(0, pointFromEvent(event) - drag.start);
        const shouldDismiss = distance >= DISMISS_DISTANCE || (distance > 28 && drag.velocity >= DISMISS_VELOCITY);

        setIsDragging(false);

        if (distance < 1) {
            setIsSettling(false);
            setOffset(0);
            return;
        }

        if (shouldDismiss) {
            const sheet = sheetRef.current;
            const size = sheet ? (axisRef.current === "y" ? sheet.offsetHeight : sheet.offsetWidth) : distance + DISMISS_DISTANCE;
            pendingDismissRef.current = true;
            setIsSettling(true);
            setOffset(distance);
            requestAnimationFrame(() => {
                setIsDismissing(true);
                setOffset(Math.max(size, distance + 1));
            });
            return;
        }

        setIsSettling(true);
        setOffset(distance);
        requestAnimationFrame(() => setOffset(0));
    };

    const onDragTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

        if (pendingDismissRef.current) {
            pendingDismissRef.current = false;
            setIsDismissing(false);
            setIsSettling(false);
            onDismissRef.current();
            return;
        }

        if (offsetRef.current === 0) setIsSettling(false);
    };

    const dragStyle: CSSProperties | undefined =
        isDragging || isSettling
            ? {
                  transform: axis === "y" ? `translate3d(0, ${offset}px, 0)` : `translate3d(${offset}px, 0, 0)`,
                  transition: isDragging ? "none" : "transform 300ms ease-in-out",
              }
            : undefined;

    const setSheetRef = useCallback((node: HTMLElement | null) => {
        sheetRef.current = node;
    }, []);

    return {
        setSheetRef,
        dragStyle,
        isDragging,
        dragHandleProps: {
            onPointerDown,
            onPointerMove,
            onPointerUp: finishDrag,
            onPointerCancel: finishDrag,
        },
        onDragTransitionEnd,
    };
}
