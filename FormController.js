'use strict';
app.controller('FormController', function FormController($scope, $rootScope, $http, $log, $location, $templateCache, $controller, $uibModalInstance, schema) {
  $scope.data = [];
  $scope.columns = [];
  $scope.form_data = [];
  //----//
  //-- FUNCTIONS --//
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.finish = function(rows) {
    rows = $scope.gridApi.selection.getSelectedRows();
    $uibModalInstance.close(rows); // close lookup and pass back selected row detail
  };
  $scope.loadData = function() {
    $scope.gridOptions.data = $scope.data
  }
  $scope.init = function() {
    $scope.schema = JSON.parse(schema);
    var i = 0,
      len = $scope.schema.length
    for (var row in $scope.schema) { // add grid cols, and form controls from schema
      $scope.form_data.push($scope.schema[row])
      $scope.columns.push({
        field: $scope.schema[row].field,
        enableSorting: true,
        displayName: $scope.schema[row].caption,
        enableCellEdit: $scope.schema[row].read_only,
        visible: $scope.schema[row].visible
      });
      i += 1
      if (i == len) {
        $scope.initGrid()
        $scope.loadData();
      }
    }
  }
  $scope.initGrid = function() {
    $scope.gridOptions = {
      paginationPageSizes: [25, 50, 100, 250],
      paginationPageSize: 100,
      showGridFooter: true,
      showColumnFooter: false,
      enableSorting: true,
      columnDefs: $scope.columns,
      enableGridMenu: true,
      enableRowSelection: false,
      multiSelect: false,
      enableSelectAll: false,
      enableHorizontalScrollbar: 2,
      enableVerticalScrollbar: 2,
      enableFiltering: true,
      enableColumnResizing: true,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {});
      }
    };
  }

  $scope.enter = function() {
    var len = $scope.form_data.length,
      i = 0,
      row = {},
      field = '',
      col = ''
    for (var input in $scope.form_data) { // iterate controls and build row.
      col = $scope.form_data[input]
      field = col.field
      row[field] = col.value
      i += 1
      if (i == len) { // push row
        $scope.data.push(row)
      }
    }
  }

  $scope.init();
});