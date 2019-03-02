let vulnerabilitiesFilter = document.getElementById("vulnerabilitiesFilter");
let inputVulnerabilitiesFilter = document.getElementById("inputVulnerabilitiesFilter");




//action to filter button
vulnerabilitiesFilter.addEventListener("click", function() {
    let value = $(inputVulnerabilitiesFilter).val().toLowerCase();

    $("table tr").filter(function(index) {
        if(index>0){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        }
    });
});