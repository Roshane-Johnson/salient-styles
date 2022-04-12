import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Gradient } from 'src/app/types/Gradient';

@Component({
  selector: 'app-gradient-card',
  templateUrl: './gradient-card.component.html',
  styleUrls: ['./gradient-card.component.scss'],
})
export class GradientCardComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  @Input() gradient: Gradient = {
    id: 0,
    name: 'Hyper',
    colors: 'rgb(233, 213, 255), rgb(192, 132, 252), rgb(107, 33, 168)',
    direction: 'to bottom from left',
    is_favorite: false,
  };

  @ViewChildren('gradientElement') gradientElement: ElementRef[] = [];

  gradientColors: string[] = [];
  isLoggedIn = this.authService.loggedIn();

  ngOnInit(): void {}

  changeDirection(event: any, direction: string) {
    const gradient = (
      event.target as HTMLElement
    ).parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
      '#gradient_element'
    ) as HTMLElement;
    // TODO: Make better regex for detecting linear gradient direction the current one is not good
    gradient.style.background = gradient.style.background.replace(
      gradient.style.background.match(/to\w?[a-z\s]+/)?.toString() as string,
      direction
    );
  }

  /**
   * A callback method that is invoked after the page view is initialized for the first time.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterViewInit(): void {
    this.gradientElement.forEach((element: ElementRef) => {
      element.nativeElement.style.background = `linear-gradient(${this.gradient.direction}, ${this.gradient.colors}) no-repeat`;

      let gradientBackground = element.nativeElement.style.background;

      // The set time out here forces Angular to put this function in the next change detection cycle instead of the current
      // Bug Bypass: https://angular.io/errors/NG0100
      setTimeout(() => {
        this.gradientColors = Array.from(
          gradientBackground.matchAll(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g)
        ).map((match: any) => {
          return match.toString();
        });
      }, 0);
    });
  }

  /**
   * A helper method that copies the css gradient for the selected component by fetching the elements css background property
   * @param clickedElement The element that has the gradient style on the background property
   */
  copyGradient(clickedElement: HTMLElement): void {
    const gradient = `background: ${clickedElement.style.background};`;
    navigator.clipboard.writeText(gradient);
    this.snackbar.open('Gradient copied to clipboard', 'OK', {
      duration: 5000,
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
