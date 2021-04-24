/*eslint no-console: "off"*/

/**
 * Write message to console
 * @param message
 */
export const write = (message: unknown): void => {
    console.log(JSON.stringify(message, null, 2));
};
/**
 * Write Error message to console
 * @param message
 */
export const error = (message: string | Error): void => {
    console.error(message);
};

/**
 * Write warn message to console
 * @param message
 */
export const warn = (message: string | Error | unknown): void => {
    console.warn(JSON.stringify(message, null, 2));
};
