define(['backbone', 'jquery', 'views/sidebar'], function(Backbone, $, Sidebar){
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
		      'wdmtg': 'project',
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
					if(notFound){ self.navigate('', {trigger: false}); }		

		    	J.Views['sidebar'] = new Sidebar();
		    	J.Views.sidebar.render();
		    	J.Status.infos = false;

					self.bind();
		    	self.onResize();
		    },

		    project: function(){
		    	var self = this;
		    	self.render();
		    },

		 		// Start rendering a new case study
		    render: function(view, wait){
		    	var self = this;
		    	if(typeof wait != 'undefined'){ 
		    		setTimeout(function(){
		    			J.Status.previousView = J.Status.currentView || '';
				    	J.Status.currentView = view || Backbone.history.fragment;
				    	if(J.Status.previousView != ''){ 
				    		J.Views[J.Status.previousView].destroy(); 
				    		J.Views[J.Status.previousView].launchLoader();
				    	}
			    		self.createView(J.Status.currentView);
		    		}, 500)
		    	} else {
		    		J.Status.previousView = J.Status.currentView || '';
			    	J.Status.currentView = view || Backbone.history.fragment;
			    	if(J.Status.previousView != ''){ 
			    		J.Views[J.Status.previousView].destroy(); 
			    		J.Views[J.Status.previousView].launchLoader();
			    	}
		    		self.createView(J.Status.currentView);
		    	}
		    	
		    	
		    },

		    createView: function(view){
		    	var self = this;
		    	if(view != ""){ 
		    		if(J.Views[view] === undefined){
		    			require(['views/projects/' + view], function(View){
				     		J.Views[view] = new View();
				     		J.Views[view].load();
				     	});
		    		} else { J.Views[view].load(); J.Views[view].render(); }
		    	} else {
		    		if(J.Views['home'] === undefined){
							require(['views/home'], function(View){
				     		J.Views['home'] = new View();
				     	});
		    		} else {}
		    	}
		    	self.navigate(view, {trigger: false, replace: false})
		    },
		    

		    bind: function(){
		    	window.addEventListener('resize', this.onResize);
		    	// $(window).on('resize', this.onResize);
		    	
		    	var main = document.getElementById('main'),
		    			sidebar = document.getElementById('sidebar'),
		    			wrapper = document.getElementById('wrapper');

		    	Array.prototype.forEach.call(sidebar.querySelectorAll('[data-project]'), function(el, i){
		        el.addEventListener('click', function(e){
		        	e.preventDefault(); 
		        	if(J.Status.infos){ helpers.removeClass(wrapper, 'open'); }
		        	var project = this.getAttribute('data-project');
		        	J.Router.render(project, 'wait');
							J.Views['sidebar'].update(project);
		        })
		      });

		    	main.addEventListener('click', function(e){
		    		e.preventDefault();
		    		var el = e.target;
		    		if(el !== this && el.tagName.toLowerCase() === 'a'){
		    			var project = el.getAttribute('data-project');
		    		} else if (el.tagName.toLowerCase() === 'h1'){
		    			var project = el.parentNode.getAttribute('data-project');
		    		} else if (el.tagName.toLowerCase() === 'span' || el.tagName.toLowerCase() === 'img'){
		    			var project = el.parentNode.parentNode.getAttribute('data-project');
		    		}

		    		if(project){
		    			if(J.Status.infos){ helpers.removeClass(wrapper, 'open'); }
		    			J.Views[J.Status.currentView].renderChangeFromBottom();
		    			J.Router.render(project, 'wait');
		    			J.Views['sidebar'].update(project);
		    		}
		    	})

		   //  	$('section#main').on('click', '[data-project]', function(e){
					// 	e.preventDefault();
					// 	var project = $(this).data('project');
					// 	if(J.Status.infos){ $('div#wrapper').removeClass('open'); }
					// 	J.Views[J.Status.currentView].renderChangeFromBottom();
					// 	J.Router.render(project, 'wait');
					// 	J.Views['sidebar'].update(project);
					// });
					
					// $('section#sidebar').on('click', '[data-project]', function(e){
					// 	e.preventDefault();
					// 	if(J.Status.infos){ $('div#wrapper').removeClass('open'); }
					// 	var project = $(this).data('project');
					// 	J.Router.render(project);
					// 	J.Views['sidebar'].update(project);
					// });

		    },

		    onResize: function(){ $('#main').width($(window).width() - 80); J.Status.windowH = $(window).height(); },

		  }));
		},

		start: function(){ J.init(); }
	}

	return J;
});