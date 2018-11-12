(function($) {
  'use strict';
  $.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
  }

  $('.example-1').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });

  $('.full-width').owlCarousel({
    loop: true,
    margin: 10,
    items: 1,
    nav: true
  });

  $('.loop').owlCarousel({
    center: true,
    items: 2,
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      600: {
        items: 4
      }
    }
  });

  $('.nonloop').owlCarousel({
    center: true,
    items: 2,
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
      600: {
        items: 4
      }
    }
  });

})(jQuery);
