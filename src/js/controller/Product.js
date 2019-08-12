$(document).ready(function () {
    var productConatinerTable = document.getElementById("list-table-products");
    var btnData = document.getElementById("btnGetVendor");
    var dataVendorsIterator = Utils.getContainerStorage("Vendors");

    Utils.loadToContainer("allVendorsSelect", 'vd');

    function productInTable(json, classes) {

        var headerRow = '';
        var bodyRows = '';

        classes = classes || '';
        headerRow += '<th>'
            + "Vendor: " + json.vendor
            + "  -  "
            + "Number of Products: " + json.product.length
            + '</th>';

        json.product.map(function (row) {
            const rowClean = row.replace(/[^A-Z0-9]+/ig, "_");
            bodyRows += '<tr>';
            bodyRows +=
                '<td>'
                + `<i class="fa fa-cube" id="icon_${rowClean}" data-toggle="modal" data-target="modal_${rowClean}"></i></a> ${row}` +
                '</td>';
            bodyRows += '</tr>';
        });

        return '<table class="' +
            classes +
            '"><thead><tr>' +
            headerRow +
            '</tr></thead><tbody>' +
            bodyRows +
            '</tbody></table>';
    };

    function popUpConstract(row, rowClean, vendor) {
        document.getElementById(rowClean).addEventListener('click', function (evt) {
            evt.stopImmediatePropagation();

            console.log("Row: " + `<a href='https://cve.circl.lu/api/search/${vendor}/${row}`)
        })
    };

    btnData.addEventListener("click", function (params) {

        var selectComboVendors = document.getElementById("allVendorsSelect").value;

        if (dataVendorsIterator !== null) {
            Utils.fetchDataDoCORSRequest({url: 'https://cve.circl.lu/api/browse/' + selectComboVendors}, function jsonCorsResult(obj) {
                const line = productInTable(obj, 'table');
                productConatinerTable.innerHTML = line;

                obj.product.map(function (row) {
                    const rowClean = row.replace(/[^A-Z0-9]+/ig, "_");
                    popUpConstract(row, ("icon_" + `${rowClean}`), obj.vendor);
                });
            });
        }
    });


});