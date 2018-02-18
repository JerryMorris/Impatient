var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var AngularFireController = (function () {
            function AngularFireController($scope, $firebaseObject) {
                this.$scope = $scope;
                this.$firebaseObject = $firebaseObject;
                var ref = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses");
                var syncObject = $firebaseObject(ref);
                syncObject.$bindTo($scope, "nurses");
            }
            return AngularFireController;
        }());
        Controllers.AngularFireController = AngularFireController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=angularFireController.js.map