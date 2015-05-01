angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.suppliers');
  };
  
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  console.log("ChatsCtrl");
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PlaceOrderCtrl', function($scope, $state){
  console.log("PlaceOrderCtrl");

  navigator.geolocation.getCurrentPosition(function(position){
    var map = new BMap.Map("allmap");            // 创建Map实例
    var geoc = new BMap.Geocoder(); 
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var gpsPoint = new BMap.Point(longitude, latitude); // 创建点坐标

    
    var translateCallback = function(point) {
      geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        $scope.address = addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        console.log($scope.address);
        $scope.$apply();
      }); 
    }

    BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标

  }, function(error){
    console.log(error);
    $scope.msg = error;
  },{ maximumAge: 0, timeout: 15000, enableHighAccuracy: true });

  //$scope.address = 'ABC';

  $scope.options = [
    { label: 'one', text: '2015年03月22日 上午，周日', value: 1 },
    { label: 'one', text: '2015年03月22日 下午，周日', value: 2 },
    { label: 'two', text: '2015年03月23日 上午，周一', value: 3 },
    { label: 'two', text: '2015年03月23日 下午，周一', value: 4 },
    { label: 'two', text: '2015年03月24日 上午，周二', value: 5 },
    { label: 'one', text: '2015年03月24日 下午，周二', value: 6 }
  ];

  $scope.placeOrder = function() {
    $state.go('tab.orders');
  }
})

.controller('SuppliersCtrl', function($scope, Suppliers, $state) {
  $scope.map = new BMap.Map("allmap");            // 创建Map实例
  $scope.map.enableScrollWheelZoom(true);
  $scope.geoc = new BMap.Geocoder(); 

  $scope.suppliers = Suppliers.all();

  console.log("SuppliersCtrl");
  $scope.remove = function(supplier) {
    Suppliers.remove(supplier);
  }

  if(navigator.geolocation) { 
     $scope.isSupported = "yes"// 支持
  } else {
     $scope.isSupported = "no"// 不支持
  }

  $scope.openSearch = function() {
    $state.go('tab.locationSearch');
    console.log("opening search");
  };

  function addMarker(point){
    var marker = new BMap.Marker(point);
    $scope.map.addOverlay(marker);
  }

  navigator.geolocation.getCurrentPosition(function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
    $scope.gpsPoint = new BMap.Point($scope.longitude, $scope.latitude); // 创建点坐标
    
    
    var translateCallback = function(point) {
      $scope.geoc.getLocation(point, function(rs){
        $scope.map.centerAndZoom(point, 16);
        addMarker(point);
        for (var i = 0; i < $scope.suppliers.length; i++) {
          var pt = new BMap.Point($scope.suppliers[i].lng, $scope.suppliers[i].lat);
          addMarker(pt);
        }
      }); 
    }

    BMap.Convertor.translate($scope.gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标

  }, function(error){
    console.log(error);
    $scope.msg = error;
  },{ maximumAge: 0, timeout: 15000, enableHighAccuracy: true });

})

.controller('SupplierDetailCtrl', function($scope, $stateParams, Suppliers) {
  console.log("SuppliersDetailCtrl");
  $scope.supplier = Suppliers.get($stateParams.supplierId);
})

.controller('SearchCtrl', function($scope){
  console.log("SearchCtrl");
  navigator.geolocation.getCurrentPosition(function(position){
    var map = new BMap.Map("allmap");            // 创建Map实例
    var geoc = new BMap.Geocoder(); 
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var gpsPoint = new BMap.Point(longitude, latitude); // 创建点坐标

    
    var translateCallback = function(point) {
      geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        $scope.address = addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        console.log($scope.address);
        $scope.$apply();
      }); 
    }

    BMap.Convertor.translate(gpsPoint,0,translateCallback);     //真实经纬度转成百度坐标

  }, function(error){
    console.log(error);
    $scope.msg = error;
  },{ maximumAge: 0, timeout: 15000, enableHighAccuracy: true });

  //$scope.address = 'ABC';

  $scope.options = [
    { label: 'one', text: '2015年03月22日 上午，周日', value: 1 },
    { label: 'one', text: '2015年03月22日 下午，周日', value: 2 },
    { label: 'two', text: '2015年03月23日 上午，周一', value: 3 },
    { label: 'two', text: '2015年03月23日 下午，周一', value: 4 },
    { label: 'two', text: '2015年03月24日 上午，周二', value: 5 },
    { label: 'one', text: '2015年03月24日 下午，周二', value: 6 }
  ];
})

.controller('OrdersCtrl', function($scope, Orders, $state) {
  if (true) {
    alert("login");
    $state.go('signin');
  }
  $scope.orders = Orders.all();
  console.log("OrdersCtrl");
  $scope.remove = function(order) {
    Suppliers.remove(order);
  }
})

.controller('MeCtrl', function($scope) {
  console.log("MeCtrl");
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AccountCtrl', function($scope, $state) {
  console.log("AccountCtrl");
  $scope.signOut = function() {
    console.log('Sign-In');
    $state.go('signin');
  };
});
