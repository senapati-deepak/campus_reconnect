(function($) {
  'use strict';
  $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {
      var body = $('body');
      var sidebarIconOnly = body.hasClass("sidebar-icon-only");
      var sidebarFixed = body.hasClass("sidebar-fixed");
      if(!('ontouchstart' in document.documentElement)) {
        if(sidebarIconOnly) {
          if(sidebarFixed) {
            if(ev.type === 'mouseenter') {
              body.addClass('sidebar-expanded');
            }
            else {
              body.removeClass('sidebar-expanded');
            }
          }
          else {
            var $menuItem = $(this),
            $menuTitle = $('.menu-title', $menuItem),
            $submenuWrapper = $('> .collapse', $menuItem);
            if(ev.type === 'mouseenter') {
              $menuTitle.addClass('show');
              $submenuWrapper.addClass('show');
            }
            else {
              $menuTitle.removeClass('show');
              $submenuWrapper.removeClass('show');
            }
          }
        }
      }

  });

  //We are handling submenu in horizontal menu layout in a different way
  $('[data-toggle="showMegaMenu"]').on("click", function () {
    $(this).toggleClass('expanded');
  }).hover(function(){
    if(!('ontouchstart' in document.documentElement)) {
      $(this).toggleClass('expanded');
    }
  });
})(jQuery);
