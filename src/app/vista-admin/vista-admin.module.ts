import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAdminPageRoutingModule } from './vista-admin-routing.module';

import { VistaAdminPage } from './vista-admin.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAdminPageRoutingModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
    
  ],
  declarations: [VistaAdminPage]
})
export class VistaAdminPageModule {}
