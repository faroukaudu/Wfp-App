
$(document).ready(function() {
	'use strict';

  var currentStep = $('.current-step').html();
  var totalStep = $('.total-step').html();

  function checkStep() {

    if(currentStep == totalStep) {
      $('.step-count').addClass('final-step');

    } else if(currentStep > totalStep) {
      $('.covid-header').addClass('no-step');
      $('.step-count').removeClass('final-step');

    } else {
      $('.step-count').removeClass('final-step');
      $('.covid-header').removeClass('no-step');
    }

  }

  $('.test-step .button').on('click', function(e) {
  	e.preventDefault();

    currentStep++;
    $('.current-step').html(currentStep);
    checkStep();

    $(this).parents('.test-step').next().addClass('active');
    $(this).parents('.test-step').removeClass('active');

  })

  $('.test-step .prev-btn').on('click', function(e) {

    e.preventDefault();

    currentStep--;
    $('.current-step').html(currentStep);
    checkStep();

    $(this).parents('.test-step').prev().addClass('active');
    $(this).parents('.test-step').removeClass('active');

  })

})
