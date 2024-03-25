import { atom, deepMap, map } from 'nanostores'

export const bonus = atom<boolean | 'indeterminate'>(false)

export const completedLessonsStore = map<Record<number,string>>({});

export const $lessons = deepMap({lessons:[{

}]})

export const $lessonsmap = map<Record<number, { slug: string, id: number, name: string, isCompleted: boolean }>>()


export const $lessonsatom = atom<{ slug: string, id: number, name: string, isCompleted: boolean }[]>([])


export const $lesonSlug = atom<{ slug: string, courseSlug: string } | null>(null)

export const $courseSlug = atom<string | null>('root-program')

export function addLessonCompleted({ id, status }: {id: number, status: string}) {
    const existingEntry = completedLessonsStore.get()[id];

    if (!existingEntry) {
        completedLessonsStore.setKey(
            id,
            status
        );
    }
}

export function addLessonCompletedTomap({ id}: { id: number }) {
    const array = $lessonsatom.get();
    const { isCompleted, ...rest } = $lessonsatom.get()[id];

    array[id] = { ...rest, isCompleted: true };
    $lessonsatom.set(array);
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