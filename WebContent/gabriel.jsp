<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

    <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
    Remove this if you use the .htaccess -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>SFOC - Controle de acesso empresárial</title>

    <meta name="description" content="Sistema de controle de acesso empresarial, utilizando da web como ambiente para a aplicação" />
    <meta name="author" content="Fabiano de Lima" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />

	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,300' rel='stylesheet' type='text/css'>
    <!-- build:css css/app.min.css-->
    <link rel="stylesheet" type="text/css" href="css/common.min.css" media="screen">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- endbuild -->

	<!--Replace with the root of the domain-->
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="icon" type="image/icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-ico.png" />

    <!--[if lt IE 9]>
	    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	    <link href="css/iehack.css" rel="stylesheet">
	<![endif]-->

    <!--[if IE]><script src="js/lib/jquery.min.js"></script><script src="js/lib/spine/min.js"></script><script data-main="js/app.js" src="js/lib/require-jquery.js"></script><![endif]-->

</head>
<body>
	<div id="wrap">
        <header>
            <div class="holder">
                <a href="" class="logo"></a>
                <p id="current-date">
                    São Paulo, 24 de Outubro de 2014.
                </p>
                <div class="user-box">
                    <span class="user-icon s-quart"></span><span class="user-name">Nome do Usuário</span>
                    <br/>
                    <a href="#logout" class="logout s-quart"></a>
                </div>
            </div>
        </header>
        <nav>
            <ul class="holder">
                <li class="dropdown">
                    <a id="gerais" role="button" data-toggle="dropdown" href="#">Gerais <b class="caret"></b></a>
                    <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Perfil</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Departamento</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Feriados</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Usuários</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Operadores</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Empresas</a></li>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a id="acesso" role="button" data-toggle="dropdown" href="#">Acesso <b class="caret"></b></a>
                    <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Faixas de Acesso</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Zonas de Acesso</a></li>
                    </ul>
                  </li>
                  <li class="dropdown">
                    <a id="visitantes" role="button" data-toggle="dropdown" href="#">Visitantes <b class="caret"></b></a>
                    <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Status </a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Especial</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="http://twitter.com/fat">Controle de Visitantes</a></li>
                    </ul>
                  </li>
            </ul>
        </nav>
        <div id="container">
            <div class="content holder">
                <form role="form" action="">
                  <div class="form-group">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" name="nome" placeholder="Nome completo:">
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" placeholder="Email">
                  </div>
                  <div class="form-group">
                    <label for="endereco">Endereço</label>
                    <input type="text" class="form-control" name="endereco" placeholder="Endereço">
                  </div>
                  <input type="submit" class="btn btn-default bsubmit">
                </form>
            </div>
        </div>
        <footer>
            <p>Copyright © 2014 - Software of control - Todos os direitos reservados</p>
        </footer>  
         <div id="modal" class="hide">
            <div class="modal-content">
                <a href="#close" class="button s-third"></a>
                <div class="modal-text">
                    <span class="big-icon"></span>
                    <div class="aviso">
                        <h2></h2>
                        <p></p>
                        <div class="dialog">
                            <a href="home.jsp">Sim</a>
                            <a href="#no">Não</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <!--[if !IE]>-->
        <script src="js/lib/jquery.min.js"></script>
        <!--<script src="js/lib/spine/min.js"></script>
        <script data-main="js/app" src="js/lib/require-jquery.js"></script>-->
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <script type="text/javascript">
            var usuario={
                //Padrao de objeto
                nome:"",
                email:"",
                endereco:""
            };
            $(".bsubmit").bind("click",function(a){
                a.preventDefault();
                
                //Seta valores no objeto
                usuario.nome=$("input[name='nome'").val();
                usuario.email=$("input[name='email'").val();
                usuario.endereco=$("input[name='endereco'").val();

                //Chamando o serviço para cadastro do usuario
                $.get("./send",{'nome':usuario.nome,'email':usuario.email,'endereco':usuario.endereco});
            });
        </script>
    <!--<![endif]-->
</body>
</html>