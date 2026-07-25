import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard | Brag-Bot'
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    title: 'Detalhe da Conquista | Brag-Bot'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

