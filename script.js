
var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ngAnimate'
	, 'ui.grid.exporter','ui.grid.resizeColumns','ui.grid.selection','ui.grid.saveState', 'ui.grid.pagination'
	, 'ui.grid.moveColumns', 'ui.bootstrap', 'ui.grid.grouping', 'ui.grid.autoResize'])
	
app.controller('BaseController', function BaseController($scope, $rootScope, $http, $log, $location, $uibModal) {
  $rootScope.alerts = [];
	$rootScope.addAlert = function(msg, type, timeout) {
		if(!type){type = 'danger'}
		if(!timeout){timeout = '6000'};
		$rootScope.alerts.push({msg: msg, type: type, timeout:timeout});
	};
	
  $scope.input = {
    json:''
    , valid:true
  }
  
  $scope.data = []
  
  $scope.initGrid = function(){
	  $scope.columns = [{ field: 'field', name: 'Field', enableCellEdit:true}
	  ,{ field: 'type', name: 'Type', cellTemplate: '',editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownOptionsArray: [
         {
          id: 'string',
          type: 'string'
          },
           {
          id: 'boolean',
          type: 'boolean'
          },
           {
          id: 'number',
          type: 'number'
          },
           {
          id: 'date',
          type: 'date'
          }
        ],
	    editDropdownValueLabel: 'id'
	  }
	  ,{ field: 'read_only', name: 'Read Only', cellTemplate: '<input type="checkbox" ng-disabled="false" ng-model="row.entity.read_only" ng-true-value="1" ng-false-value="0">'}
		,{ field: 'caption', name: 'Caption', cellTemplate: '', enableCellEdit:true}
		,{ field: 'value', name: 'Value', cellTemplate: '', enableCellEdit:true}
		,{ field: 'seq', name: 'Sequence', cellTemplate: '', enableCellEdit:true, type:'number'}
		,{ field: 'visible', name: 'Visible', cellTemplate: '<input type="checkbox" ng-disabled="false" ng-model="row.entity.visible" ng-true-value="1" ng-false-value="0">', enableCellEdit:true}];
	  $scope.gridOptions = {
  		showGridFooter: true,
  		showColumnFooter: false,
  		enableSorting: true,
  		columnDefs: $scope.columns,
  		enableGridMenu: true,
  		enableRowSelection: true,
  		multiSelect: true,
  		enableSelectAll: true,
  		enableHorizontalScrollbar: 2,
  		enableVerticalScrollbar: 2,
  		enableFiltering: true,
  		enableColumnResizing: true,
  		onRegisterApi: function(gridApi){
  			$scope.gridApi = gridApi;
  			gridApi.selection.on.rowSelectionChanged($scope, function(row){ 
  			});
  			gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
             console.log(colDef)
             //if(colDef.field == "type"){
               
            // }
        });
  		}
	  };
		$scope.gridOptions.data = $scope.data // set grid data
  }
  
  $scope.initGrid()
  
  $scope.resequence = function(){
    var rows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid); 
    var i = 0
    for (var row in rows){
      rows[row].entity.seq = i
      i += 1
    }
  }
  
	$scope.addRow = function(){
	  var rows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid); 
	  var len = rows.length
		$scope.data.push( { field: 'new_field', caption: 'New Field', type: 'string', read_only:0, visible:0, value:'', seq:len });
		$scope.gridOptions.data = $scope.data
		//$scope.resequence()
	}
	
	// delete selected rows
	$scope.deleteRows = function(){
	  var selectedRows = $scope.gridApi.selection.getSelectedRows();
		for (var row in selectedRows){
		  var entity = selectedRows[row]
      $scope.data.splice($scope.data.indexOf(entity), 1);
     }
	}
	
	// validate JSON
  $scope.validateJSON = function(){
		try{
			JSON.parse($scope.input.json)
			$scope.input.valid = "true"
			//$scope.updateGrid() // we could update grid automatically, or button
		}catch(ex){
			$scope.input.valid = ""
			$scope.addAlert('Invalid JSON : ' + ex)
		}
	}
	
	// update JSON with grid row data
	$scope.updateJSON = function(){
	 $scope.input.json = ''
	 var rows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid); 
	 var len = rows.length, i = 0
	 for(var row in rows){
	   delete rows[row].entity.$$hashKey // remove uneeded grid data
	   if(i == 0){
	     $scope.input.json += "["
	   }
	   i+= 1
	   $scope.input.json += JSON.stringify(rows[row].entity) // to add keys rows[row].entity.field + ":" 
	   if(i != len && i != 0){
	     $scope.input.json += ","
	   }else if(i == len){
	     $scope.input.json += "]"
	     $scop.validateJSON();
	   }
	 }
	}
	
	// update grid with JSON 
	$scope.updateGrid = function(){
	 $scope.data = []
	  var data = JSON.parse($scope.input.json)
	  var len = data.length, i = 0
	  for(var row in data){
	    $scope.data.push(data[row])
	    i += 1
	    if(i == len){
	      console.log($scope.data)
	      $scope.gridOptions.data = $scope.data
	    }
	 }
	}
	
})
