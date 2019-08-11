// utils functions

function Utils() {
}


Utils.date = function () {
    let date = new Date();
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
};


Utils.fetchData = async function (url) {
    let dataResult = null;
    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        dataResult = data;
    });
    return dataResult;
};


Utils.fetchDataDoCORSRequest = function (options, jsonCorsResult) {
    const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    var x = new XMLHttpRequest();
    x.open('GET', cors_api_url + options.url);
    x.onload = x.onerror = function () {
        jsonCorsResult(
            JSON.parse(x.responseText)
        );
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
};


Utils.fetchDataController = function (url) {
    let dataResult = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    dataResult = data;
                });
            }
        }
    };
    xhr.send(null);
    return dataResult;
};


Utils.addEventsTr = function (tr, individualIndex, conformeToPopUp) {
    Utils.fetchData('https://cve.circl.lu/api/browse/' + individualIndex).then(function (result) {
        tr.querySelector(".btn-pop").addEventListener("click", e => {
            $("#pop-" + conformeToPopUp).popover({
                title: individualIndex,
                content: "nothing to do"
            });
        });
    });
};


Utils.setContainerStorage = function (container, data) {
    sessionStorage.setItem(container, JSON.stringify(data));
};


Utils.getContainerStorage = function (container) {
    let containerResult = null;

    if (sessionStorage.getItem(container)) {
        const items = sessionStorage.getItem(container);
        containerResult = JSON.parse(items);
    }

    return containerResult;
};


Utils.loadToContainer = function (containerId, category, newId) {
    var htmlCode = '';
    var dataProduct = [];
    var dataVendorsIterator = Utils.getContainerStorage("Vendors");
    if (newId !== undefined) {
        dataProduct = newId.product;
    }

    if (dataVendorsIterator !== null) {
        if (category !== undefined && category === 'vd') {
            htmlCode += '<option value="">Select Vendor</option>';
            $.each(dataVendorsIterator, function (key, value) {
                htmlCode += '<option value="' + value + '">' + value + '</option>';
            });
        } else if (category !== undefined && category === 'pd') {
            htmlCode += '<option value="">Select Product</option>';
            $.each(dataProduct, function (key, value) {
                htmlCode += '<option value="' + value + '">' + value + '</option>';
            });
        } else {
            htmlCode += '<option value="">Select Content</option>';
        }

        $('#' + containerId).html(htmlCode);
    }
};


var getXHR = function () {
    try {
        return new XMLHttpRequest();
    } catch (e) {
    }
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {
    }
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {
    }
    try {
        return new ActiveXObject("Microsoft.XMLHttp");
    } catch (e) {
    }
    console.err("Could not find XMLHttpRequest");
};


var makeRequest = function (uri, data) {
    //make the actual XMLHttpRequest
    var xhr = getXHR();
    if ('withCredentials' in xhr) {
        console.log("Using XMLHttpRequest2 to make AJAX requests");
    }
    xhr.open("POST", uri, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "ok") {
                    console.log("You just posted some valid geoJSON");
                } else if (response.status === "error") {
                    console.log("There was a problem with your geoJSON " + response.message);
                } else {
                    console.log("Response has been recieved using " + response.status);
                }
            }
        } else {
            console.log("Response recieved with status " + xhr.status);
        }
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    //supported in new browsers...do JSONP based stuff in older browsers...figure out how
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(JSON.stringify(data));
};