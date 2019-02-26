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


//local information

// variables
var btnCheckData = document.getElementById("btnCheckData");


//functions
btnCheckData.addEventListener("click", function (params) {
    
    Utils.getJSONData('https://cve.circl.lu/api/browse');
});
