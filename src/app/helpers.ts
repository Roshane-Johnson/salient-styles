import { environment } from 'src/environments/environment';

export class Utilities {
  /**
   * This function will check if the `text` parameter contains upper and lowercase
   * @param text String you would like to run the check for
   * @returns `boolean`
   */
  containsUpperAndLower(text: string) {
    return /[a-z]/.test(text) && /[A-Z]/.test(text) ? true : false;
  }

  /**
   * This function will check if the `text` parameter contains a number or symbol
   * @param text String you would like to run the check for
   * @returns `boolean`
   */
  containsNumberOrSymbol(text: string) {
    return /[0-9]/.test(text) || /[.*]/.test(text) ? true : false;
  }

  /**
   * This function will check if the `text` parameter contains the `email` provided
   * @param email Email you would like to test for in `text`
   * @param text String you would like to run the check for
   * @returns `boolean`
   */
  containsEmail(email: string, text: string) {
    if (email == '' || text == '') {
      return true;
    }

    return text.includes(email) ? true : false;
  }

  /**
   * This function will log the `message` variable if the application is NOT in production mode
   * the production mode is checked from the `environment.ts` file
   * @param message Item you would like to log to console
   */
  public static devLog(message: any): void {
    if (!environment.production) {
      console.log('Dev Mode:', message);
    } else {
      console.log('Prod Mode', 'An unknown error occured');
    }
  }
}
