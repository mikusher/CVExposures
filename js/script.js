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
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': true
        },
        type: "GET",
        dataType: "json",
        data: {},
        success: (result) => {
            const dataIterator = result.vendor;
            for (const individualIndex of dataIterator) {
                let tr = document.createElement('tr');
                let conformeToPopUp = individualIndex.replace(/[^a-zA-Z0-9]/g, '');
                tr.innerHTML = `
                                <td>${individualIndex}</td>
                                <td>
                                  <button type="button" id="modal-${conformeToPopUp}" class="btn btn-primary btn-modal btn-xs btn-flat">Products</button>
                                </td>
                                <td>
                                  <a href="#" type="button" id="pop-${conformeToPopUp}" class="btn btn-primary btn-pop btn-xs" data-placement="left" data-toggle="popover">Info</a>
                                </td>
                               `;
                addEventsTr(tr, individualIndex, conformeToPopUp);
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
    getJSONData('https://cve.circl.lu/api/browse/');
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
//todo: check this and try convert to modal
function addEventsTr(tr, individualIndex, conformeToPopUp) {
    let url = 'https://cve.circl.lu/api/browse/'+individualIndex;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        tr.querySelector(".btn-modal").addEventListener("click", e => {
            $("#modal-"+conformeToPopUp).popover({
                html : true,
                title: individualIndex,
                content: data.product.toString()
            });
        });

        tr.querySelector(".btn-pop").addEventListener("click", e => {
                $("#pop-"+conformeToPopUp).popover({
                    title: individualIndex,
                    content: "Blabla"
                });
        });



    });
}

