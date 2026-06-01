export function isValidUUID(id: string): boolean {
    return typeof id === 'string' && id.length === 36;
}