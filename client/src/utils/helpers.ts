export const isValidRoomId = (s: string): boolean => {
    return s.length > 0 && !s.includes(' ')
}
