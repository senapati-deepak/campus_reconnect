(function($) {
  'use strict';
  $(function() {
    $('.settings-tab').pwstabs({
        effect: 'none'
    });
    $('[data-toggle="settings"]').on("click", function () {
      $('.card-settings').toggleClass('show')
    });
    //Layout settings
    $('#compact-menu').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#hidden-menu-1').iCheck('uncheck');
      $('#hidden-menu-2').iCheck('uncheck');
      $('#horizontal-menu-1').iCheck('uncheck');
      $('#horizontal-menu-2').iCheck('uncheck');
      $('#icon-only').iCheck('uncheck');
      $('body').addClass("sidebar-mini");
    });
    $('#compact-menu').on('ifUnchecked', function(event){
      $('body').removeClass("sidebar-mini");
    });
    $('#boxed-layout').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('body').addClass("boxed-layout");
    });
    $('#boxed-layout').on('ifUnchecked', function(event){
      $('body').removeClass("boxed-layout");
    });
    $('#horizontal-menu-1').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#horizontal-menu-2').iCheck('uncheck');
      $('#hidden-menu-1').iCheck('uncheck');
      $('#hidden-menu-2').iCheck('uncheck');
      $('#compact-menu').iCheck('uncheck');
      $('#icon-only').iCheck('uncheck');
      $('body').addClass("horizontal-menu");
    });
    $('#horizontal-menu-1').on('ifUnchecked', function(event){
      $('body').removeClass("horizontal-menu");
    });
    $('#horizontal-menu-2').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#horizontal-menu-1').iCheck('uncheck');
      $('#hidden-menu-1').iCheck('uncheck');
      $('#hidden-menu-2').iCheck('uncheck');
      $('#compact-menu').iCheck('uncheck');
      $('#icon-only').iCheck('uncheck');
      $('body').addClass("horizontal-menu horizontal-menu-top");
    });
    $('#horizontal-menu-2').on('ifUnchecked', function(event){
      $('body').removeClass("horizontal-menu horizontal-menu-top");
    });
    $('#hidden-menu-1').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#compact-menu').iCheck('uncheck');
      $('#icon-only').iCheck('uncheck');
      $('#horizontal-menu-1').iCheck('uncheck');
      $('#horizontal-menu-2').iCheck('uncheck');
      $('#hidden-menu-2').iCheck('uncheck');
      $('body').addClass("sidebar-toggle-display sidebar-hidden");
    });
    $('#hidden-menu-1').on('ifUnchecked', function(event){
      $('body').removeClass("sidebar-toggle-display sidebar-hidden");
    });
    $('#hidden-menu-2').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#compact-menu').iCheck('uncheck');
      $('#icon-only').iCheck('uncheck');
      $('#horizontal-menu-1').iCheck('uncheck');
      $('#horizontal-menu-2').iCheck('uncheck');
      $('#hidden-menu-1').iCheck('uncheck');
      $('body').addClass("sidebar-absolute sidebar-hidden");
    });
    $('#hidden-menu-2').on('ifUnchecked', function(event){
      $('body').removeClass("sidebar-absolute sidebar-hidden");
    });
    $('#icon-only').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('#hidden-menu-1').iCheck('uncheck');
      $('#hidden-menu-2').iCheck('uncheck');
      $('#horizontal-menu-1').iCheck('uncheck');
      $('#horizontal-menu-2').iCheck('uncheck');
      $('#compact-menu').iCheck('uncheck');
      $('body').addClass("sidebar-icon-only");
    });
    $('#icon-only').on('ifUnchecked', function(event){
      $('body').removeClass("sidebar-icon-only");
    });
    $('#rtl-layout').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('body').addClass("rtl");
    });
    $('#rtl-layout').on('ifUnchecked', function(event){
      $('body').removeClass("rtl");
    });

    //Navbar settings
    $('#navbar-default').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-dark navbar-primary navbar-danger navbar-success navbar-warning');
    });
    $('#navbar-dark').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-primary navbar-danger navbar-success navbar-warning');
      $('.navbar').addClass('navbar-dark');
    });
    $('#navbar-primary').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-dark navbar-danger navbar-success navbar-warning');
      $('.navbar').addClass('navbar-primary');
    });
    $('#navbar-danger').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-dark navbar-primary navbar-success navbar-warning');
      $('.navbar').addClass('navbar-danger');
    });
    $('#navbar-success').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-dark navbar-primary navbar-danger navbar-warning');
      $('.navbar').addClass('navbar-success');
    });
    $('#navbar-warning').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.navbar').removeClass('navbar-dark navbar-primary navbar-danger navbar-success');
      $('.navbar').addClass('navbar-warning');
    });

    //Sidebar settings
    $('#sidebar-light').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.sidebar').removeClass('sidebar-dark');
    });
    $('#sidebar-dark').on('ifChecked', function(event){ //Icheck's event for checkbox states
      $('.sidebar').addClass('sidebar-dark');
    });
  });
})(jQuery);
