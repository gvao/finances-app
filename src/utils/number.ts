export const convertTextInNumber = (textContent: string | null) =>
Number(textContent?.replace("R$ ", "").replace(",", ".").trim());

export const validateNumber = (input: string | null) => {
    if (!input) return null;

    const numberString = getSomeNumbers(input);

    return convertTextInNumber(numberString);
};

export const getSomeNumbers = (input?: string) => {
    if (!input) throw new Error("Input does not contain numbers");
    const numberSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const charSet = [",", "-", "+"];

    const filterNumbers = (character: string) =>
        charSet.includes(character) ||
        numberSet.includes(Number(character));

    return input!.split("").filter(filterNumbers).join("").trim();
};