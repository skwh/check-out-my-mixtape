class StaticController < ApplicationController
  def index
    set_meta_tags title: "Check out my mixtape",
                  description: "Generates hip-hop playlists from SoundCloud",
                  og: {
                    title: "Check out my mixtape",
                    image: asset-path("mixtape.jpeg")
                  }

  end

  def fetch_tracks(client)
    tracks = client.get('/tracks', :limit => 100, :tags => "hip-hop")
    return tracks
  end

  def gen_rands(tracks)
    return 10.times.map { tracks[Random.rand(100)] }
  end

  def tracks
    client = SoundCloud.new(:client_id => ENV['CLIENT_ID'], :use_ssl => false)
    rand_tracks = gen_rands(fetch_tracks(client))
    while rand_tracks.include? nil
      rand_tracks = gen_rands(fetch_tracks(client))
    end
    tracks_urls = rand_tracks.map { |t| t["permalink_url"] }
    render :json => tracks_urls
  end
end
