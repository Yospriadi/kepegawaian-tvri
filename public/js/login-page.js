$(function () {
    var alertPlaceholder = $('.flasher');

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "http://localhost/kepegawaian-tvri/login/login",
            data: { "email": $('input[type=email]').val(), "password": $('input[type=password]').val() },
            dataType: "json",
            success: function (response) {
                if (!response.ok)
                    alert(alertPlaceholder, response.error_message, 'danger');
                if (response.ok) {
                    alert(alertPlaceholder, response.message, 'success');
                    location.href = response.redirect;
                }
            }
        });
    });
});