import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { CategoriesSection } from '../../components/categories-section/categories-section';
import { TrendingInNepalSection } from '../../components/trending-in-nepal-section/trending-in-nepal-section';
import { JustforyouSection } from '../../components/justforyou-section/justforyou-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, CategoriesSection, TrendingInNepalSection, JustforyouSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
