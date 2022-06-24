var base_url = "http://localhost/kepegawaian-tvri";

function alert(placeholder, message, type, time = 0) {
    var wrapper = document.createElement("div");
    wrapper.innerHTML =
        '<div class="alert alert-sm alert-' +
        type +
        ' alert-dismissible" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

    placeholder.append(wrapper);

    $(".alert")
        .fadeTo(2000, 500)
        .slideUp(500, function () {
            $(".alert").slideUp(500);
            wrapper.innerHTML = "";
        });
}

function removeModalCallback() {
    $(this).remove()
}

function getErrorMessage(errorCode) {
    var msg;
    switch (errorCode) {
        case "23000":
            msg = "This email has been used by another employee!";
            break;
        default:
            msg = "Something went wrong when do this action."
    }
    return msg;
}