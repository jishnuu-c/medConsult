import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrRegister } from './dr-register/dr-register';
import { Drcard } from './drcard/drcard';
import { Drprofile } from './drprofile/drprofile';
import { Schedul } from './schedul/schedul';
import { Drschedul } from './drschedule/drschedul';
import { Addschedule } from './addschedule/addschedule';
import { Labresultlist } from './labresultlist/labresultlist';
import { LayoutComponent } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DrRegister,Drcard,Drprofile,Schedul,Drschedul,Addschedule,Labresultlist,LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('medconsult');
}
