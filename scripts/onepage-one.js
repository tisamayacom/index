// One Page (Type One) Javascript

// Use strict

(function(){
  "use strict";

//One Window Load
  
$(window).load(function(){

	// Make Panel visible if Device is not mobile and width is greater than 1170px

    if($('html').hasClass('no-mobile') && $(window).width() > 1170 ){

    	   //Open Slide Panel
          
           $('.open-panel').on('click', function(event){
    
               event.preventDefault();
               $(this).parents().children('.slide-panel').addClass('is-panel-visible');
               $('body').css('overflow','hidden');
               $('body .slide-panel').css('overflow','scroll');        

           });

           //Open Slide Panel Ends


           //Close Slide Panel

           $('.slide-panel').on('click', function(event){

               if( $(event.target).is('.slide-panel') || $(event.target).is('.slide-panel-close') ) { 
        
                   $('.slide-panel').removeClass('is-panel-visible');
                   $('body').css('overflow','scroll');
                   event.preventDefault();
        
               }

           });

           //Close Slide Panel

    }       

});

//On Window Load Ends


//On Document Ready

jQuery(document).ready(function($){

	//change this value if you want to change the speed of the scale effect

	var	scaleSpeed = 0.3,

	//change this value if you want to set a different initial opacity for the .half-block

    boxShadowOpacityInitialValue = 0.7,
    animating = false; 
	
	//check the media query 

	var MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");;

	$(window).on('resize', function(){

		MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");;

	});

	//Bind the animation to the window scroll event

	triggerAnimation();

	$(window).on('scroll', function(){

		triggerAnimation();
	
	});


    $(document).keydown(function(event){

		if( event.which=='38' ) {
			prevSection();
			$('.slide-panel').removeClass('is-panel-visible');
			event.preventDefault();
		} else if( event.which=='40' ) {
			nextSection();
			$('.slide-panel').removeClass('is-panel-visible');
			event.preventDefault();
		}

		$('body').css('overflow','auto');

	});

	function triggerAnimation(){

		if(MQ == 'desktop') {

			//if on desktop screen - animate sections
			(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);

		} else {

			//on mobile - remove the style added by jQuery 
			$('.section-outer').find('.section-block').removeAttr('style').find('.half-block').removeAttr('style');

		}
		//update navigation arrows visibility
		
	}
	
	function animateSection () {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width();
			$('.slide-panel').removeClass('is-panel-visible');
		
		$('.section-outer').each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top,
				scale = 1,
				translate = windowWidth/2+'px',
				opacity,
				boxShadowOpacity;

			if( offset >= -windowHeight && offset <= 0 ) {
				//move the two .half-block toward the center - no scale/opacity effect
				scale = 1,
				opacity = 1,
				translate = (windowWidth * 0.5 * (- offset/windowHeight)).toFixed(0)+'px';

			} else if( offset > 0 && offset <= windowHeight ) {
				//the two .half-block are in the center - scale the .section-block element and reduce the opacity
				translate = 0+'px',
				scale = (1 - ( offset * scaleSpeed/windowHeight)).toFixed(5),
				opacity = ( 1 - ( offset/windowHeight) ).toFixed(5);

			} else if( offset < -windowHeight ) {
				//section not yet visible
				scale = 1,
				translate = windowWidth/2+'px',
				opacity = 1;

			} else {
				//section not visible anymore
				opacity = 0;
			}
			
			boxShadowOpacity = parseInt(translate.replace('px', ''),13)*boxShadowOpacityInitialValue/20;
			
			//translate/scale section blocks
			scaleBlock(actualBlock.find('.section-block'), scale, opacity);

			var directionFirstChild = ( actualBlock.is(':nth-of-type(even)') ) ? '-': '+';
			var directionSecondChild = ( actualBlock.is(':nth-of-type(even)') ) ? '+': '-';
			if(actualBlock.find('.half-block')) {
				translateBlock(actualBlock.find('.half-block').eq(0), directionFirstChild+translate, boxShadowOpacity);
				translateBlock(actualBlock.find('.half-block').eq(1), directionSecondChild+translate, boxShadowOpacity);	
			}
			//this is used to navigate through the sections
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('is-visible') : actualBlock.removeClass('is-visible');		
		});
	}

	function translateBlock(elem, value, shadow) {
		var position = Math.ceil(Math.abs(value.replace('px', '')));
		
		if( position >= $(window).width()/2 ) {
			shadow = 0;	
		} else if ( position > 20 ) {
			shadow = boxShadowOpacityInitialValue;
		}

		elem.css({
		    '-moz-transform': 'translateX(' + value + ')',
		    '-webkit-transform': 'translateX(' + value + ')',
			'-ms-transform': 'translateX(' + value + ')',
			'-o-transform': 'translateX(' + value + ')',
			'transform': 'translateX(' + value + ')',
			'box-shadow' : '0px 0px 40px rgba(0,0,0,'+shadow+')'
		});
	}

	function scaleBlock(elem, value, opac) {
		elem.css({
		    '-moz-transform': 'scale(' + value + ')',
		    '-webkit-transform': 'scale(' + value + ')',
			'-ms-transform': 'scale(' + value + ')',
			'-o-transform': 'scale(' + value + ')',
			'transform': 'scale(' + value + ')',
			'opacity': opac
		});
	}

	function nextSection() {
		if (!animating) {
			if ($('.section-outer.is-visible').next().length > 0) smoothScroll($('.section-outer.is-visible').next());
		}
	}

	function prevSection() {
		if (!animating) {
			var prevSection = $('.section-outer.is-visible');
			if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
				smoothScroll(prevSection);
			} else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
				smoothScroll(prevSection.prev('.section-outer'));
			}
		}
	}	

	function smoothScroll(target) {
		animating = true;
        $('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
	}
	
    

	//Navigation
	
    $('.main-menu li a').on('click',function(){

        $('body').css('overflow','auto');

        $('.navigation-trigger').fadeOut();

        $('.menu-close').fadeOut('slow'); 

        var sectionLink=$(this).attr('data-section');

        $('.main-nav').fadeOut(200);

        $('body').css('overflow','auto');

        $('html,body').animate({scrollTop:$('#'+sectionLink).offset().top - 0}, 750);

        $('.menu-open').fadeIn('slow');
        
        $('.navigation-trigger').fadeIn();      

    });

    //Navigation Ends

    
    //Open Menu

    $('.menu-open').on('click',function(){
    		
    	$('.menu-nav').fadeIn();
    	$('body').css('overflow','hidden');
    	
    });

    //Open Menu Ends

  
    //Close Menu.

    $('.menu-close').on('click',function(){
    	
    	$('.menu-nav').fadeOut();
    	$('body').css('overflow','auto');

    });

    //Close Menu Ends


    //Overflow Fix on Lightbox Open

    $('#cboxOverlay,#cboxClose').on('click',function(){

        if($('.slide-panel').hasClass('is-panel-visible')){

           $('body').css('overflow','hidden');
         }

        else{

           $('body').css('overflow','auto');
           
         }

    });

    //Overflow Fix On Lightbox Ends

});

//One Document Ready Ends

})();

// Use of strict Ends


