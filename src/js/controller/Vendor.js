/**
 * Browse vendor and product
 - To get a JSON with all the vendors: curl https://cve.circl.lu/api/browse

 - To get a JSON with all the products associated to a vendor: curl https://cve.circl.lu/api/browse/microsoft

 Browse CVEs per vendor/product
 - To get a JSON with all the vulnerabilities per vendor and a specific product: curl https://cve.circl.lu/api/search/microsoft/office

 Get CVE per CVE-ID
 - To get a JSON of a specific CVE ID: curl https://cve.circl.lu/api/cve/CVE-2010-3333

 Get the last updated CVEs
 - To get a JSON of the last 30 CVEs including CAPEC, CWE and CPE expansions: curl https://cve.circl.lu/api/last
 */

$(document).ready(function () {

// variables
    var btnCheckData = document.getElementById("btnCheckAllVendor");
    var vendorTableList = document.getElementById("list-table-vendor");


//operations
//get all vendor
    btnCheckData.addEventListener("click", function (params) {
        params.preventDefault();
        let dataIterator = Utils.getContainerStorage("Vendors");

        if (dataIterator === null) {
            Utils.fetchDataDoCORSRequest({url: 'https://cve.circl.lu/api/browse/'}, function jsonCorsResult(result) {
                const dataIterator = result.vendor;
                for (const individualIndex of dataIterator) {
                    let tr = document.createElement('tr');
                    tr.innerHTML = `
                                <td>
                                <a href='https://cve.circl.lu/browse/${individualIndex}' target="_blank"><i class="fa fa-newspaper-o" id="icon_${individualIndex}"></i></a>
                                ${individualIndex}
                                </td>
                                <!-- Small modal -->
                               `;
                    vendorTableList.appendChild(tr);
                }
                Utils.setContainerStorage("Vendors", dataIterator);
            });
        } else {
            for (const individualIndex of dataIterator) {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                                <td>
                                <a href='https://cve.circl.lu/browse/${individualIndex}' target="_blank"><i class="fa fa-newspaper-o" id="icon_${individualIndex}"></i></a>
                                ${individualIndex}
                                </td>
                               `;
                vendorTableList.appendChild(tr);
            }
        }
    });

});
