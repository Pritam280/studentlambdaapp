
var API_ENDPOINT = "https://yenb2o1qk6.execute-api.us-east-1.amazonaws.com/studentapp";

// Save student
document.getElementById("savestudent").onclick = function (event) {
    event.preventDefault();

    var inputData = {
        studentid: $("#studentid").val(),
        name: $("#name").val(),
        class: $("#class").val(),
        age: $("#age").val()
    };

    console.log("Sending student data:", inputData);

    $.ajax({
        url: API_ENDPOINT,
        type: "POST",
        data: JSON.stringify(inputData),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log("POST success:", response);
            document.getElementById("studentSaved").innerHTML =
                "Student Data Saved!";
        },
        error: function (xhr, status, error) {
            console.error("POST failed:", xhr.status, xhr.responseText, error);
            alert("Save failed. HTTP status: " + xhr.status +
                  ". Check the browser console.");
        }
    });
};

// Retrieve students
document.getElementById("getstudents").onclick = function (event) {
    event.preventDefault();

    $.ajax({
        url: API_ENDPOINT,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log("GET success:", response);

            $("#studentTable tr").slice(1).remove();

            $.each(response, function (i, data) {
                $("#studentTable").append(
                    "<tr>" +
                    "<td>" + data.studentid + "</td>" +
                    "<td>" + data.name + "</td>" +
                    "<td>" + data.class + "</td>" +
                    "<td>" + data.age + "</td>" +
                    "</tr>"
                );
            });
        },
        error: function (xhr, status, error) {
            console.error("GET failed:", xhr.status, xhr.responseText, error);
            alert("Retrieval failed. HTTP status: " + xhr.status);
        }
    });
};
