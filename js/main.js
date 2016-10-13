$(document).ready(function () {
	navigate('login');
});

var currentTemplate = '',
	templateContainer = $('#template');

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
			$(document).unbind();
			window[template]();
		}
	})
};

function login() {
	Materialize.updateTextFields();
	$('#password').characterCounter();
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
		submitHandler: function () {
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
};

function selectType() {
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,
		constrain_width: false, // Does not change width of dropdown to that of the activator
		hover: true, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: false, // Displays dropdown below the button
		alignment: 'left' // Displays dropdown with edge aligned to the left of button
	});
};

function pricingPlan() {
	$('.collapsible').collapsible({
		accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
};