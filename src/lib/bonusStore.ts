import { atom } from 'nanostores'

export const bonus = atom<boolean | 'indeterminate'>(false)