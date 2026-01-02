import { NgModule } from '@angular/core';
import { LucideAngularModule, Home, Search, User, Trash } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      // Add icons here
      Home,
      Search,
      User,
      Trash,
    }),
  ],

  exports: [LucideAngularModule],
})
export class IconsModule {}
