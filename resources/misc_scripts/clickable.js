function windowSizeCheck() {
    $('.dropdown').off('click.mobile');
    if($(window).width() < '720') {
        $('.dropdown').on('click.mobile', function(e) {
            var childMenu = e.currentTarget.children[1];
            if($(childMenu).hasClass('visible')) {
                $(childMenu).removeClass('visible');
            }else{
                $(childMenu).addClass('visible');
            }
        });
     }
}
jQuery(document).ready(function($) {
windowSizeCheck();
$(window).resize(windowSizeCheck);
});