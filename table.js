(function ($) {
  'use strict';

  Drupal.behaviors.table = {
    attach: function (context) {
      var $users = $('.users', context);

      $users.once('table', function () {
        var $table = $users.find('.table'),
            $nav = $users.find('.btn-group'),
            nav_html = '';

        for (var i = 0; i < 10;) {
          nav_html += '<button type="submit" class="btn btn-default" value="' + (++i) + '">' + i + '</button>';
        }

        $nav.html(nav_html);

        Drupal.attachBehaviors($nav.children());

        $nav.bind('click', '.btn', function(event) {
          var table_html = '<tbody><tr><td colspan="2"><label><input type="checkbox"> Select all</label></td></tr>';

          event.preventDefault();

          for (var i = event.target.value * 10 - 10; i < event.target.value * 10; i++) {
            table_html += '<tr>';
            table_html += '<td width="20px"><input type="checkbox" name="row[' + i + ']"></td>';
            table_html += '<td>' + (i + 1) + '</td>';
            table_html += '</tr>';
          }

          table_html += '</tbody>';

          if ($table.children().length) {
            Drupal.detachBehaviors($table.children(), Drupal.settings, 'replace');
          }

          $table.html(table_html);

          Drupal.attachBehaviors($table.children());
        });

        $nav.children().first().trigger('click');

      });
    }
  }
})(jQuery);
