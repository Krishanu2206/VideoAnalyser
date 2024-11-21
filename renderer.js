let form = document.querySelector('form');
let durationdisplay = document.getElementById('duration');

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    const fileInput = document.getElementById('videoInput');
    const video = fileInput.files[0];

    if (!video) {
        console.error('No file selected');
        return;
    }
    console.log('File selected : ', video);

    await window.electronAPI.setVideo(video);

    duration.innerText = 'Loading...';

    await window.electronAPI.setDuration((duration)=> {
        durationdisplay.innerText = `${duration} seconds`;
    })
})



