export {};

declare global {
    interface Dictionary<T> {
        [Key: string]: T;
    }

    type Styles = Dictionary<string>;
}
