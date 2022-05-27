export function getValueFromString(obj: any, path: string) : any {
    let idx = path.indexOf(".");
    if (idx >= 0) {
        let part = path.substring(0, idx);
        let left = path.substring(idx+1);
        return getValueFromString(obj[part], left);
    }
    return obj[path];
}