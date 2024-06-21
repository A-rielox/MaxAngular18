import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
   declarations: [AppComponent, HeaderComponent, UserComponent],
   bootstrap: [AppComponent],
   imports: [BrowserModule, SharedModule, TasksModule],
   //imports: [BrowserModule, HeaderComponent, UserComponent, TasksComponent], // los pongo en imports y no en declarations xq son stand alone, si NO fueran standalone => los pongo en declarations: []
   // => declarations: [] p' No standAlone e imports: [] p' standAlone
})
export class AppModule {}
