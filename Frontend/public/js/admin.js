// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('LightThemUpAdmin', ['ng-admin', 'restangular']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Light Them Up - Admin')
      .baseApiUrl('http://95.85.2.100:3000/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('users').identifier(nga.field("_id"));
    // set the fields of the user entity list view
    user.listView().fields([
    	nga.field('name'),
    	nga.field('emailLocal')
    	]);
    // add the user entity to the admin application
    admin.addEntity(user);

    var news = nga.entity('news').identifier(nga.field("slug"));
    news.listView().fields([
    	nga.field('_id'),
    	nga.field('name'),
    	nga.field('slug').isDetailLink(true),
    	nga.field('description'),
    	nga.field('author', 'reference')
    	.targetEntity(user)
    	.targetField(nga.field('name'))
    	.label('User')
    	]);

    news.showView().fields([
    	nga.field('name'),
    	nga.field('description', 'text'),
    	nga.field('author', 'reference')
    	.targetEntity(user)
    	.targetField(nga.field('name'))
    	.label('User')
    	.sortField('id')
    	.sortDir('DESC'),
    	/*nga.field('comments', 'referenced_list')
    	.targetEntity(nga.entity('comments'))
    	.targetReferenceField('postId')
    	.targetFields([
    		nga.field('email'),
    		nga.field('name')
    		])
    	.sortField('id')
    	.sortDir('DESC'),*/
    	]);

    admin.addEntity(news);

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
		if (operation == "getList") {
            // custom pagination params
            if (params._page) {
            	params._start = (params._page - 1) * params._perPage;
            	params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
            	params._sort = params._sortField;
            	params._order = params._sortDir;
            	delete params._sortField;
            	delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
            	for (var filter in params._filters) {
            		params[filter] = params._filters[filter];
            	}
            	delete params._filters;
            }
        }
        return { params: params };
    });
}]);