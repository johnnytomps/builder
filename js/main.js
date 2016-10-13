$(".login-form").validate({
	rules: {
		login: {
			required: true,
			email: true,
			minlength: 5
		},
		password: {
			required: true,
			minlength: 5
		}
	},
	//For custom messages
	messages: {
		uname: {
			required: "Enter a username",
			minlength: "Enter at least 5 characters"
		},
		curl: "Enter your website",
	},
	errorElement: 'div',
	errorPlacement: function (error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
	}
});

$(function() {


});