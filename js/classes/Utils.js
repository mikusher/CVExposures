class Utils {
    static getJSONData(url) {
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET",
            dataType: "json",
            data: {},
            success: function (result) {
                console.log(result);
            },
            error: function () {
                console.log("error");
            }
        });
    }
};