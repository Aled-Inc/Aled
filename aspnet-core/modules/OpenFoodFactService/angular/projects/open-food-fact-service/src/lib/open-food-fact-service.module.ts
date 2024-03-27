import { NgModule, NgModuleFactory, ModuleWithProviders } from '@angular/core';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { OpenFoodFactServiceComponent } from './components/open-food-fact-service.component';
import { OpenFoodFactServiceRoutingModule } from './open-food-fact-service-routing.module';

@NgModule({
  declarations: [OpenFoodFactServiceComponent],
  imports: [CoreModule, ThemeSharedModule, OpenFoodFactServiceRoutingModule],
  exports: [OpenFoodFactServiceComponent],
})
export class OpenFoodFactServiceModule {
  static forChild(): ModuleWithProviders<OpenFoodFactServiceModule> {
    return {
      ngModule: OpenFoodFactServiceModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<OpenFoodFactServiceModule> {
    return new LazyModuleFactory(OpenFoodFactServiceModule.forChild());
  }
}
