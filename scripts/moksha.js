// Moksha - Javascript Document

// Use strict

(function(){
  "use strict";

  //On Window Load

  $(window).load(function(){


      //Page Loader

      $('.page-loader').delay(800).fadeOut('slow');

      //Page Loader Ends

      $(window).trigger("resize");

      //Page Loader Ends



      //Detect Mobile Device

      var mobileTest;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
          mobileTest = true;
          $("html").addClass("mobile");
        }

      else{
           mobileTest = false;
           $("html").addClass("no-mobile");
           }

      //Detect Mobile Device Ends



      //Parallax

      if (($(window).width() >= 1024) && (mobileTest == false)){

          $('.parallax').parallax('50%',0.3);

         }

      //Parallax Ends



      //Background Video

      if(mobileTest==false){

         $('.video-section').addClass('bg-yt-video');

         $(".bg-yt-video").YTPlayer({

              autoPlay:true,
              mute:true,
              opacity:1,
              showControls:false,
              optimizeDisplay:true,
              startAt:4,
              showYTLogo:false,
              stopMovieOnBlur: true,
              quality:'hd720',
              gaTrack:false

             });

      }

      //Background Video Ends


  });

  //On Window Load


  //Document Ready

  $(document).ready(function(){

     $(window).trigger('resize');

     // Inline Lightbox

     (function(){

          $('.open-popup-link').magnificPopup({

             type:'inline',
             midClick: true,
             removalDelay: 500,
             mainClass: 'mfp-fade'

          });

     })();

     // Inline Lightbox Ends




     // MagnificPopup Lightbox

     (function(){

       $('.lightbox').magnificPopup({
            delegate: '.item:visible > a',
            type: 'image',
            gallery:{
                    enabled:true,
                    removalDelay: 500,
                    mainClass: 'mfp-fade'
                    }
            });
      })();

     // Magnific Popup Lightbox Ends


     //  Main Intro Section Lightbox

     (function(){

        $('.main-intro-section .gallery-lightbox').magnificPopup({

          items: [

             {
               src: 'img/portfolio/14.jpg',
               type: 'image'
             },
             {
               src: 'img/portfolio/umbrella.jpg',
               type: 'image'
             },
             {
               src: 'img/portfolio/white3.jpg',
               type: 'image'
             },
             {
               src: 'img/portfolio/4.jpg',
               type: 'image'
             },
             {
               src: 'img/portfolio/18.jpg',
               type: 'image'
             }
          ],

          removalDelay: 300,
          mainClass: 'mfp-fade',

          gallery:{
            enabled:true,
            removalDelay: 500,
            mainClass: 'mfp-fade'
            },

          type:'image'

        });

     })();

     //Main Intro Section Lightbox ends



     // Colorbox

     (function(){

          $(".colorbox .item > a").colorbox({maxWidth:'80%', maxHeight:'80%'});

     })();

     // Colorbox Ends



     //Countdown

     (function(){

         var time = new Date();

         time = new Date(time.getFullYear(), 9, 25);

         $('#time').countdown({until: time,compact:true});

     })();

     //Countdown Ends



     // Filterable Portfolio

     (function(){

         var filters = 0;
         var gallery = $("#gallery");

         (function($){

               gallery.imagesLoaded(function(){

                   gallery.isotope({

                      itemSelector: '.item',
                      filter: filters,
                      transitionDuration: '0.8s'

                   });

               });

               $(".filters").on('click',function(){

                    $(".filters").removeClass("active");

                    $(this).addClass("active");
                    filters = $(this).attr('data-filter');

                    gallery.isotope({

                       itemSelector: '.item',
                       filter: filters,
                       transitionDuration: '0.6s'

                    });

                    return false;

               });

         })(jQuery);

     })();

     // Filterable Portfolio



     // Tabs

     (function(){

         var tabItems = $('.tabs-navigation a'),
             tabContentWrapper = $('.tabs-content');

         tabItems.on('click', function(event){

            event.preventDefault();
            var selectedItem = $(this);

            if( !selectedItem.hasClass('selected') ) {

                var selectedTab = selectedItem.data('content'),
                selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
                slectedContentHeight = selectedContent.innerHeight();
                tabItems.removeClass('selected');
                selectedItem.addClass('selected');
                selectedContent.addClass('selected').siblings('li').removeClass('selected');
                //animate tabContentWrapper height when content changes
                tabContentWrapper.animate({
                'height': slectedContentHeight
                }, 200);

            }

         });

         //hide the .tabs::after element when tabbed navigation has scrolled to the end (mobile version)

         checkScrolling($('.tabs nav'));

         $(window).on('resize', function(){

             checkScrolling($('.tabs nav'));
             tabContentWrapper.css('height', 'auto');

         });

         $('.tabs nav').on('scroll', function(){

              checkScrolling($(this));

         });

         function checkScrolling(tabs){

              var totalTabWidth = parseInt(tabs.children('.tabs-navigation').width(),13),
              tabsViewport = parseInt(tabs.width(),13);

              if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {

                 tabs.parent('.tabs').addClass('is-ended');

              } else{
                   tabs.parent('.tabs').removeClass('is-ended');
                   }

         }

     })();

     // Tabs Ends



     // Navigation

     (function(){

         $('.menu-open').on('click',function(){

            $(this).fadeOut('fast');
            $('.menu-close').fadeIn('fast');
            $('.main-nav').fadeIn('fast');
            $('body').css('overflow','hidden');

         });

         $('.menu-close').on('click',function(){

            $(this).fadeOut('fast');
            $('.menu-open').fadeIn('fast');
            $('.main-nav').fadeOut('fast');
            $('body').css('overflow','auto');

         });

      })();

     // Navigation Ends



     //One Page Navigation

     (function(){


        $('.one-page-nav.main-menu li a').on('click',function(){

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



     })();


     //One Page Navigation Ends



     // Background Image.

     (function(){

          var bg_link = $(".bg-link");

          bg_link.each(function(indx){

            if ($(this).attr("data-bg-link")){
              $(this).css("background-image", "url(" + $(this).data("bg-link") + ")");
            }

          });

     })();

     // Background Image Ends




     // Main Intro Slider - Type One

     (function(){

        $('#main-intro-slider').owlCarousel({

             nav:true,
             items:1,
             loop:true,
             autoplay:false,
             autoplayTimeout:6000,
             navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
             autoHeight:true,
             singleItem:true,
             slideSpeed:400,
             ControlsClass:'true',
             dotClass: 'owl-dots',
             dotsClass: 'owl-pagination'

        });

     })();

     // Main Intro Slider - Type One Ends



     // Main Intro Slider - Type One

     (function(){

         $('#main-intro-slider-two').owlCarousel({

             nav:false,
             items:1,
             loop:true,
             autoplay:true,
             autoplayTimeout:6000,
             autoHeight:true,
             singleItem:true,
             slideSpeed:400,
             ControlsClass:'false',
             animateOut: 'fadeOut',
             animateIn: 'fadeIn',
             navigation:false,
             dots:false

         });

     })();

     // Main Intro Slider - Type One Ends



     //Testimonials

     (function(){

         $('.testimonials').owlCarousel({

             items:1,
             autoplay:true,
             autoplayTimeout:4000,
             loop:true,
             dots:true,
             dotsEach:true

         });

     })();

     //Testimonials End



     //Media Slider

     (function(){

         $('.media-slider').owlCarousel({

              nav:true,
              navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
              items:1,
              loop:true,
              autoplay:true,
              autoplayTimeout:4000,
              navigation:true,
              autoHeight:true,
              singleItem:true,
              slideSpeed:400,
              dots:true,
              ControlsClass:'true',
              dotClass: 'owl-dots',
              dotsClass: 'owl-pagination'

         });

     })();

     //Media Slider Ends



     // Facts

     (function(){

         $('#facts').owlCarousel({

               nav:false,
               margin:10,
               loop:true,
               singleItem:true,
               dots:true,
               items:1,
               ControlsClass:'true',
               dotClass: 'owl-dots',
               dotsClass: 'owl-pagination',
               autoHeight:true

         });

     })();

     // Facts End



     // Blog Video

     (function(){

         $(".blog-video").YTPlayer({

              autoplay:true,
              mute:true,
              loop:true,
              showControls:false,
              optimizeDisplay:true,
              startAt:4,
              stopMovieOnBlur: true,
              quality:'hd720',
              opacity:0.8,
              gaTrack:false

         });

     })();

     // Blog Video ends



     // Accordions

     (function(){

         $('.accordion .accordion-content.active').prev('.title').addClass('active-title');

         $('.accordion').find('.title').on('click',function(){

              //Expand or collapse this panel

              $(this).next().slideToggle('fast');

              $(this).toggleClass('active-title');

              //Hide the other panels

              $(this).find(".accordion-content").not($(this).next()).slideUp('fast');

         });


         $('.accordion-toggle .accordion-content.active').prev('.title').addClass('active-title');

         $('.accordion-toggle').find('.title').on('click',function(){

               $(this).toggleClass('active-title');

               $(this).next().slideToggle('fast');

               $('.accordion-toggle').find(".accordion-content").not($(this).next()).slideUp('fast');

               $('.accordion-toggle').find(".title").not($(this)).removeClass('active-title');

         });

     })();

     // Accordions End



     // Full Width Image Slider

     (function(){

        $(window).resize(function(){

            $('.fullw-img-slider').owlCarousel({
               nav:true,
               navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
               loop:true,
               autoplay:false,
               autoplayTimeout:6000,
               navigation:true,
               autoWidth:true,
               margin:5,
               slideSpeed:400,
               dots:true,
               transitionStyle: "backSlide",
               ControlsClass:'owl-pagination'
             });

        });

     })();

     // Full Width Image Slider Ends



     // Testimonials

     (function(){

        $('.testimonials').owlCarousel({

              items:1,
              autoplay:true,
              autoplayTimeout:4000,
              loop:true,
              dots:true,
              dotsEach:true,
              controlsClass:true

         });

      })();

     // Testimonials End



     // Full Height

     (function(){

        $(window).resize(function(){

            $(".full-height").height($(window).height()+2);

        });

     })();

     // Full Height Ends


     //Blog Masonry

     (function(){

        $(window).on('resize',function(){

            var blog_item = $("#blog-masonry");

            blog_item.imagesLoaded(function(){

              blog_item.isotope({

                  itemSelector: '.blog-item'

              });

            });

        });

     })();

     //Blog Masonry Ends





     //Scroll Down

     (function(){

        $('.scroll-down img').on('click',function(){

            $('html,body').animate({scrollTop:$(window).height()+8},{
               duration:'1000',
               easing:'easeInOutCirc'
            });

            return false;

        });


        $(window).scroll(function(){

            if($(this).scrollTop()>300){

              $('.scroll-down img').fadeOut('slow');

            }else{

              $('.scroll-down img').fadeIn('slow');
            }

        });

     })();

     //Scroll Down Ends


  });

  //Document Ready Ends

})();

// Use of strict Ends.


// On Scroll Animations

(function(){

  wow = new WOW(
                  {

                    animateClass:'animated',
                    offset:100,
                    mobile: false,
                    live:true

                  }
                );

  wow.init();

})();

// On Scroll Animation End
