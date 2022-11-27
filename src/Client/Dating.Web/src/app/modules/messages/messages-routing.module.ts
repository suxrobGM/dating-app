import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const rootRoutes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(rootRoutes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
