const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 75,
};

let imagesLoaded = 0;
const imgs = [];

function preloaderimgs() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                console.log("All images are loaded");
                loadImg(frames.currentIndex);
                startAnimation();
            }
        };
        imgs.push(img);
    }
}

function loadImg(index) {
    if (index >= 0 && index < frames.maxIndex) {
        const img = imgs[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}

function startAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#para",
            start: "top top",
            scrub: 2,
        },
    });

    tl.to(frames, {
        currentIndex: frames.maxIndex - 5,  // Adjusted to avoid out-of-bounds access
        onUpdate: function () {
            loadImg(Math.floor(frames.currentIndex));
        },
    });
}

window.onload = () => {
    preloaderimgs();
};



