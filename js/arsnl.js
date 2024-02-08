$(document).ready(function(){
    "use strict"; 
    
    // NAVBAR RESIZE FUNCTION
    $(window).scroll( function() {
        var value = $(this).scrollTop();
        if ( value > $(window).height() * 1 )
            $(".navbar-dark").addClass("scrolled");
        else
            $(".navbar-dark").removeClass("scrolled");
    });
    
    // COOKIES NOTIFICATION
    $('.cookies-bar').addClass('open'); // Bring up notification bar
    $('#cookies-close').on("click", function () { 
        $('.cookies-bar').addClass('closed'); // Close notification bar when "accept cookies" button is cicked
    });
                            
    // HAMBURGER MENU ANIMATION
    	$('#hamburger').on("click", function(){
            $(this).toggleClass('open');
        });
    
    // SMOOTH SCROLLING TO ANCHORS
        $('a[href*=\\#]:not([href=\\#]):not(.control-right, .control-left)').on('click', function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top - 100
                }, 1000);
            return false;
          }
        }
      }); 
    
    // LAZY LOADING IMAGES
    var bLazy = new Blazy();

    // FEATURE CARD ANIMATION
    $(".feature-card").on({
    mouseenter: function () {
        //stuff to do on mouse enter
        $(this).addClass('card-active');
    },
    mouseleave: function () {
        //stuff to do on mouse leave
        $(this).removeClass('card-active');
    }
    });
    
    // ANIMATIONS
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top + 150;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            }
      });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

//PRIVACY FORM SCRIPTS
//COPYRIGHT YEAR
    document.getElementById("year").innerHTML = new Date().getFullYear();
    
});
window.onload = function() {
    // HIDE LOADING SCREEN WHEN PAGE IS LOADED
    $('#progress').animate({ width:'100%'}, 300, function() {
        $('#loader-wrapper').addClass('loaded');
    });
}