var PatientApp;
(function (PatientApp) {
    var Controllers;
    (function (Controllers) {
        var ChatController = (function () {
            function ChatController(patientsServices, firebaseService, $scope, $firebaseObject, $location) {
                this.patientsServices = patientsServices;
                this.firebaseService = firebaseService;
                this.$scope = $scope;
                this.$firebaseObject = $firebaseObject;
                this.$location = $location;
                this.myFirebase = new Firebase('https://impatient-f2cf2.firebaseio.com/');
                this.startListening();
                this.getCurrentNurse();
                this.getAllNurses();
            }
            //sends message to reciepnt
            ChatController.prototype.sendMessage = function (value) {
                this.usernameInput = document.querySelector('#username');
                this.textInput = document.querySelector('#text');
                this.postButton = document.querySelector('#post');
                this.username = this.nurseUser.applicationUser.firstName;
                var loginButton = document.querySelector('#login');
                this.postButton.addEventListener;
                this.msgSender = this.username;
                this.msgSender = this.usernameInput.value;
                this.msgReciever = this.selectedNurse.applicationUser.firstName;
                this.msgText = this.textInput.value;
                this.myFirebase.push({ username: this.msgSender, text: this.msgText, messageTo: this.msgReciever });
                this.textInput = "";
                location.reload();
            };
            // listens for any changes in the database and post them
            ChatController.prototype.startListening = function () {
                var _this = this;
                this.myFirebase.on('child_added', function (snapshot) {
                    var msg = snapshot.val();
                    if (_this.username == _this.msgReciever) {
                        var msgUsernameElement = document.createElement("b");
                        msgUsernameElement.textContent = msg.username;
                        var msgTextElement = document.createElement("p");
                        msgTextElement.textContent = msg.text;
                        var msgElement = document.createElement("div");
                        msgElement.appendChild(msgUsernameElement);
                        msgElement.appendChild(msgTextElement);
                        msgElement.className = "msg";
                        document.getElementById("results").appendChild(msgElement);
                    }
                });
            };
            ChatController.prototype.getCurrentNurse = function () {
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
            ChatController.prototype.getAllNurses = function () {
                this.nurses = this.patientsServices.getNurses();
            };
            ChatController.prototype.newFirebaseNurse = function () {
                //this.nurseKey = firebase.database().ref().child('nurses').push().key;
                var updates = {};
                updates["/nurses/" + this.nurses.firstName + this.nurses.lastName];
                return this.myFirebase.database().ref().update(updates);
            };
            return ChatController;
        }());
        Controllers.ChatController = ChatController;
    })(Controllers = PatientApp.Controllers || (PatientApp.Controllers = {}));
})(PatientApp || (PatientApp = {}));
//# sourceMappingURL=chatController.js.map