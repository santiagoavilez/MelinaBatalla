import { atom, map } from 'nanostores'

export const bonus = atom<boolean | 'indeterminate'>(false)

export const completedLessonsStore = map<Record<number, string>>({});



export function addLessonCompleted({ id, status }: {id: number, status: string}) {
    const existingEntry = completedLessonsStore.get()[id];

    if (!existingEntry) {
        completedLessonsStore.setKey(
            id,
            status
        );
    }
}
export function isPreviousLessonCompleted(id: number) {
    return id === 0 || completedLessonsStore.get()[id - 1];
}


export function getLessonStatus(id: number) {
    const existingEntry = completedLessonsStore.get()[id];

    if (existingEntry) {
        return "completado";
    } else if (id === 0) {
        return "disponible";
    } else {
        return "no disponible";
    }
}