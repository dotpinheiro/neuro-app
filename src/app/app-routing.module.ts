import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import {SupabaseClient} from "@supabase/supabase-js";

const routes: Routes = [

  {
    path: '',
    redirectTo: () => {
      return localStorage.getItem('logged') ? '/tabs/medications' : '/auth';
    },
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'prescriptions',
        loadChildren: () => import('./prescription/prescription.module').then( m => m.PrescriptionPageModule)
      },
      {
        path: 'medications',
        loadChildren: () => import('./medications/medications.module').then( m => m.MedicationsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/medications',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'additional-info',
    loadChildren: () => import('./additional-info/additional-info.module').then( m => m.AdditionalInfoPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'prescription',
    loadChildren: () => import('./prescription/prescription.module').then( m => m.PrescriptionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
