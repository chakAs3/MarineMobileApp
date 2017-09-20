import { Observable } from 'rxjs/Observable';
/**
 * Configurations items that can be updated.
 */
export interface BackgroundModeConfiguration {
    /**
     * Title of the background task
     */
    title?: String;
    /**
     * The text that scrolls itself on statusbar
     */
    ticker?: String;
    /**
     * Description of background task
     */
    text?: String;
    /**
     * if true plugin will not display a notification. Default is false.
     */
    silent?: boolean;
    /**
     * By default the app will come to foreground when taping on the notification. If false, plugin wont come to foreground when tapped.
     */
    resume?: boolean;
}
/**
* @name Background Mode
* @description
* Cordova plugin to prevent the app from going to sleep while in background.
* Requires Cordova plugin: cordova-plugin-background-mode. For more info about plugin, vist: https://github.com/katzer/cordova-plugin-background-mode
*@usage
* ```typescript
* import { BackgroundMode } from 'ionic-native';
*
* BackgroundMode.enable();
* ```
 *
 * @interfaces
 * BackgroundModeConfiguration
*/
export declare class BackgroundMode {
    /**
    * Enable the background mode.
    * Once called, prevents the app from being paused while in background.
    */
    static enable(): void;
    /**
    * Disable the background mode.
    * Once the background mode has been disabled, the app will be paused when in background.
    */
    static disable(): Promise<any>;
    /**
    * Checks if background mode is enabled or not.
    * @returns {boolean} returns a boolean that indicates if the background mode is enabled.
    */
    static isEnabled(): boolean;
    /**
    * Can be used to get the information if the background mode is active.
    * @returns {boolean} returns a boolean that indicates if the background mode is active.
    */
    static isActive(): boolean;
    /**
    * Override the default title, ticker and text.
    * Available only for Android platform.
    * @param {Configure} options List of option to configure. See table below
    */
    static setDefaults(options?: BackgroundModeConfiguration): Promise<any>;
    /**
    * Modify the displayed information.
    * Available only for Android platform.
    * @param {Configure} options Any options you want to update. See table below.
    */
    static configure(options?: BackgroundModeConfiguration): Promise<any>;
    /**
    * Called when background mode is activated.
    * @returns {Observable<any>} returns an observable that emits when background mode is activated
    */
    static onactivate(): Observable<any>;
    /**
    * Called when background mode is deactivated.
    * @returns {Observable<any>} returns an observable that emits when background mode is deactivated
    */
    static ondeactivate(): Observable<any>;
    /**
    * Called when background mode fails
    * @returns {Observable<any>} returns an observable that emits when background mode fails
    */
    static onfailure(): Observable<any>;
}
