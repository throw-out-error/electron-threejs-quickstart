export function polar(radian1: number, radian2: number, radius: number) {
    return [
        Math.cos(radian1) * Math.cos(radian2) * radius,
        Math.sin(radian1) * radius,
        Math.cos(radian1) * Math.sin(radian2) * radius,
    ];
}
