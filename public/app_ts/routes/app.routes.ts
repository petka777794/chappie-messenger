import { provideRouter, RouterConfig }  from '@angular/router';
import { AppLoadComponent } from '../components/app-load.component'
import { SingInComponent } from '../components/sing-in.component';
import { ChatComponent } from '../components/chat.component';

const routes: RouterConfig = [
	{
  	path: '', component: AppLoadComponent
  },
  {
  	path: 'sing-in', component: SingInComponent
  },
  {
  	path: 'chat', component: ChatComponent
  } 
];

export const appRouterProviders = provideRouter(routes) ;