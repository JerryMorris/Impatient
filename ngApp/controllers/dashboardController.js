var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var DashboardController = (function () {
            function DashboardController(patientsServices, moment) {
                this.patientsServices = patientsServices;
                this.moment = moment;
                this.patientMessages = [];
                this.nurseNames = [];
                this.countMessages();
            }
            //gets the login nurse's patients messages activities
            DashboardController.prototype.countMessages = function () {
                var _this = this;
                this.patientsServices.getPatientMessages().then(function (data) {
                    _this.patientMessages = data;
                    for (var i = 0; i < _this.patientMessages.length; i++) {
                        _this.nurseNames.push(_this.patientMessages[i].nurse.applicationUser.firstName + " " + _this.patientMessages[i].nurse.applicationUser.lastName);
                        for (var _i = 0, _a = _this.patientMessages[i].messages; _i < _a.length; _i++) {
                            var message = _a[_i];
                            //used moment to get the relative time from now
                            message.timeRequested = _this.moment(message.timeRequested).fromNow();
                        }
                    }
                }).catch(function (err) {
                    var validationErrors = [];
                    for (var prop in err.data) {
                        var propErrors = err.data[prop];
                        validationErrors = validationErrors.concat(propErrors);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            //dismiss the message by updating the message table time responded field with the current time
            DashboardController.prototype.dismissIncident = function (messageId) {
                var _this = this;
                this.myMessages = this.patientsServices.dismissIncident(messageId).then(function (data) {
                    _this.myMessages = data.messages;
                    _this.nurse = data;
                    _this.countMessages();
                });
            };
            return DashboardController;
        }());
        Controllers.DashboardController = DashboardController;
        //custom angular filters
        function customUnique() {
            return function (input) {
                return input.filter(function (nurseNames, index) { return input.indexOf(nurseNames) === index; });
            };
        }
        angular.module("PatientApp").filter("customUnique", customUnique);
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=dashboardController.js.map