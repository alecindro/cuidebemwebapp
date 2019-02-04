var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
    { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
    { path: 'checkin', loadChildren: './checkin/checkin.module#CheckinPageModule', runGuardsAndResolvers: 'always' },
    { path: 'details', loadChildren: './tabs/tabs.module#TabsPageModule', runGuardsAndResolvers: 'always' },
    { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule', runGuardsAndResolvers: 'always' },
    { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosPageModule', runGuardsAndResolvers: 'always' },
    { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule', runGuardsAndResolvers: 'always' },
    { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule', runGuardsAndResolvers: 'always' },
    { path: 'senha', loadChildren: './senha/senha.module#SenhaPageModule', runGuardsAndResolvers: 'always' },
    { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesPageModule', runGuardsAndResolvers: 'always' },
    { path: 'responsavel', loadChildren: './responsavel/responsavel.module#ResponsavelPageModule', runGuardsAndResolvers: 'always' },
    { path: 'usuarios', loadChildren: './cuidador/cuidador.module#CuidadorPageModule', runGuardsAndResolvers: 'always' },
    { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule', runGuardsAndResolvers: 'always' },
    { path: 'agendas', loadChildren: './agenda/agenda.module#AgendaPageModule', runGuardsAndResolvers: 'always' },
    { path: 'paciente', loadChildren: './paciente/paciente.module#PacientePageModule', runGuardsAndResolvers: 'always' },
    { path: 'responsaveis', loadChildren: './responsaveis/responsaveis.module#ResponsaveisPageModule', runGuardsAndResolvers: 'always' },
    { path: 'modalTelefone', loadChildren: './modal-telefone/modal-telefone.module#ModalTelefonePageModule', runGuardsAndResolvers: 'always' },
    { path: 'cuidador-detail', loadChildren: './cuidador-detail/cuidador-detail.module#CuidadorDetailPageModule', runGuardsAndResolvers: 'always' },
    { path: 'memo', loadChildren: './memo/memo.module#MemoPageModule', runGuardsAndResolvers: 'always' },
    { path: 'photo-modal', loadChildren: './photo-modal/photo-modal.module#PhotoModalPageModule', runGuardsAndResolvers: 'always' },
    { path: 'evento-modal', loadChildren: './evento-modal/evento-modal.module#EventoModalPageModule', runGuardsAndResolvers: 'always' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map