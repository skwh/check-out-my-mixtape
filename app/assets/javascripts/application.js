// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

SOUNDCLOUD_EMBED_CONST = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=URL_GOES_HERE&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>'

$(document).ready(function() {
  get_tracks();
  $('#refresh-button').click(get_tracks);
});

function get_tracks() {
  $.ajax('/tracks', {
    success:function(data) {
      $('#tracks-box').text("");
      for (var i=0;i<data.length;i++) {
        show_track(data[i])
      }
    },
    beforeSend:function() {
      $('#tracks-box').text("LOADING A NEW DOPE MIXTAPE FAM");
    }
  });
}

function show_track(track_url) {
  $('#tracks-box').append(SOUNDCLOUD_EMBED_CONST.replace("URL_GOES_HERE", encodeURI(track_url)));
}
