var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var NurseCreateController = (function () {
            function NurseCreateController(nurseServices, $state, firebaseService) {
                this.nurseServices = nurseServices;
                this.$state = $state;
                this.firebaseService = firebaseService;
                this.ref = new Firebase("https://impatient-3b3b4.firebaseio.com/");
            }
            //creates the nurse in SQL and then fire the method to create nurse in Firebase
            NurseCreateController.prototype.registerNurse = function () {
                var _this = this;
                this.nurseServices.registerNurse(this.registerUser).then(function (data) {
                    _this.registerUser = data;
                    _this.$state.go("adminAllNursesActivities");
                }).catch(function (err) {
                    var validationErrors = [];
                    for (var prop in err.data) {
                        var propErrors = err.data[prop];
                        validationErrors = validationErrors.concat(propErrors);
                    }
                    _this.validationErrors = validationErrors;
                });
                this.newFirebaseNurse();
            };
            //adds a new nurse to the database (parent node that contains patients which contain messages)
            NurseCreateController.prototype.newFirebaseNurse = function () {
                //this.nurseKey = firebase.database().ref().child('nurses').push().key;
                var updates = {};
                updates["/nurses/" + this.registerUser.firstName + this.registerUser.lastName] = this.registerUser;
                return firebase.database().ref().update(updates);
            };
            NurseCreateController.prototype.cancel = function () {
                this.$state.go("adminAllNursesActivities");
            };
            return NurseCreateController;
        }());
        Controllers.NurseCreateController = NurseCreateController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=nurseCreateController.js.map