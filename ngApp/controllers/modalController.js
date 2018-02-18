var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var ModalController = (function () {
            function ModalController(patientIdFrom, $uibModalInstance, patientsServices, $state) {
                this.patientIdFrom = patientIdFrom;
                this.$uibModalInstance = $uibModalInstance;
                this.patientsServices = patientsServices;
                this.$state = $state;
                this.getPatient();
                this.getAssignedNurse();
            }
            //used to see the patient's details in modal
            ModalController.prototype.getPatient = function () {
                var _this = this;
                this.patientsServices.getPatient(this.patientIdFrom).then(function (data) {
                    _this.patient = data;
                });
            };
            //used to show the patient's assigned nurse first and last name in modal
            ModalController.prototype.getAssignedNurse = function () {
                var _this = this;
                this.patientsServices.getAssignedNurse(this.patientIdFrom).then(function (data) {
                    _this.assignedNurse = data;
                });
            };
            //use modal to soft delete the patients
            ModalController.prototype.deletePatient = function () {
                var _this = this;
                this.patientsServices.deletePatient(this.patientIdFrom).then(function () {
                    _this.$uibModalInstance.close();
                });
            };
            ModalController.prototype.close = function () {
                this.$uibModalInstance.close();
            };
            return ModalController;
        }());
        Controllers.ModalController = ModalController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=modalController.js.map