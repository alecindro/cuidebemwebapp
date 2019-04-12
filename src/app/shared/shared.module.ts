import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';
import { IconEventPipe } from './icon-event.pipe';


@NgModule({
    declarations: [HasAnyAuthorityDirective,IconEventPipe],
    exports: [HasAnyAuthorityDirective,IconEventPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
