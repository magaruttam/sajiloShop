import { Component } from '@angular/core';
import { Header } from '../../header/header/header';
import { Footer } from '../../footer/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base {}
