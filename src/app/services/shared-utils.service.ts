import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SharedUtilsService {
	constructor() {}

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
	devlog(message: any): void {
		if (!environment.production) {
			alert(JSON.stringify(message, undefined, 3));
		} else {
			alert("An unknown error occured check the developer's console");
			console.log(message);
		}
	}

	/**
	 * Scroll to the first element that is a descendant of node that matches selectors or returns false if not found
	 * @param selector CSS selector for desired element
	 */
	scrollToElement(selector: string): void | false {
		const element = document.querySelector(selector);
		const elementExists = !!element;

		if (elementExists) {
			element.scrollIntoView({ behavior: 'smooth' });
		}

		return false;
	}
}
