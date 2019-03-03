$(document).ready(function () {

    let inputVulnerabilitiesFilter = document.getElementById("inputVulnerabilitiesFilter");
    let vulnerabilitiesFilter = document.getElementById("vulnerabilitiesFilter");
    let allVendorsCT = document.getElementById("allVendors");

    Utils.loadToContainer("allVendors", 'vd');


    allVendorsCT.addEventListener("change", function () {
        var newVendorID = $(this).val();
        if (newVendorID !== '') {
            $.getJSON('https://cve.circl.lu/api/browse/'+newVendorID, function (obj) {
                Utils.loadToContainer("allVendorProduct", 'pd', obj);
            });
        } else {
            $('#allVendors').html('<option value="">Select Vendor</option>');
            $('#allVendorProduct').html('<option value="">Select Product</option>');
        }
    });


    //action to filter button
    vulnerabilitiesFilter.addEventListener("click", function () {
        let value = $(inputVulnerabilitiesFilter).val().toLowerCase();

        $("table tr").filter(function (index) {
            if (index > 0) {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });


});