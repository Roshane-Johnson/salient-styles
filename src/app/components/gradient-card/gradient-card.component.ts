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
  // convertedVals: any[] = [];

  ngOnInit(): void {
    // let rgbValues = [
    //   'linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))',
    //   'linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',
    //   'linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))',
    //   'linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))',
    //   'linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))',
    //   'linear-gradient(to right, rgb(254, 249, 195), rgb(253, 224, 71), rgb(234, 179, 8))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(34, 197, 94))',
    //   'linear-gradient(to right, rgb(229, 231, 235), rgb(156, 163, 175), rgb(75, 85, 99))',
    //   'linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))',
    //   'linear-gradient(to right, rgb(187, 247, 208), rgb(134, 239, 172), rgb(59, 130, 246))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(250, 204, 21), rgb(161, 98, 7))',
    //   'linear-gradient(to right, rgb(187, 247, 208), rgb(74, 222, 128), rgb(126, 34, 206))',
    //   'linear-gradient(to right, rgb(254, 202, 202), rgb(220, 38, 38))',
    //   'linear-gradient(to right, rgb(134, 239, 172), rgb(253, 224, 71), rgb(249, 168, 212))',
    //   'linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))',
    //   'linear-gradient(to right, rgb(187, 247, 208), rgb(34, 197, 94))',
    //   'linear-gradient(to right, rgb(233, 213, 255), rgb(192, 132, 252), rgb(107, 33, 168))',
    //   'linear-gradient(to right, rgb(156, 163, 175), rgb(75, 85, 99), rgb(30, 64, 175))',
    //   'linear-gradient(to right, rgb(219, 234, 254), rgb(147, 197, 253), rgb(59, 130, 246))',
    //   'linear-gradient(to right, rgb(187, 247, 208), rgb(74, 222, 128), rgb(34, 197, 94))',
    //   'linear-gradient(to right, rgb(192, 132, 252), rgb(250, 204, 21))',
    //   'linear-gradient(to right, rgb(248, 113, 113), rgb(209, 213, 219), rgb(59, 130, 246))',
    //   'linear-gradient(to right, rgb(153, 27, 27), rgb(202, 138, 4), rgb(234, 179, 8))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(234, 179, 8))',
    //   'linear-gradient(to right, rgb(147, 197, 253), rgb(187, 247, 208), rgb(253, 224, 71))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(134, 239, 172))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(253, 224, 71), rgb(250, 204, 21))',
    //   'linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))',
    //   'linear-gradient(to right, rgb(134, 239, 172), rgb(192, 132, 252))',
    //   'linear-gradient(to right, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))',
    //   'linear-gradient(to right, rgb(244, 114, 182), rgb(219, 39, 119))',
    //   'linear-gradient(to right, rgb(202, 138, 4), rgb(220, 38, 38))',
    //   'linear-gradient(to right, rgb(34, 197, 94), rgb(21, 128, 61))',
    //   'linear-gradient(to right, rgb(239, 68, 68), rgb(34, 197, 94))',
    //   'linear-gradient(to right, rgb(234, 88, 12), rgb(249, 115, 22))',
    //   'linear-gradient(to right, rgb(101, 163, 13), rgb(253, 224, 71), rgb(220, 38, 38))',
    //   'linear-gradient(to right, rgb(190, 18, 60), rgb(219, 39, 119))',
    //   'linear-gradient(to right, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))',
    //   'linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
    //   'linear-gradient(to right, rgb(56, 189, 248), rgb(251, 113, 133), rgb(163, 230, 53))',
    //   'linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))',
    //   'linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))',
    //   'linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))',
    //   'linear-gradient(rgb(249, 115, 22), rgb(253, 224, 71))',
    //   'linear-gradient(to right, rgb(251, 113, 133), rgb(253, 186, 116))',
    // ];
    // rgbValues.forEach((value: string) => {
    //   const matched = (
    //     value.match(
    //       /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
    //     ) as RegExpMatchArray
    //   ).concat('end');
    //   this.convertedVals.push(
    //     `${this.rgb2hex(matched[1], matched[2], matched[3])} `
    //   );
    // });
    // Ended at gradient called 'Morninsg'
  }

  changeDirection(event: any, direction: string) {
    const gradient = (
      event.target as HTMLElement
    ).parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
      '#gradient_element'
    ) as HTMLElement;

    gradient.style.background = gradient.style.background.replace(
      gradient.style.background.match(/to\w?[a-z\s]+/)?.toString() as string,
      direction
    );
  }

  // rgb2hex = (r: any, g: any, b: any) => {
  //   var rgb = (r << 16) | (g << 8) | b;
  //   return '#' + rgb.toString(16).padStart(6, '0');
  // };

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
