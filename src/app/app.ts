import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Loader } from './components/loader/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Home, CommonModule, Loader],
})
export class App {}
