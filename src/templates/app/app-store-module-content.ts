export function appStoreModuleContent() {
  return `import { reducers, initialState } from './app.state';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActionCreator } from './action-creator';

// import AppStoreModule.forRoot() in the AppModule
@NgModule({
  imports: [
    StoreModule.forRoot({ reducers }, initialState),
    EffectsModule.forRoot() // ,
    // not working yet - @ngrx/platform v4
    // !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  exports: [StoreModule]
})
export class AppStoreModule {
  static forRoot() {
    return {
      ngModule: AppStoreModule,
      providers: [ActionCreator]
    };
  }
}
`;
}
