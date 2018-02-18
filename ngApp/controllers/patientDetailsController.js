var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var PatientDetailsController = (function () {
            function PatientDetailsController(patientsServices, $state, $stateParams) {
                this.patientsServices = patientsServices;
                this.$state = $state;
                this.patientId = $stateParams["id"];
                this.getPatient();
            }
            PatientDetailsController.prototype.getPatient = function () {
                var _this = this;
                this.patientsServices.getPatient(this.patientId).then(function (data) {
                    _this.patient = data;
                });
                this.getAssignedNurse();
            };
            PatientDetailsController.prototype.getAssignedNurse = function () {
                var _this = this;
                this.patientsServices.getAssignedNurse(this.patientId).then(function (data) {
                    _this.assignedNurse = data;
                });
            };
            return PatientDetailsController;
        }());
        Controllers.PatientDetailsController = PatientDetailsController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientDetailsController.js.map