

export const capitalizeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.toLowerCase().substring(1);
}