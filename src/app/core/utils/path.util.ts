export class PathUtils {
    static getLastSegment(path: string): string {
        if (!path || path.length === 0) {
            return null;
        }

        const normalized = path.charAt(path.length - 1) === '/' ? path.substr(0, path.length - 1) : path;
        const lastSlashIndex = normalized.lastIndexOf('/');
        return normalized.substring(lastSlashIndex + 1);
    }
}