(function($) {
    'use strict';
    $(function() {
        $('.demo-tabs').pwstabs({
            effect: 'none'
        });
        $('.hello_world').pwstabs();

        $('#rtl-tabs-1').pwstabs({
            effect: 'slidedown',
            defaultTab: 2,
            rtl: true
        });

        $('#vertical-left').pwstabs({
            effect: 'slideleft',
            defaultTab: 1,
            containerWidth: '600px',
            tabsPosition: 'vertical',
            verticalPosition: 'left'
        });

        $('#horizontal-left').pwstabs({
            effect: 'slidedown',
            defaultTab: 2,
            containerWidth: '600px',
            horizontalPosition: 'bottom'
        });

        $('.tickets-tab').pwstabs({
          effect: 'none'
        });
    });
})(jQuery);
