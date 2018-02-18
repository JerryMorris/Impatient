var PatientApp;
(function (PatientApp) {
    var Services;
    (function (Services) {
        var FirebaseService = (function () {
            function FirebaseService() {
                this.config = {
                    apiKey: "AIzaSyAZmrEBQZxEQuyIGBb9o8OqhfnSLZRMDgY",
                    authDomain: "impatient-3b3b4.firebaseapp.com",
                    databaseURL: "https://impatient-3b3b4.firebaseio.com",
                    storageBucket: "impatient-3b3b4.appspot.com"
                };
                firebase.initializeApp(this.config);
                this.database = firebase.database();
            }
            return FirebaseService;
        }());
        Services.FirebaseService = FirebaseService;
        angular.module('PatientApp').service('firebaseService', FirebaseService);
    })(Services = PatientApp.Services || (PatientApp.Services = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=firebaseDBSetup.js.map