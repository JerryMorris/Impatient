var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var PatientsController = (function () {
            function PatientsController(patientsServices, $state, $stateParams, $uibModal) {
                this.patientsServices = patientsServices;
                this.$state = $state;
                this.$uibModal = $uibModal;
                this.patientId = $stateParams["id"];
                this.getPatients();
            }
            PatientsController.prototype.getPatient = function () {
                var _this = this;
                this.patientsServices.getPatient(this.patientId).then(function (data) {
                    _this.patient = data;
                });
            };
            PatientsController.prototype.getPatients = function () {
                var _this = this;
                this.patientsServices.getPatients().then(function (data) {
                    _this.patients = data;
                });
            };
            PatientsController.prototype.cancel = function () {
                this.$state.go("admitted");
            };
            //opens the patient details in a modal
            PatientsController.prototype.patientDetails = function (patientId) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/patientDetailsDialog.html',
                    controller: PatientApp.Controllers.ModalController,
                    controllerAs: 'controller',
                    resolve: {
                        patientIdFrom: function () { return patientId; }
                    },
                    size: 'md'
                });
            };
            //opens the delete function page in a modal
            PatientsController.prototype.deletePatient = function (patientId) {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/deletePatientDialog.html',
                    controller: PatientApp.Controllers.ModalController,
                    controllerAs: 'controller',
                    resolve: {
                        patientIdFrom: function () { return patientId; }
                    },
                    size: 'md'
                }).result.then(function () {
                    _this.getPatients();
                });
            };
            return PatientsController;
        }());
        Controllers.PatientsController = PatientsController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientsController.js.map