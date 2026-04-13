import { Component } from '@angular/core';
import { SearchBox } from '../../../shared/components/search-box/search-box';

@Component({
  selector: 'app-vendor-header',
  imports: [SearchBox],
  templateUrl: './vendor-header.html',
  styleUrl: './vendor-header.scss',
})
export class VendorHeader {}
