!(function($) {
  "use strict";
    $(window).scroll(function(){
      if(this.scrollY > 20){
        $('.navbar').addClass("sticky");
      } else {
        $('.navbar').removeClass("sticky");
      }
    });

  // Hero typed
  var typed = new Typed(".typing", {
		strings: ["Developer", "Data Scientist", "Designer"],
		typeSpeed: 100,
		backSpeed: 60,
		loop: true
	});

  let wrapper = document.querySelectorAll(".wrapper");

  function showScroll() {
		let scrollTop = document.documentElement.scrollTop;
		for(var i = 0; i < wrapper.length; i++) {
			let animateHeight = wrapper[i].offsetTop;
			if(animateHeight - 100 < scrollTop) {
				wrapper[i].style.opacity = 1;
			} else {
				wrapper[i].style.opacity = 0;
			}
		}
	}

	window.addEventListener('scroll', showScroll);

	$('.menu-btn').click(function(){
		$('.navbar .menu').toggleClass("active");
		$('.menu-btn i').toggleClass("active");
	});

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $('.nav-menu, .scrollto, .home').on('click', 'a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).parent('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass(['icofont-navigation-menu', 'icofont-close']);
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(function() {
    if (location.hash) {
      var initial_nav = location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass(['icofont-navigation-menu', 'icofont-close']);
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass(['icofont-navigation-menu', 'icofont-close']);
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
    if ($(this).scrollTop() > 300) {
      $('.icon').fadeIn('slow');
    } else {
      $('.icon').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(function() {
      $('.venobox').venobox();
    });
  });

  $('.carousel').owlCarousel({
		margin: 20,
		loop: true,
		autoplayTimeOut: 5000,
		autoplayHoverPause: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsive: {
			0:{
				items: 1,
				nav: false
			},
			600:{
				items: 2,
				nav: false
			},
			1000:{
				items: 3,
				nav: false
			}
		}
	});

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  
  $(function() {
    aos_init();
  });

  const $form = document.querySelector('#form')

	$form.addEventListener('submit', handleSubmit)

  $(function() {
	async function handleSubmit(event) {
		event.preventDefault()
		const form = new FormData(this)
		const response = await fetch(this.action, {
			method: this.method,
			body: form,
			headers: {
				'Accept': 'application/json'
			}
		})
		if (response.ok) {
			this.reset()
		}
	}
})
})(jQuery);