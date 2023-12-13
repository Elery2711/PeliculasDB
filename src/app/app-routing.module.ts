import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-movie',
    loadChildren: () => import('./add-product/add-movie.module').then( m => m.AddMoviePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'view-movie',
    loadChildren: () => import('./view-movie/view-movie.module').then( m => m.ViewMoviePageModule)
  },
  {
    path: 'vista-admin',
    loadChildren: () => import('./vista-admin/vista-admin.module').then( m => m.VistaAdminPageModule)
  },
  {
    path: 'update-movie',
    loadChildren: () => import('./update-movie/update-movie.module').then( m => m.UpdateMoviePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'calificar-pelicula',
    loadChildren: () => import('./calificar-pelicula/calificar-pelicula.module').then( m => m.CalificarPeliculaPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./compras/compras.module').then( m => m.ComprasPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
