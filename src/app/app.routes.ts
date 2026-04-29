import { Routes } from '@angular/router';
import { Register } from './register/register';
import { LoginPage } from './loginpage/loginpage';
import { DrRegister } from './dr-register/dr-register';
import { Drcard } from './drcard/drcard';
import { Drprofile } from './drprofile/drprofile';
import { Schedul } from './schedul/schedul';
import { Drschedul } from './drschedule/drschedul';
import { Addschedule } from './addschedule/addschedule';

import { Labresultlist } from './labresultlist/labresultlist';
import { LayoutComponent } from './layout/layout';
import { Alllabresults } from './alllabresults/alllabresults';
import { Appointment } from './appointment/appointment';


export const routes: Routes = [
    { path: '', redirectTo: 'drregister', pathMatch: 'full' },
    {path:'register',component:Register},
    { path: 'login', component: LoginPage },
    { path: 'drregister', component: DrRegister },
    { path: 'doctors', component: Drcard },
    { path: 'drprofile/:id', component: Drprofile },
    { path: 'schedule/:id', component: Schedul },
    { path: 'drschedule/:id', component: Drschedul },
    { path: 'addschedule/:id', component: Addschedule },
    { path: 'labresults/:id', component: Labresultlist },
     { path: 'layout', component: LayoutComponent },
     { path: 'allresults', component: Alllabresults },
     { path: 'appointments', component: Appointment },
   
];
