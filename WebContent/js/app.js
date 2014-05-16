require.config({
	shim: {
		spine: {
			deps: ["jquery"],
			exports: "Spine"
		}
	},
	baseUrl: "js/lib",
	paths: {
		app: "../app",
		models: "../models",
		sp: "spine"
	}
});
require(["methods", "sp/min", "app/content"], function() {
	window.App = Spine.Controller.sub({
		el: $("body"),
		elements: {
			"#container .content":"contentEl",
			"#modal": "modalEl",
			".mask": "maskEl",
			".mask img": "loader",
			".finishform .submit":"bconfirm",
			".finishform .cancel":"bcancel"
		},
		events: {
			"click .print":"print",
			"click .delete":"del",
			"click .edit":"edit",
			"click .logout":"logout",
			"click .finishform .submit": "submitform",
			"click .finishform .cancel": "cancel"
		},
		init: function() {
			this.xml="";
			this.loading = !1;
			this.whatsave=""; //Este atributo diz se o operador esta criando um novo dado ou editando
			this.page = "Home";
			this.list;

			/*this.usr = jQuery.parseJSON($.cookie("portal"));
			if (!this.usr) {
				return this.logout(), !1;
			}*/
			//this.userTx.text(this.usr.Nome.capitalize());
			
			this.el.find("#wrap").removeClass("hide");

			/*Cria os objetos a serem utilizados nas paginas*/
			this.content = new Content({
				setloading: this.proxy(this.setloading),
				mask: this.maskEl,
				el: this.contentEl,
			});
			this.modal = new Modal({
				el: this.modalEl
			});

			/*Rotas de páginas*/
			this.routes({
				"Usuarios/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Usuarios";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},

				"Feriados/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Feriados";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},	

				"Perfis/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Perfis";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Departamentos/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Departamentos";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Operadores/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Operadores";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Empresas/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Empresas";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},

				/*DROPDOWN 2**/
				"Faixas/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Faixas";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Zonas/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Zonas";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},

				/*DROPDOWN 3*/
				"Status/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Status";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Especiais/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Especiais";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},
				"Visitantes/*func": function(a) {
					//Listagem de usuarios
					this.setloading(!0,!1);
					this.page="Visitantes";
					this.loaddata(a.func);
					this.setloading(!1,!0);
				},

				/*HOME*/
				"": function() {
					this.setloading(!0,!1);
					this.page = "Home";
					var context=this;
					$.ajax({
			            //verifica se existe o xml para load das paginas
			             type:"GET",
			             url:"load.xml",
			             dataType:"xml",
			             success:function(e){
			                context.xml=$(e).find("entry");
			                context.xml.each(function(){
					            if($(this).attr("name")==="Home"){
					               context.contentEl.html($(this).find("list").text());
					            }
					        });
							context.contentEl.fadeIn();
			             }
				    });
					this.setloading(!1,!0);
				}
			});
		},

		/*Chama metodos java para executar funções no banco de dados*/
		callservice:function(obj,logic){
			obj.logica=logic; //Oque sera feito com a tabela
            obj.table=this.page; //tabela que sera afetada, a mesma que a pagina atual
            $.get("./mvc",obj)
            .error(function(){
            	alert("Não foi realizar a operação");
            })
            .success(function(){
            	alert("Operação realizada com sucesso");
            });
		},

		/*Carrega conteudo do xml nas paginas*/
		loaddata:function(load,obj){
			var context=this;
			$.ajax({
	            //verifica se existe o xml para load das paginas
	            type:"GET",
	            url:"load.xml",
	            dataType:"xml",
	            success:function(e){
	                 context.xml=$(e).find("entry");
	                 context.xml.each(function(){
			            if($(this).attr("name")===context.page){
			            	if(obj){
			            		context.whatsave="editar";
			            		context.contentEl.html($(this).find("cadastro").text());
			            		context.contentEl.fadeIn();
			            		context.insertValues(obj);
			            	}
			                else{
			                	context.whatsave="cadastrar";
			                	context.contentEl.html($(this).find(load).text());
			                	context.contentEl.fadeIn();
			                	if(load==="list"){
			                		context.getTableValues();
			                	}
			                }
			            }
			        });
	            }
		    });
		},

		/*Chamada de metodo java para listar as tabelas na tela*/
		getTableValues:function(){
			var context=this;
			$.get("./mvc",{'logica':'BuscarLogic','table':this.page})
            .error(function(){
            	context.modal.open("Não foi possivel retornar a lista cadastrada","Tente novamente mais tarde, ou contate o administrador do sistema.",!1,!0)
            })
            .success(function(a){
                context.list=a;
                context.writeTable(context.list);
            });
		},

		/*Escreve a tabela na tela*/
		writeTable:function(list){
			var i,length,html="";
			length=list.length;
			switch(this.page){
				case 'Feriados':
					for(i=0;i<list.length;i++){
						html+="<tr><td>"+list[i].cod+"</td><td>"+list[i].descr+"</td><td>"+list[i].date+"</td><td class='actions'><a href='#"+list[i].cod+"' class='delete'></a><a href='#"+list[i].cod+"' class='edit'></a></td></tr>";
					}
				break;
				default:
					html+="Operação não encontrada!";
			}
			$("tbody").html(html);
		},

		/*Imprimi página*/
		print:function(a){
			a.preventDefault();
			window.print();
		},

		/*Quando clicado no botão editar. Recebe o valor do objeto clicado e passa para o loaddata joga-los nos inputs*/
		edit:function(a){
			a.preventDefault();
			this.el.addClass("prevent"); //Editing or create data
			var cod=parseInt($(a.target).attr("href").replace("#",""));
			//this.callservice({"codigo":cod},"editar");
			var obj={
				'date':'01/01/2014',
				'descr':'Confraternização Universal'
			};
			this.loaddata("cadastro",obj);
		},

		/*Quando clicado no botão deletar*/
		del:function(a){
			a.preventDefault();
			var cod=parseInt($(a.target).attr("href").replace("#",""));
			this.callservice({"codigo":cod},"deletar");
		},

		/*Quando clicado no botão enviar do formulário*/
		submitform:function(a){
			a.preventDefault();
			alert(this.whatsave);
			//this.callservice({"codigo":cod},this.whatsave);
		},

		/*Inseri os valores nos inputs*/
		insertValues:function(obj){
			var cinputs=$("input");
			cinputs.each(function(){
				$(this).val(obj[$(this).attr("name")]);
			});
			//console.dir(obj);
		},

		/**
		*	Cancel Button
		*
		*	This method cancel all editions and return to a previews page
		*	Before redirect a previews page the method open modal question, and if the user click 'yes' it will be redirected
		**/
		cancel: function() {
			if (this.loading) {
				return false;
			}
			this.modal.question("Retornar?", "Suas alterações serão desfeitas!", !0, this.modal.action);
		},

		/**
		*	Set the loading state
		*
		*	@param {Boolean} a. If true show mask, else hide mask.
		*	@param {Boolean} b. If is false, open the loader, else open just the mask div
		*
		*	This method set the state loader
		*/

		setloading: function(a, b) {
			if (!b) {
				if (a) {
					this.maskEl.fadeIn();
					this.loading = !0;
				} else {
					this.maskEl.fadeOut();
					this.loading = !1;
				}
			} else {
				if (a) {
					this.loader.fadeOut();
					this.maskEl.fadeIn();
					this.loading = !0;
				} else {
					this.maskEl.fadeOut();
					this.loader.fadeIn();
					this.loading = !1;
				}
			}
			return this.loading;
		},

		/**
		*	Return the loading state
		*/
		getloading:function(){
			return this.loading;
		},

		logout:function(a) {
	    	a && a.preventDefault();
	    	//$.removeCookie("app", {path:"/"});
	    	window.location = "login.jsp";
	  	},

		/**
		*	Reseting the application
		*/
		reset: function(nothome) {
		}
	});
	new App; //Creates application
	Spine.Route.setup(); //Enables @route
});