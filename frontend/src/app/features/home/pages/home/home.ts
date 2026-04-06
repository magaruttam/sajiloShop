import { Component } from '@angular/core';
import { HeroSection } from "../../components/hero-section/hero-section";
import { CategoriesSection } from "../../components/categories-section/categories-section";
import { TrendinginNepalSection } from "../../components/trending-in-nepal-section/trending-in-nepal-section";

@Component({
  selector: 'app-home',
  imports: [HeroSection, CategoriesSection, TrendinginNepalSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
