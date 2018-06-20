jQuery("document").ready(function () {
    $(document).on('submit', '#registration_form', function (e) {
		e.preventDefault();
		$("#loading").css('display', 'block');
		$("#recommend_error").css('display:none');
		$.ajax({
			type: 'POST',
			url: '/registration/',
			beforeSend: function () {
				$("#loading").css('display', 'block');
				$("#recommend_error").hide();
			},
			data: {
				username:$('#username').val(),
				password:$('#password').val(),
				email:$('#email').val(),
				gender:$('#username').val(),
				country:$('#country').val(),
				state:$('#state').val(),
				csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
			},
			success: function (data) {
							if(data.username_taken){
								alert('username is already taken')
							}else if (data.email_taken){
								alert('email already taken')
							}
							else {
								alert('saved successfully')
								window.location.href = /profile/
								
							}
						},
						error: function (xhr, errmsg) {
							$('#error').html("<div class='alert-box alert radius' data-alert> Opps! We have encountered and error: </div>");
						}
		});
	});

    
});