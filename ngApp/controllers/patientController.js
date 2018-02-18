var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var PatientController = (function () {
            function PatientController(patientsServices, $stateParams, $state, firebaseService) {
                var _this = this;
                this.patientsServices = patientsServices;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.firebaseService = firebaseService;
                this.patient = {};
                this.patientsServices.getCurrentPatient().then(function (data) {
                    _this.patientUser = data;
                    console.log(_this.patientUser);
                });
                this.patientsServices.getCurrentPatient().then(function (data2) {
                    var self = _this;
                    self.patient = data2;
                    _this.setPatientView();
                    _this.patientId = _this.patient.id;
                    _this.getAssignedNurse();
                });
            }
            PatientController.prototype.setPatientView = function () {
                if (this.patient.dependency == 1) {
                    this.$state.go("patient1");
                }
                else if (this.patient.dependency == 2) {
                    this.$state.go("patient2");
                }
                else if (this.patient.dependency == 3) {
                    this.$state.go("patient3");
                }
            };
            PatientController.prototype.getAssignedNurse = function () {
                var _this = this;
                this.patientsServices.getAssignedNurse(this.patientId).then(function (data) {
                    _this.assignedNurse = data;
                });
            };
            PatientController.prototype.sendMessage = function (messageText) {
                this.messageFromView = messageText;
                this.patientsServices.sendMessage(this.patient.applicationUserId, messageText);
                this.newNotification();
            };
            //adds new notification to the firebase db
            PatientController.prototype.newNotification = function () {
                this.messageKey = firebase.database().ref().child('notifications').push().key;
                this.messageVM = {};
                var updates = {};
                this.messageVM.message = this.messageFromView;
                var patientRef = new Firebase("https://impatient-3b3b4.firebaseio.com/" + "/nurses/" + this.assignedNurse.applicationUser.firstName + this.assignedNurse.applicationUser.lastName +
                    "/patients/" + this.patient.applicationUser.firstName + this.patient.applicationUser.lastName + "/icon");
                if (this.messageFromView == "emergency") {
                    updates["/nurses/" + this.assignedNurse.applicationUser.firstName + this.assignedNurse.applicationUser.lastName + "/patients/" + this.patient.applicationUser.firstName + this.patient.applicationUser.lastName + "/icon"] = "../../images/redBedIcon.png";
                    firebase.database().ref().update(updates);
                }
                else {
                    updates["/nurses/" + this.assignedNurse.applicationUser.firstName + this.assignedNurse.applicationUser.lastName + "/patients/" + this.patient.applicationUser.firstName + this.patient.applicationUser.lastName + "/icon"] = "../../images/yellowBedIcon.png";
                    firebase.database().ref().update(updates);
                }
                this.messageVM.timeRequested = Date.now();
                this.messageVM.timeResponded = (new Date("01/01/0001")).toString();
                this.messageVM.id = this.messageKey;
                var messageListRef = new Firebase("https://impatient-3b3b4.firebaseio.com/" + "/nurses/" + this.assignedNurse.applicationUser.firstName + this.assignedNurse.applicationUser.lastName + "/patients/" + this.patient.applicationUser.firstName + this.patient.applicationUser.lastName + "/messages/" + this.messageKey);
                messageListRef = messageListRef.update(this.messageVM);
                patientRef = patientRef.update(patientRef);
            };
            return PatientController;
        }());
        Controllers.PatientController = PatientController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientController.js.map