var PatientApp;
(function (PatientApp) {
    var Services;
    (function (Services) {
        var PatientsServices = (function () {
            function PatientsServices($resource, $q, $http) {
                this.$q = $q;
                this.$http = $http;
                this.messageResources = $resource("/api/myMessage", null, {
                    SendMessage: {
                        method: 'POST',
                        url: '/api/myMessage/sendmessage/:id/:message',
                        isArray: false
                    },
                    dismissIncident: {
                        method: 'POST',
                        url: "/api/myMessage/dismissincident"
                    },
                    getPatientMessages: {
                        method: 'GET',
                        url: '/api/myMessage/getpatientmessages',
                        isArray: true
                    },
                    getNursePatientsMessages: {
                        method: 'GET',
                        url: '/api/myMessage/getNursePatientsMessages/:nurseAppUserId',
                        isArray: true
                    },
                    getMyMessages: {
                        method: 'GET',
                        url: '/api/myMessage/getmymessages'
                    }
                });
                this.nurseResources = $resource("/api/nurse/:id", null, {
                    GetAssignedPatients: {
                        method: 'GET',
                        url: '/api/nurse/getassignedpatients',
                        isArray: true
                    }
                });
                this.patientResources = $resource("/api/patient/:id", null, {
                    GetAssignedNurse: {
                        method: 'GET',
                        url: '/api/patient/getassignednurse'
                    },
                    getRegisteredPatient: {
                        method: 'GET',
                        url: '/api/patient/getregisteredpatient/:id'
                    },
                    registerPatient: {
                        method: 'POST',
                        url: '/api/patient/registerpatient'
                    }
                });
                this.userResources = $resource("/api/user/:id", null, {
                    GetCurrentUser: {
                        method: 'GET',
                        url: '/api/user/getcurrentuser'
                    },
                    GetCurrentPatient: {
                        method: 'GET',
                        url: '/api/user/getcurrentpatient'
                    }
                });
            }
            //this is used to get the messages for the Nurse from the sQL side 
            //UI page has been migrated to Firebase
            PatientsServices.prototype.getMyMessages = function () {
                return this.messageResources.getMyMessages().$promise;
            };
            PatientsServices.prototype.getPatients = function () {
                return this.patientResources.query().$promise;
            };
            //used for patient edit
            PatientsServices.prototype.getRegisteredPatient = function (patientId) {
                return this.patientResources.getRegisteredPatient({ id: patientId }).$promise;
            };
            PatientsServices.prototype.getPatientMessages = function () {
                return this.messageResources.getPatientMessages().$promise;
            };
            //used to get the nurse patients messages
            PatientsServices.prototype.getNursePatientsMessages = function (nurseAppUserId) {
                return this.messageResources.getNursePatientsMessages({ nurseAppUserId: nurseAppUserId }).$promise;
            };
            //returns a single patient 
            PatientsServices.prototype.getPatient = function (patientId) {
                return this.patientResources.get({ id: patientId }).$promise;
            };
            PatientsServices.prototype.getAssignedNurse = function (patientId) {
                return this.patientResources.GetAssignedNurse({ id: patientId }).$promise;
            };
            PatientsServices.prototype.getNurses = function () {
                return this.nurseResources.query();
            };
            PatientsServices.prototype.getNurse = function (nurseId) {
                debugger;
                return this.nurseResources.get(nurseId).$promise;
            };
            PatientsServices.prototype.getAssignedPatients = function (nurseId) {
                return this.nurseResources.GetAssignedPatients({ id: nurseId }).$promise;
            };
            //used to update the message table with time responded
            PatientsServices.prototype.dismissIncident = function (messageId) {
                return this.messageResources.dismissIncident(messageId).$promise;
            };
            //use vm to separate saving patient appUser and patient table (one to one relationship)
            PatientsServices.prototype.registerPatient = function (userLogin, patient, firebasePatientKey) {
                var dataVm = {};
                dataVm.email = userLogin.email;
                dataVm.password = userLogin.password;
                dataVm.confirmPassword = userLogin.confirmPassword;
                dataVm.firstName = userLogin.firstName;
                dataVm.lastName = userLogin.lastName;
                dataVm.roomNumber = patient.roomNumber;
                dataVm.bedNumber = patient.bedNumber;
                dataVm.checkInDate = patient.checkInDate;
                dataVm.notes = patient.notes;
                dataVm.dependency = patient.dependency;
                dataVm.nurseId = patient.nurseId;
                dataVm.firebasePatientKey = firebasePatientKey;
                return this.patientResources.registerPatient(dataVm).$promise;
            };
            //edit patient info in both appUser and patient tables
            PatientsServices.prototype.savePatient = function (assignedNurseId, registerUser, patient) {
                var dataVm = {};
                dataVm.applicationUser = registerUser;
                dataVm.patient = patient;
                dataVm.assignedNurseId = assignedNurseId;
                dataVm.firebasePatientKey = patient.firebasePatientKey;
                return this.patientResources.save(dataVm).$promise;
            };
            PatientsServices.prototype.flattenValidation = function (modelState) {
                var messages = [];
                for (var prop in modelState) {
                    messages = messages.concat(modelState[prop]);
                }
                return messages;
            };
            PatientsServices.prototype.deletePatient = function (patientId) {
                return this.patientResources.remove({ id: patientId }).$promise;
            };
            PatientsServices.prototype.getCurrentUser = function () {
                return this.userResources.GetCurrentUser().$promise;
            };
            PatientsServices.prototype.getCurrentPatient = function () {
                return this.userResources.GetCurrentPatient().$promise;
            };
            PatientsServices.prototype.sendMessage = function (patientId, message) {
                var VM = {};
                VM.userId = patientId;
                VM.messageString = message;
                return this.messageResources.SendMessage(VM).$promise;
            };
            PatientsServices.prototype.countMessages = function () {
                return this.messageResources.get().$promise;
            };
            return PatientsServices;
        }());
        Services.PatientsServices = PatientsServices;
        angular.module("PatientApp").service("patientsServices", PatientsServices);
    })(Services = PatientApp.Services || (PatientApp.Services = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=patientsServices.js.map