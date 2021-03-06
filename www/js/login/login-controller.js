angular.module('finalProjectiOS')

.controller('LoginCtrl', function ($scope, $rootScope, LocalStorageService, LogService, $auth, $ionicPopup) {

    $scope.closeLogin = function () {

        $rootScope.modal.hide();

    }

    $scope.loginData = function () {

        username: '';
        password: '';

    };
    
    $scope.time = new Date();

    $scope.validationFail = false;

    $scope.doLogin = function () {

        if (validateUserName($scope.loginData.username) && validatePassword($scope.loginData.password)) {

            $rootScope.$broadcast('authentication-succeeded');

//            LogService.addLog({
//                name: $scope.loginData.username,
//                password: $scope.loginData.password
//            });
            
            LogService.addLog($scope.time + '. Authentication Success. Username: ' +  $scope.loginData.username + '. Password: ' + $scope.loginData.password);
            

        } else {

            $scope.validationFail = true;

//            LogService.addLog({
//                date: new Date(),
//                name: 'Authentication Failed'
//            });
            
            LogService.addLog($scope.time + ' Authentication Failed...');

        }

    }

    function validateUserName(username) {

        return (username && username.toLowerCase() !== 'guest')

    };

    function validatePassword(password) {

        return (password && password.length > 4)

    };

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function () {

                $rootScope.$broadcast('authentication-succeeded');


                $ionicPopup.alert({
                    
                    title: 'Success',
                    content: 'You are now logged in through Facebook'
                    
                });
            
            })
        
            .catch(function (response) {
            
                $ionicPopup.alert({
                    title: 'Error',
                    content: response.data ? response.data || response.data.message : response
                });
            });
    };

    $scope.isAuthenticated = function () {
        
        return $auth.isAuthenticated();
        
    };

    $scope.logout = function () {
        
        $auth.logout().then(function () {
            
            $ionicPopup.alert({
                title: 'Success',
                content: 'You have successfully logged out of Facebook'
                
            })
        })
    };

});
