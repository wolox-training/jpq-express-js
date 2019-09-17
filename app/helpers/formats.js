exports.formatResponseAlbums = albums => albums.map(album => ({ id: album.id, title: album.title }));

exports.formatResponsePhotos = photos =>
  photos.map(photo => ({
    albumId: photo.albumId,
    title: photo.tile,
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl
  }));
