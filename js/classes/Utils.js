// utils functions

function Utils () {}


Utils.date = function () {
    let date = new Date();
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
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


Utils.addEventsTr = function(tr, individualIndex, conformeToPopUp) {
    Utils.fetchData('https://cve.circl.lu/api/browse/'+individualIndex).then(function(result) {
        tr.querySelector(".btn-pop").addEventListener("click", e => {
            $("#pop-" + conformeToPopUp).popover({
                title: individualIndex,
                content: "Blabla"
            });
        });
    });
};


Utils.setContainerStorage = function (container, data) {
    sessionStorage.setItem(container, JSON.stringify(data));
};


Utils.getContainerStorage = function (container) {
    let containerResult = null;

    if(sessionStorage.getItem(container)){
        const items = sessionStorage.getItem(container);
        containerResult = JSON.parse(items);
    }

    return containerResult;
};