var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController() {
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var SecretController = (function () {
            function SecretController($http) {
                var _this = this;
                $http.get('/api/secrets').then(function (results) {
                    _this.secrets = results.data;
                });
            }
            return SecretController;
        }());
        Controllers.SecretController = SecretController;
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=controllers.js.map