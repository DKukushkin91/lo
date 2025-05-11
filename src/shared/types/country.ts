export default interface ICountry {
    id: number;
    nameOwn: string;
    name: string;
    fullName: string;
    code: string;
    icons: {
        circle: string;
    };
    phones: {
        isMain: number;
        code: string;
        length: number;
        mask: string;
    }[];
}
