/*Menu-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

function showcontent(tag) {
    $('.content').hide(); // hides all content divs
    var test =  tag.hash;
    $(test).show();
}
    
function onload() {
    $('.content').hide(); // hides all content divs
    $("#legislators").show();
}

$(".sidebar-nav nav a").on('click',function(e) {
   e.preventDefault(); // stops link form loading
   $('.content').hide(); // hides all content divs
   $('#' + $(this).attr('href') ).show(); //get the href and use it find which div to show
});

var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);

app.controller('myCtrl', function($scope, $http, $sce) {
//  localStorage.setItem("favouriteLegislators","[]");
//  localStorage.setItem("favouriteBills","[]");
//  localStorage.setItem("favouriteCommittees","[]");
    
    $scope.myWelcome3 = JSON.parse(localStorage.getItem("favouriteLegislators"));
    $scope.myWelcome4 = JSON.parse(localStorage.getItem("favouriteBills"));
    $scope.myWelcome5 = JSON.parse(localStorage.getItem("favouriteCommittees"));

    $http({
        method : "GET",
        url : 'congress_responsive.php',
        params: {
            database:'legislators'
        }
    }).success(function (data) {
        $scope.myWelcome = data.results;
        $scope.choicedata = data.results;
    });

    $http({
        method : "GET",
        url : 'congress_responsive.php',
        params: {
            database:'bills', activestatus: "true"
        }
    }).success(function (data) {
        $scope.myWelcome1 = data.results;
    });

    $http({
        method : "GET",
        url : 'congress_responsive.php',
        params: {
            database:'bills', activestatus: "false"
        }
    }).success(function (data) {
        $scope.myWelcome11 = data.results;
    });

    $http({
        method : "GET",
        url : 'congress_responsive.php',
        params: {
            database:'committees'
        }
    }).success(function (data) {
        $scope.myWelcome2 = data.results;
    });

    $scope.getFunction = function(s) {
        $scope.somename = s;

        $http({
            method : "GET",
            url : 'congress_responsive.php',
            params: {
                database:'legislators1', bioguide_id: s.bioguide_id
            }
        }).success(function (data) {
            $scope.myWelcome6 = data.results;
        });

        $http({
            method : "GET",
            url : 'congress_responsive.php',
            params: {
                database:'legislators2', bioguide_id: s.bioguide_id
            }
        }).success(function (data) {
            $scope.myWelcome7 = data.results;
        });

        $scope.getBar = convertDate(s.term_start, s.term_end);

        $scope.colorString = updateStarColor(s);
    };

    $scope.getFunction2 = function(s) {
        $scope.somename2 = s;
        $scope.buildpdf = $sce.trustAsResourceUrl(s.last_version.urls.pdf);
        $scope.colorString2 = updateStarColor2(s);
    }

    $scope.addFavourite = function(s) {
        console.log(s);
        if(!localStorage.getItem("favouriteLegislators"))
            localStorage.setItem("favouriteLegislators","[]");

        var list = localStorage.getItem("favouriteLegislators");
        var jlist = JSON.parse(list);

        for(i = 0; i < jlist.length; i++) {
            if(jlist[i].bioguide_id == s.bioguide_id) {
                $scope.deleteFavourite(s);
                $scope.colorString = updateStarColor(s);
                return;
            }
        }
        jlist.push(s);
        localStorage.setItem("favouriteLegislators", JSON.stringify(jlist));
        $scope.myWelcome3 = JSON.parse(localStorage.getItem("favouriteLegislators"));

        $scope.colorString = updateStarColor(s);
    };

    $scope.deleteFavourite = function(s) {
        var index = -1;

        for(i = 0; i < $scope.myWelcome3.length; i++) {
            if(s.bioguide_id == $scope.myWelcome3[i].bioguide_id) {
                index = i;
                break;
            }
        }
        if(index >= 0) {
            $scope.myWelcome3.splice(index, 1);
            localStorage.setItem("favouriteLegislators", JSON.stringify($scope.myWelcome3));
        }
    };      

    $scope.addFavourite2 = function(s) {
        console.log(s);
        if(!localStorage.getItem("favouriteBills"))
            localStorage.setItem("favouriteBills","[]");
        var list = localStorage.getItem("favouriteBills");
        var jlist = JSON.parse(list);

        for(i = 0; i < jlist.length; i++) {
            if(jlist[i].bill_id == s.bill_id) {
                $scope.deleteFavourite2(s);
                $scope.colorString2 = updateStarColor2(s);
                return;
            }
        }
        jlist.push(s);
        localStorage.setItem("favouriteBills", JSON.stringify(jlist));
        $scope.myWelcome4 = JSON.parse(localStorage.getItem("favouriteBills"));

        $scope.colorString2 = updateStarColor2(s);
    };
    
    $scope.setStar = function(s) {

        var list = localStorage.getItem("favouriteCommittees");
        var jlist = JSON.parse(list);
        var index = -1;
        var inarray = false;
        var returnVal = "";

        if(jlist == null)
            jlist=[];

        for(i = 0; i < jlist.length; i++) {
            if(!inarray) {
                index++;
                if(jlist[i].committee_id == s.committee_id) {
                    returnVal = "fa fa-star fa-lg starYellow";
                    inarray = true;
                } else {
                    returnVal = "fa fa-star fa-lg starWhite";
                }
            } else {
                break;
            }
        }

        if(returnVal == '') {
          returnVal = "fa fa-star fa-lg starWhite";
        }
        return returnVal;
    };
    
    $scope.deleteFavourite2 = function(s) {
        var index = -1;

        for(i = 0; i < $scope.myWelcome4.length; i++) {
            if(s.bill_id == $scope.myWelcome4[i].bill_id) {
                index = i;
                break;
            }
        }
        if(index >= 0) {
            $scope.myWelcome4.splice(index, 1);
            localStorage.setItem("favouriteBills", JSON.stringify($scope.myWelcome4));
        }
    };  

    $scope.addFavourite3 = function(s) {
        console.log(s);
        if(!localStorage.getItem("favouriteCommittees"))
            localStorage.setItem("favouriteCommittees","[]");
        var list = localStorage.getItem("favouriteCommittees");
        var jlist = JSON.parse(list);

        for(i = 0; i < jlist.length; i++) {
            if(jlist[i].committee_id == s.committee_id) {
                $scope.deleteFavourite3(s);
                $scope.colorString3 = updateStarColor3(s);
                return;
            }
        }

        jlist.push(s);
        localStorage.setItem("favouriteCommittees", JSON.stringify(jlist));
        $scope.myWelcome5 = JSON.parse(localStorage.getItem("favouriteCommittees"));
    };

    $scope.deleteFavourite3 = function(s) {
        var index = -1;

        for(i = 0; i < $scope.myWelcome5.length; i++) {
            if(s.committee_id == $scope.myWelcome5[i].committee_id) {
                index = i;
                break;
            }
        }
        if(index >= 0) {
            $scope.myWelcome5.splice(index, 1);
            localStorage.setItem("favouriteCommittees", JSON.stringify($scope.myWelcome5));
        }
    };  
  
    $scope.makeselect = function(id) {
      
    }
});

function updateStarColor(s) {
    var list = localStorage.getItem("favouriteLegislators");
    var jlist = JSON.parse(list);
    var index = -1;
    var inarray = false;
    var returnVal = "";
    
    if(jlist == null)
        jlist=[];
    
    for(i = 0; i < jlist.length; i++) {
        if(!inarray) {
            index++;
            if(jlist[i].bioguide_id == s.bioguide_id) {
                returnVal = "fa fa-star fa-lg starYellow";
                inarray = true;
            } else {
                returnVal = "fa fa-star fa-lg starWhite";
            }
        } else {
            break;
        }
    }
    
    if(returnVal == '') {
      returnVal = "fa fa-star fa-lg starWhite";
    }
    return returnVal;
}

function updateStarColor2(s) {
    var list = localStorage.getItem("favouriteBills");
    var jlist = JSON.parse(list);
    var index = -1;
    var inarray = false;
    var returnVal = "";
    
    if(jlist == null)
        jlist=[];
    
    for(i = 0; i < jlist.length; i++) {
        if(!inarray) {
            index++;
            if(jlist[i].bill_id == s.bill_id) {
                returnVal = "fa fa-star fa-lg starYellow";
                inarray = true;
            } else {
                returnVal = "fa fa-star fa-lg starWhite";
            }
        } else {
            break;
        }
    }
    
    if(returnVal == '') {
      returnVal = "fa fa-star fa-lg starWhite";
    }
    return returnVal;
}

function updateStarColor3(s) {
    var list = localStorage.getItem("favouriteCommittees");
    var jlist = JSON.parse(list);
    var index = -1;
    var inarray = false;
    var returnVal = "";
    
    if(jlist == null)
        jlist=[];
    
    for(i = 0; i < jlist.length; i++) {
        if(!inarray) {
            index++;
            if(jlist[i].committee_id == s.committee_id) {
                returnVal = "fa fa-star fa-lg starYellow";
            } else {
                returnVal = "fa fa-star fa-lg starWhite";
            }
        } else {
            break;
        }
    }
    
    if(returnVal == '') {
      returnVal = "fa fa-star fa-lg starWhite";
    }
    return returnVal;
}

function convertDate(s1, s2) {
    var v1 = new Date(s1);
    var v2 = new Date(s2);
    
    var v3 = new Date();
    
    return Math.round((v3-v1)/(v2-v1)*100);
}