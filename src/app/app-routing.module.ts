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
  { path: 'checkin', loadChildren: './checkin/checkin.module#CheckinPageModule' },
  { path: 'details', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule', runGuardsAndResolvers: 'always' },
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule'},
  { path: 'senha', loadChildren: './senha/senha.module#SenhaPageModule' },
  { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesPageModule' },
  { path: 'responsavel', loadChildren: './responsavel/responsavel.module#ResponsavelPageModule' },
  { path: 'usuarios', loadChildren: './cuidador/cuidador.module#CuidadorPageModule' },
  { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule' },
  { path: 'agendas', loadChildren: './agenda/agenda.module#AgendaPageModule' },
  { path: 'paciente', loadChildren: './paciente/paciente.module#PacientePageModule' },
  { path: 'responsaveis', loadChildren: './responsaveis/responsaveis.module#ResponsaveisPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
