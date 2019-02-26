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
let btnCheckData = document.getElementById("btnCheckData");
let vendorFilter = document.getElementById("goFilter");
let vendorInputFilter = document.getElementById("inputValue");
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
            const dataIterator = result.vendor;
            for (const individualIndex of dataIterator) {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                                <td>${individualIndex}</td>
                                <td>
                                  <button type="button" class="btn btn-primary btn-info btn-xs btn-flat">Info</button>
                                </td>
                               `;
                addEventsTr(tr);
                vendorTableList.appendChild(tr);
            }
        },
        error: () => {
            console.log("error");
        }
    });
}

//operations
//get all vendor
btnCheckData.addEventListener("click", function (params) {
    getJSONData('https://cve.circl.lu/api/browse');

});

//action to filter button
vendorFilter.addEventListener("click", function() {
    let value = $(vendorInputFilter).val().toLowerCase();

    $("table tr").filter(function(index) {
        if(index>0){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        }
    });
});

//test event to info Button
//todo: add modal white basic info / not remove line
function addEventsTr(tr) {

    tr.querySelector(".btn-info").addEventListener("click", e => {
        //TODO: change to modal
        if (confirm("Deseja realmente excluir?")) {
            tr.remove();
        }

    });

}

