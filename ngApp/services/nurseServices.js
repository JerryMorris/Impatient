var PatientApp;
(function (PatientApp) {
    var Services;
    (function (Services) {
        var NurseServices = (function () {
            function NurseServices($resource) {
                this.nurseResources = $resource("/api/nurse", null, {
                    GetAssignedPatients: {
                        method: 'GET',
                        url: '/api/nurse/getassignedpatients',
                        isArray: true
                    },
                    registerNurse: {
                        method: 'POST',
                        url: '/api/nurse/registernurse'
                    },
                    getNurseKeyByLoginNurse: {
                        method: 'GET',
                        url: '/api/nurse/getnurseKeybyloginnurse'
                    }
                });
            }
            NurseServices.prototype.getAssignedPatients = function (nurseId) {
                return this.nurseResources.GetAssignedPatients(nurseId);
            };
            NurseServices.prototype.getNurseKeyByLoginNurse = function () {
                return this.nurseResources.getNurseKeyByLoginNurse().$promise;
            };
            NurseServices.prototype.registerNurse = function (nurse) {
                debugger;
                var dataVm = {};
                dataVm.email = nurse.email;
                dataVm.password = nurse.password;
                dataVm.confirmPassword = nurse.confirmPassword;
                dataVm.firstName = nurse.firstName;
                dataVm.lastName = nurse.lastName;
                return this.nurseResources.registerNurse(dataVm).$promise;
            };
            return NurseServices;
        }());
        Services.NurseServices = NurseServices;
        angular.module('PatientApp').service('nurseServices', NurseServices);
    })(Services = PatientApp.Services || (PatientApp.Services = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=nurseServices.js.map