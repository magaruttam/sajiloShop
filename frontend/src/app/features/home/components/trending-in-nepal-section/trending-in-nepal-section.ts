import { Component } from '@angular/core';

@Component({
  selector: 'app-trending-in-nepal-section',
  imports: [],
  templateUrl: './trending-in-nepal-section.html',
  styleUrl: './trending-in-nepal-section.scss',
})
  
export class TrendingInNepalSection{
  trendingProducts = [
    {
      id: 1,
      title: 'Organic Cotton Script Tee',
      price: '1,850',
      image: '/images/tree.webp',
      badge: 'NEW ARRIVAL'
    },
    {
      id: 2,
      title: 'Hammered Copper Vessel',
      price: '2,400',
      image: '/images/bottle.webp'
    },
    {
      id: 3,
      title: 'Brass Panas Pair',
      price: '4,500',
      image: '/images/tea.webp'
    }]
  }

