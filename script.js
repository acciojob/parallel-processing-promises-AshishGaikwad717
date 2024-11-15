//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image
const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve promise with the image element
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // Reject with an error
  });
};

// Button click event
btn.addEventListener("click", () => {
  output.innerHTML = ""; // Clear previous content

  const imagePromises = images.map(loadImage);

  // Use Promise.all to handle all image downloads
  Promise.allSettled(imagePromises)
    .then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          // Append the successfully loaded image
          output.appendChild(result.value);
        } else {
          // Append an error message for failed downloads
          const errorMsg = document.createElement("p");
          errorMsg.textContent = result.reason.message;
          errorMsg.style.color = "red";
          output.appendChild(errorMsg);
        }
      });
    });
});
