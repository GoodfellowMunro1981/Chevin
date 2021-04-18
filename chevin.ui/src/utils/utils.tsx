
export type SelectItem = {
    id: string;
    name: string;
}

export const EnumToArray = (obj: any): SelectItem[] => {

    return Object.entries(obj).map(x => {
        return { id: x[0], name: x[0] }
    })
}