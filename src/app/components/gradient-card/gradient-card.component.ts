import { Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Gradient } from 'src/app/types/Gradient';

@Component({
	selector: 'app-gradient-card',
	templateUrl: './gradient-card.component.html',
	styleUrls: ['./gradient-card.component.scss'],
})
export class GradientCardComponent implements OnInit {
	constructor(private snackbar: MatSnackBar, private authService: AuthService) {}

	ngOnInit(): void {}

	@Input() gradient: Gradient = {
		id: 0,
		name: 'Hyper',
		colors: 'rgb(233, 213, 255), rgb(192, 132, 252), rgb(107, 33, 168)',
		direction: 'to right',
		is_favorite: false,
	};

	@ViewChildren('gradientElement') gradientElement: ElementRef[] = [];

	gradientColors: string[] = [];
	isLoggedIn = this.authService.loggedIn();

	changeDirection(event: Event, direction: string) {
		/**
		 * Regex for `linear-gradient()`
		 * that captures `linear-gradient(` and `linear-gradient(to right,` and other directions if available
		 */
		const gradientDirectionRegex = /linear-gradient\((to[a-z\s]+,)?/;

		// Getting the gradient element from the DOM
		const gradient = (
			event.target as HTMLElement
		).parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector('#gradient_element') as HTMLElement;

		// Converting regex match to an array of strings
		let matchResult = gradient.style.background.match(gradientDirectionRegex) as Array<string>;

		// This check is needed because when a linear-gradient direction is set to `to bottom` the browser
		// automatically removes it thus making it tedious to deal with

		// Checking if the linear-gradient direction is found
		if (matchResult[1]) {
			// Removing the `,` from the regex match so it can be used in the replace function
			matchResult[1] = matchResult[1].replace(',', '');

			// Replacing the direction in the current background to the one that is passed into the function
			gradient.style.background = gradient.style.background.replace(matchResult[1], direction);
		} else {
			// Replace the current gradient style with first match result `linear-gradient(` with `linear-gradient(to bottom,` where `to bottom`
			// would be the direction passed in by the user.
			let newGradient = gradient.style.background.replace(matchResult[0], matchResult[0].concat(direction.concat(', ')));

			// Setting the newly formed string as the gradient element background
			gradient.style.background = newGradient;
		}
	}

	ngAfterViewInit(): void {
		this.gradientElement.forEach((element: ElementRef) => {
			element.nativeElement.style.background = `linear-gradient(${this.gradient.direction}, ${this.gradient.colors}) no-repeat`;

			let gradientBackground = element.nativeElement.style.background;

			// The set time out here forces Angular to put this function in the next change detection cycle instead of the current
			// Bug Bypass: https://angular.io/errors/NG0100
			setTimeout(() => {
				this.gradientColors = Array.from(gradientBackground.matchAll(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g)).map((match: any) => {
					return match.toString();
				});
			}, 0);
		});
	}

	/**
	 * A helper method that copies the CSS gradient for the selected component by fetching the elements CSS background property
	 * @param clickedElement The element that has the gradient style on the background property
	 */
	copyGradient(clickedElement: HTMLElement): void {
		const gradient = `background: ${clickedElement.style.background};`;
		navigator.clipboard.writeText(gradient);
		this.snackbar.open('Copied to clipboard', 'OK', {
			duration: 3000,
			panelClass: ['blue-snackbar'],
		});
	}

	/**
	 * A helper method that write the specified color in an array to the users clipboard
	 * @param color Writes the color passed to the function to the users clipboard
	 */
	copyColor(color: string): void {
		navigator.clipboard.writeText(color);
		this.snackbar.open('Color copied to clipboard', 'OK', {
			duration: 5000,
		});
	}
}
