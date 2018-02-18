var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var AdminAllNursesActivitiesController = (function () {
            function AdminAllNursesActivitiesController(patientsServices, $uibModal) {
                this.patientsServices = patientsServices;
                this.$uibModal = $uibModal;
                this.getAllNurses();
            }
            //gets list of all nurses for admin
            AdminAllNursesActivitiesController.prototype.getAllNurses = function () {
                this.nurses = this.patientsServices.getNurses();
            };
            //opens the modal and display the selected nurse patients' activities 
            AdminAllNursesActivitiesController.prototype.showDetailsDialog = function (nurseAppUserId, nurseId) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/nursePatientsDetailsDialog.html',
                    controller: PatientApp.Controllers.AdminNurseDashboardDetailsDialogController,
                    controllerAs: 'controller',
                    resolve: {
                        nurseAppUserIdFrom: function () { return nurseAppUserId; },
                        nurseIdFrom: function () { return nurseId; }
                    },
                    size: 'lg'
                });
            };
            return AdminAllNursesActivitiesController;
        }());
        Controllers.AdminAllNursesActivitiesController = AdminAllNursesActivitiesController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=adminAllNursesActivitiesController.js.map