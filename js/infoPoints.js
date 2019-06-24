const MAX_RADIUS = Math.max(window.innerHeight, window.innerWidth) * 0.20;
const MIN_THRESHOLD = Math.min(window.innerHeight, window.innerWidth) * 0.05;
function cartesianDistance({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    return Math.sqrt(
        Math.abs(x1 - x2) ** 2 +
        Math.abs(y1 - y2) ** 2
    );
}

function dontTouch({ center: center1, radius: radius1 }, { center: center2, radius: radius2 }) {
    const centerDistance = cartesianDistance(center1, center2);
    const actualDistance = (radius1 + radius2);
    console.log(centerDistance, actualDistance);
    return centerDistance > actualDistance + MIN_THRESHOLD;
}

function withinBounds({ center: { x, y }, radius }) {
    console.log(x, y, window.innerWidth, window.innerHeight, radius);
    const overFlowsHorizontal = x - radius < MIN_THRESHOLD || x + radius > window.innerWidth - MIN_THRESHOLD;
    const overFlowsVertical = y - radius < MIN_THRESHOLD || y + radius > window.innerHeight - MIN_THRESHOLD;
    return !overFlowsHorizontal && !overFlowsVertical
}

function getNewCircle(radius, previousCircles, called = 0) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const circle = {
        center: {
            x,
            y,
        },
        radius,
    };
    if (withinBounds(circle) &&
        previousCircles.every(previousCircle => dontTouch(circle, previousCircle))) {
        return circle;
    }
    if (called > 500) {
        console.log(circle, called, previousCircles);
        throw Error();
    }
    return getNewCircle(radius, previousCircles, called + 1);
}
function addCoordinates(infoPoints) {
    const previousCircles = [];
    return infoPoints.map(infoPoint => {
        const circle = getNewCircle(infoPoint.radius, previousCircles);
        previousCircles.push(circle);
        infoPoint.center = circle.center;
        return infoPoint;
    })
}
const infoPoints = [
    {
        type: 'text',
        text: 'Pradyumna Newalkar',
        radius: MAX_RADIUS,
    },
    {
        type: 'text',
        text: 'Full Stack Developer',
        radius: 0.5 * MAX_RADIUS,
    },
    {
        type: 'text',
        text: 'Machine Learning Engineer',
        radius: 0.5 * MAX_RADIUS,
    },
    {
        type: 'link',
        text: 'Facebook Link',
        href: 'http://example.com',
        radius: 0.25 * MAX_RADIUS,
    },
    {
        type: 'link',
        text: 'Twitter Link',
        href: 'http://example.com',
        radius: 0.25 * MAX_RADIUS,  
    }
];

export default addCoordinates(infoPoints);
