var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var AdminNurseDashboardDetailsDialogController = (function () {
            function AdminNurseDashboardDetailsDialogController(nurseIdFrom, nurseAppUserIdFrom, patientsServices, $uibModalInstance) {
                this.nurseIdFrom = nurseIdFrom;
                this.nurseAppUserIdFrom = nurseAppUserIdFrom;
                this.patientsServices = patientsServices;
                this.$uibModalInstance = $uibModalInstance;
                this.patientMessages = [];
                this.countMessages();
            }
            //retrieve the nurse patients' messages activities
            AdminNurseDashboardDetailsDialogController.prototype.countMessages = function () {
                var _this = this;
                this.patientsServices.getNursePatientsMessages(this.nurseAppUserIdFrom).then(function (data) {
                    debugger;
                    if (data.length == 0) {
                        data = {};
                    }
                    _this.patientMessages = data;
                    _this.nurseName = data[0].nurse.applicationUser.firstName + " " + data[0].nurse.applicationUser.lastName;
                }).catch(function (err) {
                    var validationErrors = [];
                    for (var prop in err.data) {
                        var propErrors = err.data[prop];
                        validationErrors = validationErrors.concat(propErrors);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            AdminNurseDashboardDetailsDialogController.prototype.close = function () {
                this.$uibModalInstance.close();
            };
            return AdminNurseDashboardDetailsDialogController;
        }());
        Controllers.AdminNurseDashboardDetailsDialogController = AdminNurseDashboardDetailsDialogController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=adminNurseDashboardDetailsDialogController.js.map