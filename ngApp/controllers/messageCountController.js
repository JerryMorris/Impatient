var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var MessageCountController = (function () {
            function MessageCountController(patientsServices, $window) {
                var _this = this;
                this.patientsServices = patientsServices;
                this.$window = $window;
                this.patientsServices.getCurrentUser().then(function (data) {
                    _this.nurseUser = data;
                    _this.getAssignedPatients();
                });
            }
            MessageCountController.prototype.returnPatients = function () {
                return this.patients;
            };
            MessageCountController.prototype.getAssignedPatients = function () {
                var _this = this;
                this.patientsServices.getAssignedPatients(this.nurseUser.id).then(function (data) {
                    _this.patients = data;
                });
            };
            return MessageCountController;
        }());
        Controllers.MessageCountController = MessageCountController;
        angular.module('PatientApp').controller('MessageCountController', MessageCountController);
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=messageCountController.js.map