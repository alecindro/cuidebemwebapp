import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ConfiguracoesPageModule } from './configuracoes/configuracoes.module';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'checkin', loadChildren: './checkin/checkin.module#CheckinPageModule',runGuardsAndResolvers: 'always' },
  { path: 'details', loadChildren: './tabs/tabs.module#TabsPageModule',runGuardsAndResolvers: 'always' },
  { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule', runGuardsAndResolvers: 'always' },
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosPageModule',runGuardsAndResolvers: 'always' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule',runGuardsAndResolvers: 'always' },
  { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule',runGuardsAndResolvers: 'always'},
  { path: 'senha', loadChildren: './senha/senha.module#SenhaPageModule',runGuardsAndResolvers: 'always' },
  { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesPageModule',runGuardsAndResolvers: 'always' },
  { path: 'responsavel', loadChildren: './responsavel/responsavel.module#ResponsavelPageModule',runGuardsAndResolvers: 'always' },
  { path: 'usuarios', loadChildren: './cuidador/cuidador.module#CuidadorPageModule',runGuardsAndResolvers: 'always' },
  { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule',runGuardsAndResolvers: 'always' },
  { path: 'agendas', loadChildren: './agenda/agenda.module#AgendaPageModule',runGuardsAndResolvers: 'always' },
  { path: 'paciente', loadChildren: './paciente/paciente.module#PacientePageModule',runGuardsAndResolvers: 'always' },
  { path: 'responsaveis', loadChildren: './responsaveis/responsaveis.module#ResponsaveisPageModule',runGuardsAndResolvers: 'always' },
  { path: 'modalTelefone', loadChildren: './modal-telefone/modal-telefone.module#ModalTelefonePageModule',runGuardsAndResolvers: 'always' },
  { path: 'cuidador-detail', loadChildren: './cuidador-detail/cuidador-detail.module#CuidadorDetailPageModule',runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
