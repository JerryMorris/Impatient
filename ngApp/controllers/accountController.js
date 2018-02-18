var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $location, nurseServices, patientsServices) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.nurseServices = nurseServices;
                this.patientsServices = patientsServices;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
            }
            AccountController.prototype.getUserName = function () {
                return this.accountService.getUserName();
            };
            AccountController.prototype.getClaim = function (type) {
                return this.accountService.getClaim(type);
            };
            AccountController.prototype.isLoggedIn = function () {
                return this.accountService.isLoggedIn();
            };
            AccountController.prototype.logout = function () {
                this.accountService.logout();
                this.$location.path('/');
            };
            AccountController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
        angular.module('PatientApp').controller('AccountController', AccountController);
        var LoginController = (function () {
            function LoginController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
                var emailTextBox = document.getElementById("emailLogin");
                emailTextBox.focus();
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.accountService.login(this.loginUser).then(function () {
                    _this.$location.path('/');
                    location.reload();
                    if (_this.accountService.getClaim('isNurse')) {
                        _this.$location.path('/dashboard');
                    }
                    if (_this.accountService.getClaim('isAdmin')) {
                        _this.$location.path('/adminAllNursesActivities');
                    }
                    if (_this.accountService.getClaim('isPatient')) {
                        _this.$location.path('/setupView');
                    }
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var PatientLoginController = (function () {
            function PatientLoginController(accountService, $location, $http, firebaseService) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.$http = $http;
                this.firebaseService = firebaseService;
                this.$http.get('/api/patient').success(function (results) {
                    _this.patients = results;
                    _this.loginUser = {};
                });
            }
            PatientLoginController.prototype.patientLogin = function () {
                var _this = this;
                this.loginUser.email = this.selectedPatient.applicationUser.email;
                this.loginUser.password = "Secret123!";
                this.accountService.login(this.loginUser).then(function () {
                    _this.$location.path('/setupView');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
                //  this.firebaseLogin();
            };
            PatientLoginController.prototype.firebaseLogin = function () {
                var self = this; //avoids closure issue
                firebase.auth().signInWithEmailAndPassword(this.loginUser.email, this.loginUser.password).then(function () {
                    console.log("login succeeded");
                    self.updateNotifications();
                }).catch(function (error) {
                    console.log(error.code + " " + error.message);
                });
            };
            //adds new notification to the firebase db
            PatientLoginController.prototype.newNotification = function () {
                var notificationKey = firebase.database().ref().child('notifications').push().key;
                var updates = {};
                updates["/notifications/" + notificationKey] = this.notification;
                return firebase.database().ref().update(updates);
            };
            //refreshes the db when there is a change
            PatientLoginController.prototype.updateNotifications = function () {
                var _this = this;
                firebase.database().ref("notifications").on("value", function (snapshot) {
                    _this.notifications = snapshot.val();
                });
            };
            return PatientLoginController;
        }());
        Controllers.PatientLoginController = PatientLoginController;
        var RegisterController = (function () {
            function RegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
            }
            RegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.register(this.registerUser).then(function () {
                    _this.$location.path('/');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var ExternalRegisterController = (function () {
            function ExternalRegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
            }
            ExternalRegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.registerExternal(this.registerUser.email)
                    .then(function (result) {
                    _this.$location.path('/');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            };
            return ExternalRegisterController;
        }());
        Controllers.ExternalRegisterController = ExternalRegisterController;
        var ConfirmEmailController = (function () {
            function ConfirmEmailController(accountService, $http, $stateParams, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$http = $http;
                this.$stateParams = $stateParams;
                this.$location = $location;
                var userId = $stateParams['userId'];
                var code = $stateParams['code'];
                accountService.confirmEmail(userId, code)
                    .then(function (result) {
                    _this.$location.path('/');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            }
            return ConfirmEmailController;
        }());
        Controllers.ConfirmEmailController = ConfirmEmailController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=accountController.js.map