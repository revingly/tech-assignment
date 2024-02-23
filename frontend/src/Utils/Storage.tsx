export function setItem(key: string, item: string): void {
    localStorage.setItem(key, item);
}

export function getItem(key: string): string | null {
    return localStorage.getItem(key);
}

export function removeItem(key: string): void {
    return localStorage.removeItem(key);
}