"use strict";

// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('LightThemUpAdmin', ['ng-admin', 'ngCookies', 'restangular']);
var apiUrl = "http://95.85.2.100:3000/";
var frontendUrl = "http://127.0.0.1/";

myApp.config(['RestangularProvider', function(RestangularProvider) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
        $cookies = _$cookies_;
    }]);
    var token = $cookies.get('token');
    if (!token) {
        window.location.href = frontendUrl + 'connexion';
        return false;
    }
    RestangularProvider.setDefaultHeaders({
        "x-access-token": token
    });
}]);

myApp.run(['Restangular', '$location', function(Restangular, $location){
    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if (response.status === 403 || response.status === 401){
            window.location.href = frontendUrl + 'connexion';
            return false;
        }
    });
}]);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Light Them Up - Admin')
      .baseApiUrl(apiUrl); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('users').identifier(nga.field("_id"));
    // set the fields of the user entity list view
    user.listView().fields([
    	nga.field('name').isDetailLink(true),
    	nga.field('emailLocal').label("Email"),
      nga.field('createdAt', 'datetime')
      .label("Created at"),
      nga.field('updatedAt', 'datetime')
      .label("Updated at")
      ]);
    
    user.creationView().fields([
    	nga.field('name').validation({required: true}),
        nga.field('email', 'email')
        .validation({required: true})
        .label("Email"),
        nga.field('password', 'password').validation({required: true}),
        nga.field('description', 'text'),
        nga.field('address'),
        nga.field('city'),
        nga.field('country'),
        nga.field('picture', 'file')
        ]);

    user.creationView().onSubmitError(['error', 'form', 'progression', 'notification', function(error, form, progression, notification) {
    // stop the progress bar
    if (error.data.success == false) {
        form.name.$dirty = false;
        form.email.$dirty = false;
        form.password.$dirty = false;
        form.description.$dirty = false;
        form.address.$dirty = false;
        form.city.$dirty = false;
        form.country.$dirty = false;
    }
    progression.done();
    // add a notification
    notification.log(error.data.message);
    // cancel the default action (default error messages)
    return false;
}]);
    
    user.deletionView()
    .title('Delete user: {{ entry.values.name }}');

    user.editionView()
    .title('Edit user: {{ entry.values.name }}') 
    .fields([
        nga.field('name').validation({required: true}),
        nga.field('emailLocal', 'email')
        .validation({required: true})
        .label("Email"),
        nga.field('password', 'password').validation({required: false}),
        nga.field('description', 'text'),
        nga.field('address'),
        nga.field('city'),
        nga.field('country'),
        nga.field('picture', 'file').uploadInformation({ 'url': 'http://95.85.2.100:3000/users/', 'apifilename': 'picture' })
        ]);
    // add the user entity to the admin application
    admin.addEntity(user);

    var news = nga.entity('news').identifier(nga.field("_id"));
    news.listView().fields([
    	nga.field('_id').isDetailLink(true),
    	nga.field('name'),
    	nga.field('slug'),
    	nga.field('description'),
    	nga.field('author', 'reference')
    	.targetEntity(user)
    	.targetField(nga.field('name'))
    	.label('User'),
       nga.field('createdAt', 'datetime')
       .label("Created at"),
       nga.field('updatedAt', 'datetime')
       .label("Updated at")
       ]);

    news.creationView().fields([
    	nga.field('name'),
    	nga.field('description', 'text'),
    	nga.field('picture', 'file')
    	]);

	// use the same fields for the editionView as for the creationView
	news.editionView().fields(user.creationView().fields());

	news.showView().fields([
		nga.field('name'),
		nga.field('description', 'text'),
		nga.field('author', 'reference')
		.targetEntity(user)
		.targetField(nga.field('name'))
		.label('User'),
		]);

	admin.addEntity(news);

	admin.menu(nga.menu()
		.addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
		.addChild(nga.menu(news).icon('<span class="glyphicon glyphicon-pencil"></span>'))
		);

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

