var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var MyMessageController = (function () {
            function MyMessageController(patientsServices, firebaseService, $scope, $firebaseObject, moment) {
                this.patientsServices = patientsServices;
                this.firebaseService = firebaseService;
                this.$scope = $scope;
                this.$firebaseObject = $firebaseObject;
                this.moment = moment;
                this.getCurrentNurse();
                this.getMyMessages();
            }
            MyMessageController.prototype.getCurrentNurse = function () {
                var _this = this;
                var self = this;
                this.patientsServices.getCurrentUser().then(function (data) {
                    self.nurseUser = data;
                    _this.nurseName = _this.nurseUser.applicationUser.firstName + _this.nurseUser.applicationUser.lastName; //used to access nurse node
                    _this.ref = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses/" + _this.nurseName);
                    var syncObject = _this.$firebaseObject(_this.ref);
                    syncObject.$bindTo(_this.$scope, "nurse");
                });
            };
            MyMessageController.prototype.getMyMessages = function () {
                var _this = this;
                this.myMessages = this.patientsServices.getMyMessages()
                    .then(function (data) {
                    _this.myMessages = data.messages;
                    _this.nurse = data;
                }).catch(function (err) {
                    var validationErrors = [];
                    for (var prop in err.data) {
                        var propErrors = err.data[prop];
                        validationErrors = validationErrors.concat(propErrors);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            MyMessageController.prototype.dismissFirebase = function (messageKey, nameKey) {
                var ref = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses/" + this.nurseName + "/patients/" + nameKey + "/messages/" + messageKey);
                ref.orderByChild("message").on("value", function (snapshot) {
                    var snapshot1 = snapshot.val();
                    console.log(snapshot.val());
                    for (var k in snapshot1) {
                        if (!snapshot1.hasOwnProperty(k))
                            continue;
                        if (snapshot1[k].message == "emergency") {
                            console.log("there is an emergency!");
                        }
                        else {
                            var updates = {};
                            var iconRef = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses/" + this.nurseName + "/patients/" + nameKey + "/icon");
                            updates["/nurses/" + this.nurseName + "/patients/" + nameKey + "/icon"] = "../../images/yellowBedIcon.png";
                            console.log("everything is fine");
                        }
                    }
                });
                ref.remove();
            };
            MyMessageController.prototype.dismissAll = function (nameKey) {
                var updates = {};
                var messageRef = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses/" + this.nurseName + "/patients/" + nameKey + "/messages/");
                var iconRef = new Firebase("https://impatient-3b3b4.firebaseio.com/nurses/" + this.nurseName + "/patients/" + nameKey + "/icon");
                updates["/nurses/" + this.nurseName + "/patients/" + nameKey + "/icon"] = "../../images/greenBedIcon.png";
                firebase.database().ref().update(updates);
                messageRef.remove();
            };
            return MyMessageController;
        }());
        Controllers.MyMessageController = MyMessageController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=myMessageController.js.map