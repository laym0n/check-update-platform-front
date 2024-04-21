export default class NotAuthorizedError extends Error {
    constructor(message: string = "User not authorized") {
        super(message);
    }
}
