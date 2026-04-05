import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Base } from './layouts/base/base/base';

export const routes: Routes = [
  { path: '', component: Base, children: [{ path: '', component: Home }] },
];
