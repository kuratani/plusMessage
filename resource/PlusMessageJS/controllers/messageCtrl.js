'use strict';

msgapp.controller('MessageCtrl', function MessageCtrl($scope, $translate, $modal, $route, $routeParams, $window, messageService, messageUtil) {
	var convs = $scope.convs;
	var users = $scope.users;
	var members = $scope.members = [];
	var membersId = $scope.membersId = [];
	var msgs = $scope.msgs;
	var userId = $scope.userId;
	var languageLocaleKey = $scope.languageLocaleKey;
	$scope.message = "";
	$scope.query = "";
	$scope.loading = false;
	$scope.loadingDialog = false;
	$scope.err = null;
	$scope.errDialog = null;

	$scope.getConversations = function () {
		$scope.loading = true;
		messageService.getConversations(
			function(result) {
				$scope.convs = messageUtil.filterConversations(result);
				$scope.loading = false;
				$scope.$apply();
			},
			function(e) {
				console.log(e);
				$scope.err = e;
				$scope.loading = false;
				$scope.$apply();
			});
	};

	$scope.getConversation = function(id) {
		$scope.loading = true;
		messageService.getConversation(
			id,
			function(result) {
				$scope.msgs = messageUtil.filterMessages(userId, result);
				$scope.loading = false;
				$scope.$apply();
			},
			function(e) {
				console.log(e);
				$scope.err = e;
				$scope.loading = false;
				$scope.$apply();
			});
	};

	$scope.sendMessage = function() {
		if($scope.message.length == 0) return;
		if($scope.membersId.length == 0) return;

		var modalInstance = $modal.open({
			templateUrl: "waiting-dialog.html",
			backdrop: "static",
			scope: $scope
		});
		messageService.sendMessage(
			$scope.message,
			$scope.membersId.join(','),
			function(result) {
				modalInstance.close();
				$window.location.href = '#/' + result.conversationId;
			},
			function(e) {
				console.log(e);
				$scope.err = e;
				modalInstance.close();
				$scope.$apply();
			});
	};

	$scope.replyToMessage = function() {
		if($scope.message.length == 0) return;

		var modalInstance = $modal.open({
			templateUrl: "waiting-dialog.html",
			backdrop: "static",
			scope: $scope
		});
		messageService.replyToMessage(
			$scope.message,
			$scope.msgs.messages.messages[0].id,
			function(result) {
				$scope.msgs.messages.messages.unshift(messageUtil.filterMessage(userId, result));
				$scope.message = "";
				modalInstance.close();
				$scope.$apply();
			},
			function(e) {
				console.log(e);
				$scope.err = e;
				$scope.$apply(); 
				modalInstance.close();
			});
	};

	$scope.openSearchUsers = function(){
		$scope.searchUsers = {};
		var modalInstance = $modal.open({
			templateUrl: "search-user-dialog.html",
			scope: $scope
		});

		$scope.searchUsers = function(q) {
			$scope.loadingDialog = true;
			messageService.searchUsers(
				q,
				function(result) {
					$scope.users = messageUtil.filterUsers(result.users, [ userId ].concat($scope.membersId));
					$scope.loadingDialog = false;
					$scope.$apply();
				},
				function(e) {
					console.log(e);
					$scope.errDialog = e;
					$scope.loadingDialog = false;
					$scope.$apply();
				});
		};

		$scope.addUser = function(user) {
			$scope.members.push(user);
			membersId.push(user.id);
			modalInstance.close();
		};

		$scope.$watch('searchUsers.query', function (newValue, oldValue) {
			$scope.searchUsers(newValue);
		}, true);
	};

	$scope.openUsersDialog = function() {
		$modal.open({
			templateUrl: "users-dialog.html",
			scope: $scope
		});
	};

	$translate.use(languageLocaleKey);
	if($route.current.originalPath == '/') {
		$scope.getConversations();
	} else if($route.current.originalPath == '/send/') {
		$scope.openSearchUsers();
	} else if($route.current.originalPath == '/:id') {
		$scope.getConversation($routeParams.id);
	}

});