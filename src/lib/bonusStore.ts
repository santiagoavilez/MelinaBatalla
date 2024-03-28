import { atom, map } from 'nanostores'

export const bonus = atom<boolean | 'indeterminate'>(false)

import { persistentAtom } from '@nanostores/persistent'

export const completedLessonsStore = map<Record<number,string>>({});

export type CompletedLessonsStore ={
    status: 'completado' | 'no disponible' | 'disponible'
}



export const persistentCompletedLessons = persistentAtom<{ id: number, isCompleted: string, slug: string }[] | null>('completedLessons', null, {
    encode: JSON.stringify,
    decode: JSON.parse,
})




export const $lessonsatom = atom<{ slug: string, id: number, name: string, isCompleted: boolean }[]>([
    {
        id: 0,
        name: 'Atrae clientes comprometidos con su proceso',
        slug: 'atrae-clientes-comprometidos',
        isCompleted: false
    },
    {
        id: 1,
        name: 'Aprende a crear contenido funcional sin sacrificar tu paz',
        slug: 'crea-contenido-funcional',
        isCompleted: false
    },
    {
        id: 2,
        name: 'Obtén seguridad con una estrategia clara',
        slug: 'obten-seguridad',
        isCompleted: false
    },
    {
        id: 3,
        name: 'Aprende a enfocar tu energía',
        slug: 'enfoca-tu-energia',
        isCompleted: false
    },
    {
        id: 4,
        name: 'Salvavidas',
        slug: 'salvavidas',
        isCompleted: false
    },
    {
        id: 5,
        name: 'Potenciador',
        slug: 'potenciador',
        isCompleted: false
    }
])


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