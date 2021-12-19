/**
 * Collection of logging methods. Useful for making the output easier to read and understand.
 *
 * @param msg
*/
/* tslint:disable:no-console */
export default class Log {

    public static trace(msg: string) {
        console.log("<T> " + `${new Date().toLocaleString()} `.cyan.italic + ": " + `${msg}`.bold);
    }

    public static info(msg: string) {
        console.log("<I>  " + `${new Date().toLocaleString()} `.cyan.italic + ": " + `${msg}`.green.bold);
    }

    public static warn(msg: string) {
        console.error("<W> " + `${new Date().toLocaleString()} `.cyan.italic + ": " + `${msg}`.magenta.bold);
    }

    public static error(msg: string) {
        console.error("<E> " + `${new Date().toLocaleString()} `.cyan.italic + ": " + `${msg}`.red.bold);
    }

    public static test(msg: string) {
        console.log("<X> " + `${new Date().toLocaleString()} `.cyan.italic + ": " + `${msg}`.yellow.bold);
    }
}