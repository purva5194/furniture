var myApp = angular.module('myApp', ['ngRoute']);
var Item_name="";
var Item_manu="";
var Item_price="";

myApp.config(function($routeProvider){
  $routeProvider
  
  .when('/login',{
    templateUrl : '/login.html',
    controller : 'RegCtrl'
  })

  .when('/home',{
    templateUrl : '/home.html',
    controller : 'HomeCtrl'
	
  })
  
  .when('/contact',{
    templateUrl : '/contact.html',
    controller : 'ContactCtrl'
  })
  
  .when('/livingroom',{
    templateUrl : '/LivingRoom.html',
    controller : 'LivingRoomCtrl'
  })
  
  .when('/bedroom',{
    templateUrl : '/Bedroom.html',
    controller : 'BedroomCtrl'
  })
  
  .when('/diningroom',{
    templateUrl : '/Dining Room.html',
    controller : 'DiningroomCtrl'
  })
  
  .when('/studyroom',{
    templateUrl : '/StudyRoom.html',
    controller : 'StudyroomCtrl'
  })
  
  .when('/userdetail',{
    templateUrl : '/UserDetail.html',
    controller : 'UserCtrl'
  })
  
  .when('/productdetail',{
    templateUrl : '/product_detail.html',
    controller : 'ProductCtrl'
  })
  
  .when('/cart',{
    templateUrl : '/cart.html',
    controller : 'CartCtrl'
  })
  
  .when('/emptycart',{
    templateUrl : '/emptyCart.html',
    controller : 'EmptyCartCtrl'
  })
  
  .when('/sale',{
    templateUrl : '/sale.html',
    controller : 'SaleCtrl'
  })
  .otherwise({redirectTo: '/home'});
});

myApp.factory('Scopes', function ($rootScope) {
    var mem = {};
 
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});
/**
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/contactlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿
**/

//registration
myApp.controller('RegCtrl', ['$scope', '$http', '$location', '$rootScope', '$window', function($scope, $http, $location, $rootScope, $window) {
    console.log("Hello World from controller");

	//destroy session
	$http.get('/sessiondestroy').success(function(response){
		console.log("session destroyed");
		$rootScope.loginlogout = "Login";
		$rootScope.username="";		//no use logged in
	});

	// insert customer details
	$scope.addCustomer = function() {
	  console.log($scope.customer);
	  $http.post('/customerlist', $scope.customer).success(function(response) {
		console.log(response);
		$window.alert("Registration Successful..!!")
	  });
	};

	//check username and password
	$scope.checkCustomer = function(name,password) {
		console.log($scope.login);
	  $http.get('/customerlist/'+ name +'/'+password, $scope.login).success(function(response) {
		console.log("I got the data I requested");
		console.log(response);
		
		$scope.status="Wrong username or Password. Try Again!!";
		
		if(response.toString() == "successful"){
			$scope.status="";
			$location.path('/home');
	}
  });
};

}]);﻿

//home
myApp.controller('HomeCtrl', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
    console.log("Hello World from Home controller");
	
	console.log('onload');
	
	//session checking
	$http.get('/sessioncheck').success(function(response) {
    console.log("I got the data I requested");
    console.log(response);
	
	if(response.toString() == 'not exist'){
		$rootScope.loginlogout='Login';
		$rootScope.username="";
	}
	else{
		$rootScope.loginlogout='Logout';
		$rootScope.username=response.toString();
	}

  });
		
	$scope.detail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};


}]);﻿

//living room
myApp.controller('LivingRoomCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    console.log("Hello World from living room  controller");
	
	$scope.detail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};

}]);﻿

//bed room
myApp.controller('BedroomCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    console.log("Hello World from  Bedroom  controller");
	
	$scope.detail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};

}]);﻿

//dining room
myApp.controller('DiningroomCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    console.log("Hello World from  Dining room  controller");
	
	$scope.detail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};


}]);﻿

//study room
myApp.controller('StudyroomCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    console.log("Hello World from  study room  controller");
	
	$scope.detail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};

}]);

//USer Detail
myApp.controller('UserCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    console.log("Hello World from  User  controller");
	console.log($rootScope.username);
	var temp_username = $rootScope.username;
	
	$http.get('/customerlist/'+ temp_username).success(function(response) {
    console.log("I got the user info");
    //console.log(response);
	
	$scope.u_name=response.name;
	$scope.u_address=response.address;
	$scope.u_city=response.city;
	$scope.u_state=response.state;
	$scope.u_zip=response.zip;
	$scope.u_phone=response.phonenumber;
	$scope.u_email=response.email;
  });
}]);

//product detail
myApp.controller('ProductCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', function($scope, $http, $window, $location, $rootScope) {
    console.log("Hello World from  product  controller");
	
	console.log(Item_name, Item_manu, Item_price);
	
	//fetch data from itemlist
	$http.get('/customerlist/'+ Item_name +'/'+ Item_manu +'/'+ Item_price).success(function(response) {
    console.log("I got the item info");
    console.log(response);
	
	$scope.Item=response;;
	
  });
  
  // add item into user's cart 
  $scope.addToCart = function()
	{
		console.log($scope.Item);
		//check whether the user is logged in or not
		if($rootScope.username.toString() == ""){
			//if not
			$window.alert("Please Sign in to add item in your cart..!")
			$location.path('/login');
		}
		else{
			//if yes
			console.log($rootScope.username);
			$http.post('/cartlist/' + $rootScope.username, $scope.Item).success(function(response) {
			console.log("data entry done..!");
			console.log(response);
			});
		
			$window.alert('Product Added to Cart Successfully..!!');
		}	
	};

}]);

//cart
myApp.controller('CartCtrl', ['$scope', '$http', '$window', '$rootScope', '$location', function($scope, $http, $window, $rootScope, $location) {
    console.log("Hello World from Cart controller");
	console.log($rootScope.username);
	
	var refresh = function() {
		if($rootScope.username.toString() == ""){
			$window.alert("Please Sign in to see items you may have already added to your cart..!")
			$location.path('/login');
		}
		else{
			$http.get('/cartlist/'+ $rootScope.username).success(function(response) {
			console.log("I got the item info");
			console.log(response);
			
			if(response.length <1)
			{
				$location.path('/emptycart');
			}
			else{
			var total=0;
			
			for(var i=0; i<response.length; i++)
			{
				response[i].itemPrice=(response[i].itemPrice).substr(1);
				total=total + parseFloat(response[i].itemPrice)*parseFloat(response[i].itemCustQnty);
			}
			$scope.itemlist=response;
			console.log(total);
			$scope.total=total;
			$scope.vat = (parseFloat(total) * 8.5) /100;
			$scope.totalWithTax = parseFloat($scope.vat) + parseInt($scope.total) + 2;
			
			}
		});
		}
	}
	refresh();
	
	// delete item from user's cart 
	$scope.deleteItem = function(cart_id)
	{
		console.log("delete request");
		console.log(cart_id);
		$http.delete('/cartlist/' + cart_id).success(function(response) {
		refresh();
		});
	}
	
	//cancel
	$scope.cancel = function()
	{
		$location.path('/home');
	}
}]);﻿

//sale
myApp.controller('SaleCtrl', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
    console.log("Hello World from Sale controller");

		
	$scope.itemDetail= function(name,manu,price)
	{
		Item_name=name;
		Item_manu=manu;
		Item_price=price;
	};


}]);﻿

//empty cart
myApp.controller('EmptyCartCtrl', ['$scope', '$http', '$window', '$rootScope', '$location', function($scope, $http, $window, $rootScope, $location) {
    console.log("Hello World from empty cart controller");

	$scope.cancel = function()
	{
		$location.path('/home');
	}
	
}]);﻿