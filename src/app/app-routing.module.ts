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
  { path: 'checkin', canActivate: [AuthGuardService],loadChildren: './checkin/checkin.module#CheckinPageModule',runGuardsAndResolvers: 'always' },
  { path: 'details', canActivate: [AuthGuardService],loadChildren: './tabs/tabs.module#TabsPageModule',runGuardsAndResolvers: 'always' },
  { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule', runGuardsAndResolvers: 'always' },
  { path: 'cadastros', canActivate: [AuthGuardService],loadChildren: './cadastros/cadastros.module#CadastrosPageModule',runGuardsAndResolvers: 'always' },
  { path: 'logout', canActivate: [AuthGuardService],loadChildren: './logout/logout.module#LogoutPageModule',runGuardsAndResolvers: 'always' },
  { path: 'configuracoes', canActivate: [AuthGuardService],loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule',runGuardsAndResolvers: 'always'},
  { path: 'senha', canActivate: [AuthGuardService],loadChildren: './senha/senha.module#SenhaPageModule',runGuardsAndResolvers: 'always' },
  { path: 'pacientes', canActivate: [AuthGuardService],loadChildren: './pacientes/pacientes.module#PacientesPageModule',runGuardsAndResolvers: 'always' },
  { path: 'responsavel', canActivate: [AuthGuardService],loadChildren: './responsavel/responsavel.module#ResponsavelPageModule',runGuardsAndResolvers: 'always' },
  { path: 'usuarios', canActivate: [AuthGuardService],loadChildren: './cuidador/cuidador.module#CuidadorPageModule',runGuardsAndResolvers: 'always' },
  { path: 'usuario', canActivate: [AuthGuardService],loadChildren: './usuario/usuario.module#UsuarioPageModule',runGuardsAndResolvers: 'always' },
  { path: 'agenda', canActivate: [AuthGuardService],loadChildren: './agendadef/agendadef.module#AgendaDefPageModule',runGuardsAndResolvers: 'always' },
  { path: 'paciente', canActivate: [AuthGuardService],loadChildren: './paciente/paciente.module#PacientePageModule',runGuardsAndResolvers: 'always' },
  { path: 'responsaveis', canActivate: [AuthGuardService],loadChildren: './responsaveis/responsaveis.module#ResponsaveisPageModule',runGuardsAndResolvers: 'always' },
  { path: 'modalTelefone', canActivate: [AuthGuardService],loadChildren: './modal-telefone/modal-telefone.module#ModalTelefonePageModule',runGuardsAndResolvers: 'always' },
  { path: 'cuidador-detail', canActivate: [AuthGuardService],loadChildren: './cuidador-detail/cuidador-detail.module#CuidadorDetailPageModule',runGuardsAndResolvers: 'always' },
  { path: 'memo', canActivate: [AuthGuardService],loadChildren: './memo/memo.module#MemoPageModule',runGuardsAndResolvers: 'always' },
  { path: 'photo-modal', canActivate: [AuthGuardService],loadChildren: './photo-modal/photo-modal.module#PhotoModalPageModule' ,runGuardsAndResolvers: 'always'},
  { path: 'evento-modal', canActivate: [AuthGuardService],loadChildren: './evento-modal/evento-modal.module#EventoModalPageModule' ,runGuardsAndResolvers: 'always'},
  { path: 'agendadefs', canActivate: [AuthGuardService],loadChildren: './agendasdef/agendasdef.module#AgendasDefPageModule',runGuardsAndResolvers: 'always' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
