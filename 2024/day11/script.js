function decodeFilename(filename) {
    return filename.match(/^[0-9]+_(.+?)\.[a-zA-Z0-9]+$/)[1];
}