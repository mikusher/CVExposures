
var productConatinerTable = document.getElementById("list-table-products");
var btn50Data = document.getElementById("btnGet50Vendor");
var dataVendorsIterator = Utils.getContainerStorage("Vendors");


btn50Data.addEventListener("click", function (params) {

    if(dataVendorsIterator !== null && dataVendorsIterator.length >= 50){
        for (let i = 0; dataVendorsIterator.length >= 49; i++){
            Utils.fetchData('https://cve.circl.lu/api/browse/'+dataVendorsIterator[i]).then(function(result) {
                console.log(result)
            });
        }
    }
});
