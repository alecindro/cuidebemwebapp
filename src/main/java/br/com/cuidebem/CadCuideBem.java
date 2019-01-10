package br.com.cuidebem;

import java.util.Date;

import javax.faces.bean.ManagedBean;
import javax.inject.Inject;

import br.com.cuidebem.control.exceptions.DaoException;
import br.com.cuidebem.model.Users;
import br.com.cuidebem.service.UsersDao;
import br.com.security.quali.password.UtilPassword;


@ManagedBean(name="cadCuideBem")
public class CadCuideBem {

	private String nome;
	private String email;
	private String senha;
	private String confirmeSenha;
	private Integer tipoCadastro;
	private static final int TIPORESP = 1;
	private static final int TIPOCUID = 2;
	
	private static final String subject_email = "confirmar cadastro cuidebem";
	private static String content_email = "<!DOCTYPE html>"+
"<html>"+
"<head>"+
"<meta charset='UTF-8'>"+
"<style>"+
".ui-button {"+
"display: inline-block;"+
 "position: relative;"+
  "padding: 0;"+
   "margin-right: .1em;"+
    "text-decoration: none!important;"+
    "cursor: pointer;"+
    "text-align: center;"+
    "zoom: 1;"+
    "overflow: visible;"+
"} "+
".btn {"+
 "display: inline-block;"+
  "padding: 6px 12px;"+
  "margin-bottom: 0;"+
  "font-size: 14px;"+
    "font-weight: 400;"+
    "line-height: 1.42857143;"+
    "text-align: center;"+
    "white-space: nowrap;"+
    "vertical-align: middle;"+
    "-ms-touch-action: manipulation;"+
    "touch-action: manipulation;"+
    "cursor: pointer;"+
    "-webkit-user-select: none;"+
    "-moz-user-select: none;"+
    "-ms-user-select: none;"+
    "user-select: none;"+
    "background-image: none;"+
    "border: 1px solid transparent;"+
    "border-radius: 4px;"+
"} "+
".btn-success {"+
    "background-image: -webkit-linear-gradient(top,#5cb85c 0,#419641 100%);"+
    "background-image: -o-linear-gradient(top,#5cb85c 0,#419641 100%);"+
    "background-image: -webkit-gradient(linear,left top,left bottom,from(#5cb85c),to(#419641));"+
    "background-image: linear-gradient(to bottom,#5cb85c 0,#419641 100%);"+
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5cb85c', endColorstr='#ff419641', GradientType=0);"+
    "filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);"+
    "background-repeat: repeat-x;"+
    "border-color: #3e8f3e;"+
	"color: #fff;"+
    "background-color: #5cb85c;"+
"} "+
".ui-button-text {"+
    "display: block;"+
    "line-height: normal;"+
	 "padding: .3em 1em;"+
"} "+
"</style>"+
"</head>"+
"<body>"+
"<blockquote>"+
"<div style='text-align:center'>"+
"<h2>Termo de Aceite</h2>"+
"</div>"+
"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>"+
"<footer style='text-align:center'>"+
"<a href='#{link}' class='btn btn-success'>Aceito os termos do acordo</a>"+
"</footer>"+
"<div style='text-align:center'>"+
"<img src='http://www.cuidebemapp.com/resources/img/logo.png'/>"+
"</div>"+
"</blockquote>"+
"</body>"+
"</html>";
	private static final String replace = "#{link}";
	private static final String replace_user = "#{user}";
	private static final String link = "http://cuidebemapp.com/rest/confirma/#{user}";
	private static String content_type = "text/html";
	@Inject
	private UsersDao usersDao;
	
	@Inject 
	private SendEmail sendEmail;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getConfirmeSenha() {
		return confirmeSenha;
	}
	public void setConfirmeSenha(String confirmeSenha) {
		this.confirmeSenha = confirmeSenha;
	}
	public Integer getTipoCadastro() {
		return tipoCadastro;
	}
	public void setTipoCadastro(Integer tipoCadastro) {
		this.tipoCadastro = tipoCadastro;
	}

	public String cadastrar(){
		if(!senha.equals(confirmeSenha)){
			//add message
			return null;
		}
		if(tipoCadastro==null){
			//add message
			return null;
		}
		saveUser();
		confirmarEmail(email);
		if(tipoCadastro==CadCuideBem.TIPOCUID){
			return "/resources/boasvindas.xhtml";
		}
		return "/resources/cadpaciente.xhtml";
	}
	
	private void saveUser(){
		String _senha = UtilPassword.genPassword(senha);
		Users user = new Users(email, _senha, tipoCadastro, nome);
		user.setBlocked(true);
		user.setDatacadastro(new Date());		
		try {
			usersDao.create(user);
		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void confirmarEmail(String email){
		content_email = content_email.replace(replace, link);
		content_email = content_email.replace(replace_user, email);
		sendEmail.send(email, subject_email, content_email, content_type);
	}
	
}
