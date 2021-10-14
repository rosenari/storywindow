export default interface Action {
    toJSON(): { type: string };
}