<?php
    $api_url = "http://congress.api.sunlightfoundation.com/";
    $apikey = "apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    $url = "";

    if($_GET['database'] == "legislators") {
        $url = "http://congress.api.sunlightfoundation.com/".$_GET['database']."?"."per_page=all&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    }
    if($_GET['database'] == "bills") {
        $url = "http://congress.api.sunlightfoundation.com/".$_GET['database']."?"."per_page=50&history.active=".$_GET['activestatus']."&apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    }
    if($_GET['database'] == "committees") {
        $url = "http://congress.api.sunlightfoundation.com/".$_GET['database']."?"."per_page=all&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    }
    if($_GET['database'] == "legislators1") {
        $url = "http://congress.api.sunlightfoundation.com/bills"."?"."per_page=all&sponsor_id={$_GET['bioguide_id']}&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    }
    if($_GET['database'] == "legislators2") {
        $url = "http://congress.api.sunlightfoundation.com/committees"."?"."per_page=all&member_ids={$_GET['bioguide_id']}&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
    }

//    if($_GET['database'] == "legislators") {
//        $url = "http://104.198.0.197:8080/".$_GET['database']."?"."per_page=all&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//    }
//    if($_GET['database'] == "bills") {
//        $url = "http://104.198.0.197:8080/".$_GET['database']."?"."per_page=50&history.active=".$_GET['activestatus']."&last_version.urls.pdf__exists=true"."&apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//    }
//    if($_GET['database'] == "committees") {
//        $url = "http://104.198.0.197:8080/".$_GET['database']."?"."per_page=all&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//    }
//    if($_GET['database'] == "legislators1") {
//        $url = "http://104.198.0.197:8080/bills"."?"."per_page=all&sponsor_id={$_GET['bioguide_id']}&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//    }
//    if($_GET['database'] == "legislators2") {
//        $url = "http://104.198.0.197:8080/committees"."?"."per_page=all&member_ids={$_GET['bioguide_id']}&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//    }

    $json = file_get_contents($url);
    
//    if($_GET['legislator'] == "legislator" && $_GET['bioguide_id'] != null) {
//        $array = array();
//        
//        foreach( $s as $_GET[bioguide_id]) {
//            $url = "http://congress.api.sunlightfoundation.com/legislators?bioguide_id=".$s."per_page=all&"."apikey=da7ece2a720a4ac6b432ee4cddeacc72";
//            $json = file_get_contents($url);
//            $obj = json_decode($json);
//            array_push($array, $obj->{'results'}[0]);
//        }
//        
//        echo json_encode($array);
//    }

    echo $json;    
?>