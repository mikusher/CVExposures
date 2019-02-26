//local information
window.onload = function () {

    // variables
    var btnCheckData = document.getElementById("btnCheckData");



    //functions 
    btnCheckData.addEventListener("click", function (params) {
        get_ajax_data();
    });

    function get_ajax_data() {

        cveJson = $.ajax({
            type: "GET",
            url: "https://cve.circl.lu/api/cve/CVE-2010-3333",
            dataType: "json",
            cache: false,
            success: function (cveDataResult) {
                console.log(cveDataResult);
            },
            error: function (xhr) {
                alert(xhr.statusText);
            }
        });

    } 

};