// Get the video and button elements
const video = document.getElementById('video');
const applyFilterButton = document.getElementById('apply-filter');

// Add an event listener to the button
applyFilterButton.addEventListener('click', () => {
  // Apply the filter to the video
  const filter = new LensStudioFilter(video);
  filter.loadAssets('./filter.json').then(() => filter.apply());
});

// Get the current active tab
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  // Get the tab's ID
  const tabId = tabs[0].id;

  // Apply the filter to the tab
  chrome.tabCapture.capture({ audio: false, video: true, tabId: tabId }, stream => {
    // Set the video element's src to the tab's stream
    video.srcObject = stream;
  });
});
