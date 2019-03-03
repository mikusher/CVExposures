$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
    let positionAlert = document.getElementById("alert-target");
    let allVendorsInPageVul = document.getElementById("allVendorsInPageVul");

    let btCheckProductContent = document.getElementById("btCheckProductContent");

    let inputSearchInTable = document.getElementById("inputSearchInTable");
    let btSearchInTable = document.getElementById("btSearchInTable");

    var vulnearbilitiesConatinerTable = document.getElementById("list-table-vulnerabilities");

    Utils.loadToContainer("allVendorsInPageVul", 'vd');


    allVendorsInPageVul.addEventListener("change", function () {
        var newVendorID = $(this).val();
        if (newVendorID !== '') {
            $.getJSON('https://cve.circl.lu/api/browse/'+newVendorID, function (obj) {
                Utils.loadToContainer("allProductInPageVul", 'pd', obj);
            });
        } else {
            $('#allVendors').html('<option value="">Select Vendor</option>');
            $('#allVendorProduct').html('<option value="">Select Product</option>');
        }
    });


    //action to filter button
    btSearchInTable.addEventListener("click", function () {
        let value = $(inputSearchInTable).val().toLowerCase();

        $("table tr").filter(function (index) {
            if (index > 0) {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        });
    });


    btCheckProductContent.addEventListener("click", function (params) {

        let selectComboVendors = document.getElementById("allVendorsInPageVul").value;
        let selectComboProduct = document.getElementById("allProductInPageVul").value;

        if (selectComboVendors === 'Select Vendor' || selectComboProduct === 'Select Product'){
            selectComboVendors = null;
            selectComboProduct = null;
        }

        if( selectComboVendors !== null && selectComboProduct !== null ){
            let urlResult = 'https://cve.circl.lu/api/search/'+selectComboVendors+'/'+selectComboProduct;
            $.getJSON(urlResult, function (obj) {
                for (const individualIndex of obj) {
                    //console.log(individualIndex);
                    let tr = document.createElement('tr');
                    tr.innerHTML = `
                                <td id='${individualIndex.id}'>${individualIndex.id}</td>
                                <td title='${individualIndex.summary}' data-toggle="tooltip" data-placement="top" style="text-overflow: ellipsis; max-width: 810px;">${individualIndex.summary}</td>
                                
                                `;

                    vulnearbilitiesConatinerTable.appendChild(tr);
                }
            });
        }else {
            positionAlert.style.display = (positionAlert.style.display === "none") ? "block" : "none";
        }
    });


});