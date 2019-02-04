import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';


@NgModule({
    declarations: [HasAnyAuthorityDirective],
    exports: [HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
