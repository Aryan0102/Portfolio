// Builds a hand-drawn marker stroke around (circle) or under (underline) a rect.
// Returns the SVG box, its path, and the same points in screen space so the
// ghost cursor can trace the stroke while it draws.

const circlePoints = (w, h) => {
    const points = [];
    const steps = 48;
    const start = -2.4 + Math.random() * 0.5;
    const turns = 1.12;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = start + t * turns * Math.PI * 2;
        const grow = 0.96 + t * 0.1;
        const wobble = 1 + Math.sin(angle * 3 + 1) * 0.03;
        points.push([
            w / 2 + Math.cos(angle) * (w / 2) * grow * wobble,
            h / 2 + Math.sin(angle) * (h / 2) * grow * wobble,
        ]);
    }
    return points;
};

const underlinePoints = (w) => {
    const points = [];
    const steps = 24;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        points.push([t * w, 5 - t * 3 + Math.sin(t * Math.PI * 3) * 1.5]);
    }
    for (let i = 1; i <= 12; i++) {
        const t = i / 12;
        points.push([w - t * w * 0.85, 2 + t * 7 + Math.sin(t * Math.PI) * 1.5]);
    }
    return points;
};

export const makeScribble = (shape, rect) => {
    const box = shape === 'underline'
        ? { left: rect.left - 4, top: rect.bottom, width: rect.width + 8, height: 10 }
        : { left: rect.left - 16, top: rect.top - 12, width: rect.width + 32, height: rect.height + 24 };

    const points = shape === 'underline'
        ? underlinePoints(box.width)
        : circlePoints(box.width, box.height);

    return {
        ...box,
        d: points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '),
        screenPoints: points.map(([x, y]) => [box.left + x, box.top + y]),
    };
};
