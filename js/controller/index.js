app.controller('index', ['$scope', 'userService', 'fileReader', function($scope, userService, fileReader) {
	console.debug($scope);
	$scope.user = {
		name: '',
		avatar: 'img/avatar.png',
		address: '',
		subAddress: '',
		phone: '',
		number: '31 1240 1075 2001 3850 0000 ' + Math.floor(Math.random() * 9999),
		balance: '1000',
		created: new Date().getTime(),
		updated: new Date().getTime(),
		current: true,
		transfers: [],
		recipient: []
	};

	var promise = userService.getAll();
	promise.then(function(users) {
		$scope.users = users;
		// wyloguj wszystkich
		for (var i = 0, user = users[i]; i < users.length; user = users[++i]) {
			user.quizDone = false;
			if (user.current === true) {
				user.current = false;
				user.updated = new Date().getTime();
				userService.update(user);
			}
		}
	});

	$scope.create = function(location) {
		var promise = userService.create($scope.user);
		promise.then(function(user) {
			document.location = location;
		});
	};

	$scope.login = function(id, location) {
		var promise = userService.get(id);
		promise.then(function(user) {
			user.current = true;
			return userService.update(user);
		}).then(function(user) {
			document.location = location;
		});
	};

	$scope.getFile = function() {
		fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
			$scope.user.avatar = result;
		});
	};
}]);
