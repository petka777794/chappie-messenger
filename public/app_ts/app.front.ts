
import { bootstrap } from '@angular/platform-browser-dynamic';
import { appRouterProviders } from './routes/app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { HTTP_PROVIDERS } from '@angular/http';

import {enableProdMode} from '@angular/core';
enableProdMode();

bootstrap(AppComponent, [
	appRouterProviders, 
	disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  ]).catch((err: any) => console.error(err));  