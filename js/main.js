$(document).ready(function () {
	navigate('login');
});

var currentTemplate = '',
	searchSubmitTemplate = '',
	templateContainer = $('#template'),
    confirmationText,
    confirmationAttributes = '';

function navigate(template, searchSubmitState) {
    if (currentTemplate == 'pricingPlan'){
        confirmationText = 'You\'re about to update the following attributes on the selected pricing plans:';
        if ($('.delivery-capabilities-wrapper').length == 1){ confirmationAttributes += 'Delivery Capabilities'};
        if ($('.pricing-options-wrapper').length == 1){ confirmationAttributes += '&&Pricing Options'};
        if ($('.pricing-targeting-segmentation-wrapper').length == 1){ confirmationAttributes += '&&Targeting Segments'};
    }
    else if (currentTemplate == 'contentItems'){
        confirmationText = 'You\'re about to update the following attributes on the selected pricing plans:';
        if ($('.media-quality-wrapper').length == 1){ confirmationAttributes += '&&Content Item Quality'};
        if ($('.media-item-type-wrapper').length == 1){ confirmationAttributes += '&&Content Item Type'};
        if ($('.media-item-subtype-wrapper').length == 1){ confirmationAttributes += '&&Content Item Subtype'};
        if ($('.media-cc-wrapper').length == 1){ confirmationAttributes += '&&Content Item Instream Closed Captions' };
    }
	currentTemplate = template;
	searchSubmitTemplate = searchSubmitState;
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
			if (typeof window[template] === 'function') {
				window[template]();
			}
		}
	})
};

function getSearchResults() {
	if (searchSubmitTemplate) {
		var resultsTemplate = $('#search-results-' + searchSubmitTemplate).html();
		$('#search-page #search-results').append(resultsTemplate).effect('slide', {
			direction: 'up',
			mode: 'show'
		}, 250);
		$('#search-button').hide();
		$('#search-submit-button').show();
	}
}

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
				$(placement).append(error);
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

function search() {

};

function pricingPlan() {
    $('.collapsible').collapsible({
        accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $(document).on('click','.close-icons',function(e){
        e.preventDefault();
        $(this).parents('li').remove();
    });

};

function contentItems() {
    $('.collapsible').collapsible({
        accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('.item-type-dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    $('.item-subtype-dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    $(document).on('click','.close-icons',function(e){
        e.preventDefault();
        $(this).parents('li').remove();
    });
};

function confirmation(){
    $('.confirmation-text').text(confirmationText);
    attributeArray = confirmationAttributes.split('&&');
    for(var i = 0; i < attributeArray.length; i++){
        $('.confirmation-attributes-wrapper').append('<p class="confirmation-attributes">'+ attributeArray[i] +'</p>');
    }
}

function revert(){
    $(document).on('click','.revert-button',function(){
        $('.revert-button, h1, p').fadeOut( 500, function() {
            $('.revert-confirmation-text').fadeIn( 500 )
        });
    });
}