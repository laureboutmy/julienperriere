define(['backbone', 'views/sidebar', 'vendor/helpers'], function(Backbone, Sidebar, helpers){
	// 'use strict';
	
	J = {
		Views: {},
		Models: {},
		Collections: {},
		Router: {},
		Status: {},
		init: function(){
			J.Router = new (Backbone.Router.extend({
				routes: {
					'': 'home',
					'my-warner': 'project',
					'wdmtg': 'project',
					'game-of-thrones': 'project',
					'kolok': 'project',
					'dreamcatcher': 'project',
					'nike': 'project'
				},
				initialize: function(){
					Backbone.history.start({pushState: true});
					var self = this,
							notFound = true;
					for(var i = Backbone.history.handlers.length - 1; i >= 0; i--){
						if(Backbone.history.handlers[i].route.test(Backbone.history.fragment)){ notFound = false; }
					}
					if(notFound){ self.navigate('', {trigger: true, replace: true}); }

					J.Views['sidebar'] = new Sidebar();
					J.Views['sidebar'].render();
					J.Status.infos = false;

					self.bind();
					self.onResize();
				},

				project: function(){
					var self = this;
					self.render();
				},

				home: function(){
					var self = this;
					self.render();
				},

				// Start rendering a new case study
				render: function(view, wait){
					var self = this;
					if(typeof wait !== 'undefined'){
						setTimeout(function(){
							J.Status.previousView = J.Status.currentView || '';
							J.Status.currentView = view || Backbone.history.fragment;
							if(J.Status.previousView !== ''){
								J.Views[J.Status.previousView].destroy();
							}
							self.createView(J.Status.currentView);
						}, 500);
					} else {
						J.Status.previousView = J.Status.currentView || '';
						J.Status.currentView = view || Backbone.history.fragment;
						if(J.Status.previousView !== ''){
							J.Views[J.Status.previousView].destroy();
							J.Views[J.Status.previousView].launchLoader();
						}
						self.createView(J.Status.currentView);
					}
				},

				createView: function(view){
					var self = this;
					if(view !== '' && view !== 'home'){
						if(J.Views[view] === undefined){
							require(['views/projects/' + view], function(View){
								J.Views[view] = new View();
								J.Views[view].load();
							});
						} else { J.Views[view].load(); J.Views[view].render(); }
					} else {
						if(J.Views.home === undefined){
							require(['views/home'], function(View){
								J.Views['home'] = new View();
							});
						} else { J.Views['home'].load(); J.Views['home'].render(); }
					}
					self.navigate(view, {trigger: false, replace: false});
				},
		    
				bind: function(){
					window.addEventListener('resize', this.onResize);
					var main = document.getElementById('main'),
							sidebar = document.getElementById('sidebar'),
							wrapper = document.getElementById('wrapper');

					// Click on sidebar links
					Array.prototype.forEach.call(sidebar.querySelectorAll('[data-project]'), function(el, i){
						el.addEventListener('click', function(e){
							e.preventDefault();
							if(helpers.hasClass(wrapper, 'open')){ helpers.removeClass(wrapper, 'open'); }
							helpers.removeClass(wrapper, 'unwound');
							var project = this.getAttribute('data-project');
							document.documentElement.pageYOffset = 0;
							helpers.addClass(loader, project);
							setTimeout(function(){
								helpers.removeClass(loader, 'hidden');
								J.Router.render(project, 'wait'); 
							}, 300);
						});
					});

					main.addEventListener('click', function(e){
						e.preventDefault();
						var el = e.target, project;
						if(el !== this && el.tagName.toLowerCase() === 'a'){
							project = el.getAttribute('data-project');
						} else if (el.tagName.toLowerCase() === 'h1'){
							project = el.parentNode.getAttribute('data-project');
						} else if (el.tagName.toLowerCase() === 'span' || el.tagName.toLowerCase() === 'img'){
							project = el.parentNode.parentNode.getAttribute('data-project');
						}

						if(project){
							if(J.Status.infos){ helpers.removeClass(wrapper, 'open'); }
							J.Views[J.Status.currentView].renderChangeFromBottom(project);
							J.Router.render(project, 'wait');
							J.Views['sidebar'].update(project);
						}
					})
		    	

					document.querySelectorAll('button[type="submit"]')[0].addEventListener('click', function(e){
						e.preventDefault();
						var form = this.parentNode,
								name = form.querySelector('input[name="name"]'),
								email = form.querySelector('input[name="email"]'),
								message = form.querySelector('textarea'),
								error = false;

						if(email.value == '' || name.value == '' || message.value == '' || /\S+@\S+\.\S+/.test(email.value)){ error = true; }
						if(error){ 
							form.querySelector('span.message').innerHTML = "Whoops! That's a no-go.";
							helpers.addClass(form.querySelector('span.message'), 'visible');
						} else {
							var data = {
									name: name.value,
									email: email.value,
									message: message.value }
							var request = new XMLHttpRequest();
							request.open('POST', 'form.php', true);
							request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
							request.send(data);
						}
					})
				},
				
				onResize: function(){ 
					document.getElementById('main').style.width = window.innerWidth - 80 + 'px';
					// $('#main').width($(window).width() - 80); 
					J.Status.windowH = window.innerHeight; },

				}));
		},
		
		start: function(){ J.init(); }
	}

	return J;
});