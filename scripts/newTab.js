chrome.storage.local.get(["videoId"], (res) => {
  const videoId = res.videoId;
  const endings = [0, 1, 2, 3, "mqdefault", "hqdefault"];
  const mainUrl = `https://img.youtube.com/vi/${videoId}/`;

  const thumbnails = endings.map((file) => {
    const fileUrl = mainUrl + file + ".jpg";
    const image = `
    <div class="img-container">
      <img 
        src="${fileUrl}" 
        alt="Thumbnail-${file}"
        title="Thumbnail-${file}"
      />
    </div>`;
    document.getElementById("img-container").innerHTML += image;
  });

  document.getElementById("img-container").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const img = e.target;
      let downloadSrc = img.src;

      chrome.downloads.download({
        url: downloadSrc,
      });
    }
  });

  document.querySelector("#dark-mode-trigger").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark-mode");
  });
});
