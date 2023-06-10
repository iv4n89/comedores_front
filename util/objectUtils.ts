

export namespace ObjectUtil {
    export const isEmpty = (object: Object) => {
        return Object.keys(object).length === 0;
    }

    export const isIdCero = (id: number) => {
        return id === 0;
    }
}