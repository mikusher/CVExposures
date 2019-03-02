
var productConatinerTable = document.getElementById("list-table-products");
var btnData = document.getElementById("btnGetVendor");
var dataVendorsIterator = Utils.getContainerStorage("Vendors");


function productInTable(json, classes) {
    var product = json.product;
    var vendor = json.vendor;

    var headerRow = '';
    var bodyRows = '';

    classes = classes || '';
    headerRow += '<th>' + "Vendor: "+json.vendor + '</th>';

    json.product.map(function(row) {
        bodyRows += '<tr>';
        bodyRows += '<td>' + row + '</td>';
        bodyRows += '</tr>';
    });

    return '<table class="' +
        classes +
        '"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';
}
btnData.addEventListener("click", function (params) {

    if(dataVendorsIterator !== null){
        for (const vendorName of dataVendorsIterator){
            $.getJSON('https://cve.circl.lu/api/browse/'+vendorName, function (obj) {
                const line = productInTable(obj, 'table');
                productConatinerTable.innerHTML += line;
            });
        }
    }
});