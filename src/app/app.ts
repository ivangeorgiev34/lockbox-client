import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MsalModule} from "@azure/msal-angular"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MsalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lockbox');
}
