import { CorkboardElementSavedConfiguration } from "../shared/typings";

const STORAGE_KEY = 'savedItems'

type ParsedCorkboardElementSavedConfiguration = {
    id: number;
    w?: number;
    h?: number;
    p?: {
        x: number,
        y: number,
    }
}

export const parseAndSaveToLocalStorage = (items: CorkboardElementSavedConfiguration[]) => {
    const parsed = items.map(i => {
        return {
            id: i.id,
            w: i.width,
            h: i.height,
            p: i.position
        }
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

export const getFromLocalStorage = (): CorkboardElementSavedConfiguration[] => {
    const storageInfo = localStorage.getItem(STORAGE_KEY);
    if (!storageInfo) return [];
    const items: ParsedCorkboardElementSavedConfiguration[] = JSON.parse(storageInfo);
    const unparsed = items.map(i => {
        return {
            id: i.id,
            width: i.w,
            height: i.h,
            position: i.p
        }
    })

    return unparsed;
}