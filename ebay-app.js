/**
*  Module
*
* Description
*/
var app = angular.module('ebayApp', ['ui.bootstrap']);

app.controller('ebayController', function($scope, EbayApi){
  
  $scope.count = 3;
  $scope.keyword = "Garmin"

  $scope.sold = 'true';

  $scope.dropdown = [
      {name:'Sold only', value:'true'},
      {name:'All', value:'false'}
    ];
  $scope.drop = $scope.dropdown[0];

  $scope.soldsel = [{name:'Sold only', value: 'true'}, {name: "All", value: 'false'}];

  //$scope.par = {};

/*
// Submit the request 
$scope.submitebay = function (){
  s=document.createElement('script'); // create script element
  var url = "http://svcs.ebay.com/services/search/FindingService/v1?"
  url += "OPERATION-NAME=findCompletedItems&";
  url += "SERVICE-VERSION=1.7.0&";
  url += "SECURITY-APPNAME=Sebastia-24a0-4fe3-b7e1-b5317da87162&";
  url += "GLOBAL-ID=EBAY-DE&";
  url += "RESPONSE-DATA-FORMAT=JSON&";
  url += "REST-PAYLOAD&";
  url += "keywords="+$scope.keyword+"&";
  url += "itemFilter(0).name=SoldItemsOnly&";
  url += "itemFilter(0).value="+$scope.sold+"&";
  url += "itemFilter(1).name=sellingStatus.sellingState&";
  url += "itemFilter(1).value=EndedWithSales&";
  url += "sortOrder=EndTimeSoonest&";
  url += "paginationInput.entriesPerPage=100&";
  url += "paginationInput.pageNumber="+$scope.count;
  url += "&callback=_cb_findItemsByKeywords";
  s.src= url;
  document.body.appendChild(s);
};
*/

    $scope.search = function() {
        //alert("fast");
        EbayApi.searchCall($scope.searchParam);
    }


});

app.service('EbayApi', function(){
  this.searchCall = function(searchParam) {
    s=document.createElement('script'); // create script element
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?"
    url += "OPERATION-NAME=findCompletedItems&";
    url += "SERVICE-VERSION=1.7.0&";
    url += "SECURITY-APPNAME=Sebastia-24a0-4fe3-b7e1-b5317da87162&";
    url += "GLOBAL-ID=EBAY-DE&";
    url += "RESPONSE-DATA-FORMAT=JSON&";
    url += "REST-PAYLOAD&";
    url += "keywords="+searchParam.keywords+"&";
    //url += "itemFilter(0).name=SoldItemsOnly&";
    //url += "itemFilter(0).value=true&";
    //url += "itemFilter(1).name=sellingStatus.sellingState&";
    //url += "itemFilter(1).value=EndedWithSales&";
    url += "sortOrder=EndTimeSoonest&";
    url += "paginationInput.entriesPerPage=100&";
    url += "paginationInput.pageNumber=1";
    url += "&callback=_cb_findItemsByKeywords";
    s.src= url;
    document.body.appendChild(s);
  };
});

// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
  var items = root.findCompletedItemsResponse[0].searchResult[0].item || [];
  var html = [];
  html.push('Anzahl: '+root.findCompletedItemsResponse[0].searchResult[0]["@count"]);
  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryURL;
    var viewitem = item.viewItemURL;
    var price    = item.sellingStatus[0].currentPrice[0].__value__;
    var currency = item.sellingStatus[0].currentPrice[0]["@currencyId"];
    var freeshpg = item.shippingInfo[0].shippingType;
    var conditionid =  item.condition[0].conditionId;
    var condition = item.condition[0].conditionDisplayName;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' + 
      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td><td>' + price + ' '+ currency + '</td><td>'+freeshpg+'</td><td>'+conditionid+' '+condition+'</td></tr>');
    }
  }
  html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");
};  // End _cb_findItemsByKeywords() function


/*
// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
  {"name":"MaxPrice", 
   "value":"25", 
   "paramName":"Currency", 
   "paramValue":"USD"},
  {"name":"FreeShippingOnly", 
   "value":"true", 
   "paramName":"", 
   "paramValue":""},
  {"name":"ListingType", 
   "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"], 
   "paramName":"", 
   "paramValue":""},
  ];

//http:/svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME=Sebastia-24a0-4fe3-b7e1-b5317da87162&GLOBAL-ID=EBAY-DE&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=Garmin&sortOrder=PricePlusShippingLowest&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1&callback=_cb_findItemsByKeywords

var url3 = "http://svcs.ebay.com/services/search/FindingService/v1?"
url3 += "OPERATION-NAME=findCompletedItems&";
url3 += "SERVICE-VERSION=1.7.0&";
//url += "?OPERATION-NAME=findItemsByKeywords";
//url += "&SERVICE-VERSION=1.0.0";
url3 += "SECURITY-APPNAME=Sebastia-24a0-4fe3-b7e1-b5317da87162&";
url3 += "GLOBAL-ID=EBAY-DE&";
url3 += "RESPONSE-DATA-FORMAT=JSON&";
url3 += "REST-PAYLOAD&";
url3 += "keywords=navigon&";
url3 += "categoryId=156955&";
url3 += "itemFilter(0).name=Condition&";
url3 += "itemFilter(0).value=3000&";
url3 += "itemFilter(1).name=FreeShippingOnly&";
url3 += "itemFilter(1).value=true&";
url3 += "itemFilter(2).name=SoldItemsOnly&";
url3 += "itemFilter(2).value=true&";
url3 += "sortOrder=PricePlusShippingLowest&";
url3 += "paginationInput.entriesPerPage=5";
url3 += "&callback=_cb_findItemsByKeywords";
//url += urlfilter;


// Define global variable for the URL filter
var urlfilter = "";

// Generates an indexed URL snippet from the array of item filters
function  buildURLArray() {
  // Iterate through each filter in the array
  for(var i=0; i<filterarray.length; i++) {
    //Index each item filter in filterarray
    var itemfilter = filterarray[i];
    // Iterate through each parameter in each item filter
    for(var index in itemfilter) {
      // Check to see if the paramter has a value (some don't)
      if (itemfilter[index] !== "") {
        if (itemfilter[index] instanceof Array) {
          for(var r=0; r<itemfilter[index].length; r++) {
          var value = itemfilter[index][r];
          urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
          }
        } 
        else {
          urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
        }
      }
    }
  }
}  // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);
*/

// Construct the request
// Replace MyAppID with your Production AppID


//submitebay(url3);

// Display the request as a clickable link for testing
//document.write("<a href=\"" + url + "\">" + url + "</a>");
