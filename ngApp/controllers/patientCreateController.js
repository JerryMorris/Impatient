var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var PatientCreateController = (function () {
            function PatientCreateController(patientsServices, $state, firebaseService) {
                this.patientsServices = patientsServices;
                this.$state = $state;
                this.firebaseService = firebaseService;
                this.ref = new Firebase("https://impatient-3b3b4.firebaseio.com/");
                this.clearPageMessages();
                this.getNurses();
                this.patient = {};
                //this.patient.checkInDate = null;
                this.patient.checkInDate = new Date(Date.now());
            }
            PatientCreateController.prototype.getNurses = function () {
                this.nurses = this.patientsServices.getNurses();
            };
            //saves patient info in the application user table and patient table in SQL
            //then calls the method that saves patient in Firebase database
            PatientCreateController.prototype.addRegisterUser = function () {
                var _this = this;
                this.clearPageMessages();
                this.firebaseNurseKey = this.getNurseFirebaseKey();
                this.newFirebasePatient();
                this.patientsServices.registerPatient(this.registerUser, this.patient, this.patientKey).then(function () {
                    _this.$state.go("admitted");
                }).catch(function (result) {
                    _this.validationMessages = _this.flattenValidation(result.data);
                });
            };
            PatientCreateController.prototype.getNurseFirebaseKey = function () {
                for (var i = 0; i < this.nurses.length; i++) {
                    if (this.nurses[i].id == this.patient.nurseId) {
                        return this.nurses[i];
                    }
                }
            };
            //adds a new patient to the database under the nurse key defined above (need to change it so you can add to the correct nurse)
            PatientCreateController.prototype.newFirebasePatient = function () {
                this.patientKey = firebase.database().ref().child('patients').push().key;
                this.patientVM = {};
                this.patientVM.icon = "../../images/greenBedIcon.png";
                this.patientVM.firstName = this.registerUser.firstName;
                this.patientVM.lastName = this.registerUser.lastName;
                this.patientVM.roomNumber = this.patient.roomNumber;
                this.patientVM.bedNumber = this.patient.bedNumber;
                this.patientVM.checkInDate = this.patient.checkInDate;
                this.patientVM.dependency = this.patient.dependency;
                this.patientVM.nurseId = this.patient.nurseId;
                this.patientVM.notes = this.patient.notes;
                //this.patientVM.messages = [];
                var updates = {};
                updates["/nurses/" + this.firebaseNurseKey.applicationUser.firstName + this.firebaseNurseKey.applicationUser.lastName + "/patients/" + this.registerUser.firstName + this.registerUser.lastName] = this.patientVM;
                return firebase.database().ref().update(updates);
            };
            PatientCreateController.prototype.cancel = function () {
                this.$state.go("admitted");
            };
            PatientCreateController.prototype.clearPageMessages = function () {
                this.validationErrors = null;
                this.validationMessages = null;
            };
            //method used to extract the modelState errors
            PatientCreateController.prototype.flattenValidation = function (modelState) {
                var messages = [];
                for (var prop in modelState) {
                    messages = messages.concat(modelState[prop]);
                }
                return messages;
            };
            return PatientCreateController;
        }());
        Controllers.PatientCreateController = PatientCreateController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientCreateController.js.map