import { ModuleWithProviders, NgModule } from '@angular/core';
import { OPEN_FOOD_FACT_SERVICE_ROUTE_PROVIDERS } from './providers/route.provider';

@NgModule()
export class OpenFoodFactServiceConfigModule {
  static forRoot(): ModuleWithProviders<OpenFoodFactServiceConfigModule> {
    return {
      ngModule: OpenFoodFactServiceConfigModule,
      providers: [OPEN_FOOD_FACT_SERVICE_ROUTE_PROVIDERS],
    };
  }
}
