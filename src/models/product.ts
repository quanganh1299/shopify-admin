export interface TProduct {
    id: string;
    image: string;
    title: string;
    rules: {
        title: string;
        start: string;
        end: string;
        buyFrom: number;
        buyTo: number;
        discount: number;
    }[];
    lastUpdate: string;
    status: string;
    action: string;
    [key: string]: unknown;
}
