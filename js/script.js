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


// variables
var allVendorArray = [];
let btnCheckData = document.getElementById("btnCheckData");
var vendorTableList = document.getElementById("list-table-vendor");



//functions
function getJSONData(url) {
    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        data: {},
        success: (result) => {
            for (let index = 0; index < result.vendor.length; index++) {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                                <td>${result.vendor[index]}</td>
                                <td>
                                  <button type="button" class="btn btn-primary btn-info btn-xs btn-flat">Info</button>
                                </td>
                               `;
                vendorTableList.appendChild(tr);
            }
        },
        error: () => {
            console.log("error");
        }
    });
}

//operations
btnCheckData.addEventListener("click", function (params) {
    getJSONData('https://cve.circl.lu/api/browse');

});
