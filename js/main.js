$(document).ready(function () {
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
		submitHandler: function() {
			navigate('selectType');
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
});

var currentTemplate = 'login',
	templateContainer = $('#template');

function appendHtml() {
	var html = $('#hidden-template').html();
	$('.template').append(html);
}

function navigate(template) {
	currentTemplate = template;
	templateContainer.effect('slide', {
		direction: 'left',
		mode: 'hide',
		complete: function () {
			templateContainer.empty().show();
			var templateHtml = $('#' + template).html();
			templateContainer.append(templateHtml);
			templateContainer.find('[style="display: none;"]').effect('slide', {
				direction: 'right',
				mode: 'show'
			}, 250);
		}
	}
)};