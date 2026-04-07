import { Component } from '@angular/core';
import { HeroSection } from "../../components/hero-section/hero-section";
import { CategoriesSection } from "../../components/categories-section/categories-section";
import { TrendinginNepalSection } from "../../components/trending-in-nepal-section/trending-in-nepal-section";
import { ProductCard } from "../../../../shared/components/product-card/product-card";

@Component({
  selector: 'app-home',
  imports: [HeroSection, CategoriesSection, TrendinginNepalSection, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
