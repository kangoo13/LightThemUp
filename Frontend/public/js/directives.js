'use strict';

app.directive('ngConfirmClick', [ function () {
  return {
    link: function (scope, element, attr) {
      var msg = attr.ngConfirmClick || "Are you sure?";
      var clickAction = attr.confirmedClick;
      element.bind('click', function (event) {
        if (window.confirm(msg)) {
          scope.$eval(clickAction)
        }
      });
    }
  };
}]);

app.directive('back', ['$window', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind('click', function () {
        $window.history.back();
      });
    }
  };
}]);

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.directive('equals', function () {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function (scope, elem, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function () {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function () {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
      };
    }
  }
});

app.directive('validPassword', function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
      var validator = function (value) {
        ctrl.$setValidity('validPassword', regex.test(value));
        return value;
      };
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.unshift(validator);
    }
  };
});
