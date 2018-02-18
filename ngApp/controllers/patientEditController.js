var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var PatientEditController = (function () {
            function PatientEditController(patientsServices, $state, $stateParams, firebaseService) {
                this.patientsServices = patientsServices;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.firebaseService = firebaseService;
                this.ref = new Firebase("https://impatient-3b3b4.firebaseio.com/");
                this.patientId = $stateParams["id"];
                this.getNurses();
                this.getPatient();
            }
            //gets the patient info from database to populate the fields for edit
            PatientEditController.prototype.getPatient = function () {
                var _this = this;
                this.patientsServices.getRegisteredPatient(this.patientId).then(function (data) {
                    _this.patient = data.patient;
                    _this.assignedNurse = data.primaryNurseFullName;
                    _this.patient.checkInDate = new Date(_this.patient.checkInDate);
                    _this.patient.checkOutDate = new Date(_this.patient.checkOutDate);
                    _this.patient.dependency = data.patient.dependency;
                    _this.assignedNurseId = _this.patient.nurseId;
                });
            };
            //saves patient info in the Patient table
            PatientEditController.prototype.editPatient = function () {
                var _this = this;
                this.editFirebasePatient();
                this.clearPageMessages();
                this.patientsServices.savePatient(this.assignedNurseId, this.patient.applicationUser, this.patient).then(function (data) {
                    _this.patient = data;
                    _this.$state.go("admitted");
                }).catch(function (results) {
                    _this.validationErrors = results;
                });
            };
            PatientEditController.prototype.getNurseFirebaseKey = function () {
                for (var i = 0; i < this.nurses.length; i++) {
                    if (this.nurses[i].id == this.patient.nurseId) {
                        return this.nurses[i].firebaseNurseKey;
                    }
                }
            };
            PatientEditController.prototype.editFirebasePatient = function () {
                var updates = {};
                updates["/nurses/" + this.firebaseNurseKey + "/patients/" + this.patientKey] = this.patient, this.assignedNurse;
                return firebase.database().ref().update(updates);
            };
            PatientEditController.prototype.getNurses = function () {
                this.nurses = this.patientsServices.getNurses();
            };
            PatientEditController.prototype.cancel = function () {
                this.$state.go("admitted");
            };
            PatientEditController.prototype.clearPageMessages = function () {
                this.validationErrors = null;
            };
            return PatientEditController;
        }());
        Controllers.PatientEditController = PatientEditController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientEditController.js.map