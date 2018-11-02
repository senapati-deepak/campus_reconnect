(function($) {
  'use strict';
  applyStyles();
  function applyStyles() {
    if(!$('body').hasClass("horizontal-menu")) {
      $('.content-wrapper').css({
        'min-height':$('.sidebar').height()
      });
    }
    else {
      $('.content-wrapper').css({
        'min-height':'100vh'
      });
    }
    if(!$('body').hasClass("rtl")) {
      $('.list-wrapper, ul.chats, .product-chart-wrapper, .table-responsive').perfectScrollbar();
      $('.container-scroller').perfectScrollbar( {suppressScrollX: true});
      if($('body').hasClass("sidebar-fixed")) {
        $('#sidebar .nav').perfectScrollbar();
      }
    }
  }
})(jQuery);
