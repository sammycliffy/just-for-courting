
jQuery('document').ready(function () {
		<!-- Real-time Validation -->
		<!--Name can't be blank-->
		$('#username').on('input', function() {
			var input=$(this);
			var is_name=input.val();
			if(is_name.length>6 ){
				input.removeClass("invalid").addClass("valid");
				$('#username_error').removeClass('error_show').addClass('error');
			}
			else{input.removeClass("valid").addClass("invalid");
			$('#username_error').removeClass('error').addClass('error_show');
		}
		});


		//Password must have 8 characters and at least one number
		$('#password').on('input', function() {
			var input=$(this);
			var is_name=input.val();
			var number = /[0-9]/g;
			//var uppercase = /[A-Z]/g; 
			//var lowercase = /[a-z]/g; 
			if(is_name.length>8 && is_name.match(number)){
				input.removeClass("invalid").addClass("valid");
				$('#password_error').removeClass('error_show').addClass('error');
			}
			else{
				input.removeClass("valid").addClass("invalid");
				$('#password_error').removeClass('error').addClass('error_show');
		}
		});
		
		// check if radio button is checked 
		$("input[type=radio]").click(function () {
			if($(this).prop("checked")) { 
				$(this).removeClass("invalid").addClass("valid");}
			else{
				$(this).removeClass("valid").addClass("invalid");
			}
			 
		});

		//Check if country is selected
		$('#country').on('input', function(){
			var input = $(this);
			var is_name = input.val();
			if(is_name != -1){
				input.removeClass('invalid').addClass('valid');
				
			}else{
				input.removeClass('valid').addClass('invalid');
				
			}
		});

		//Check if state is selected
		$('#state').on('input',function(){
				var input = $(this);
				var is_name = input.val();
				if(is_name != ''){
					input.removeClass('invalid').addClass('valid');
				}else{
					input.removeClass('valid').addClass('invalid');
				}
		});


		<!--Email must be an email -->
		$('#email').on('input', function() {
			var input=$(this);
			var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			var is_email=re.test(input.val());
			if(is_email){
				input.removeClass("invalid").addClass("valid");
				$('#email_error').removeClass('error_show').addClass('error');
		
			}
			else{
				input.removeClass("valid").addClass("invalid");
				$('#email_error').removeClass('error').addClass('error_show');
			
			}
		});

		<!--Website must be a website -->
		$('#contact_website').on('input', function() {
			var input=$(this);
			if (input.val().substring(0,4)=='www.'){input.val('http://www.'+input.val().substring(4));}
			var re = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
			var is_url=re.test(input.val());
			if(is_url){input.removeClass("invalid").addClass("valid");}
			else{input.removeClass("valid").addClass("invalid");}
		});
		
		<!--Message can't be blank -->
		$('#contact_message').keyup(function(event) {
			var input=$(this);
			var message=$(this).val();
			console.log(message);
			if(message){input.removeClass("invalid").addClass("valid");}
			else{input.removeClass("valid").addClass("invalid");}	
		});

	// After Form Submitted Validation
	$("#registration_submit button").click(function(event){
		event.preventDefault();
				$('input').each(function() {
					if($(this).hasClass('invalid')){
						alert('Some fields are invalid');
					   return false;
					}else{
					$.ajax({
						type: 'POST',
						url: '/registration/',
						enctype: "multipart/form-data",
						  data: {
									   username: $('#username').val(),
									   password: $('#password').val(),
									   gender: $("input[name='gender']:checked").val(),
									   age: $('#age').val(),
									   email:$('#email').val(),
									   country: $('#country').val(),
									   state: $('#state').val(),
									   csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
						},
			
						success: function (error) {
							var username_error = $('#username_error');
							var email_error = $('#email_error');
							var password_error = $('#password_error');
							var country_error = $('#country_error');
							var state_error = $('#state_error');
							var gender = $("input[name='gender']:checked").val();
							if (error.empty_username) {
								username_error.text(error.error_message).removeClass('error').addClass('error_show');
							}
							if (error.username_taken) {
								$('#username_error').text(error.error_message).removeClass('error').addClass('error_show');
							}
							else if(error.empty_password){
								password_error.text(error.error_message).removeClass('error').addClass('error_show');
								username_error.removeClass('error_show').addClass('error');
							}
							else if(error.email_taken){
								email_error.text(error.error_message).removeClass('error').addClass('error_show');
								username_error.removeClass('error_show').addClass('error');
								password_error.removeClass('error_show').addClass('error');
							}
							else if(error.empty_country){
								country_error.text(error.error_message).removeClass('error').addClass('error_show');
								username_error.removeClass('error_show').addClass('error');
								password_error.removeClass('error_show').addClass('error');
								email_error.removeClass('error_show').addClass('error');
								
							}
							else if(error.empty_state){
								state_error.text(error.error_message).removeClass('error').addClass('error_show');
							}
							else {
			
								window.location.href = /profile/
								
							}
						},
						error: function (xhr, errmsg) {
							$('#error').html("<div class='alert-box alert radius' data-alert> Opps! We have encountered and error: </div>");
						}
					});
	
					}
				});
		
			});
});