/* ==========================
   WEDDING INVITATION SCRIPT
========================== */

/* ==========================
   NAMA TAMU DARI URL
========================== */

const guestName = document.getElementById("guestName");

const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if (guest) {
    guestName.innerHTML =
        "Bapak/Ibu/Saudara/i " +
        decodeURIComponent(guest);
}

/* ==========================
   OPEN INVITATION
========================== */

const openBtn = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");

openBtn.addEventListener("click", () => {

    cover.classList.add("hide");

    setTimeout(() => {
        mainContent.classList.add("show");
    }, 600);

    try {
        bgMusic.play();
    } catch (e) {}

    startFlowerEffect();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ==========================
   COUNTDOWN
========================== */

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const weddingDate =
new Date("July 5, 2026 08:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const d = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const h = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const m = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const s = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    days.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
}

setInterval(updateCountdown, 1000);

updateCountdown();

/* ==========================
   SCROLL REVEAL
========================== */

const reveals =
document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(item => {

        const top =
        item.getBoundingClientRect().top;

        const visible =
        window.innerHeight - 120;

        if (top < visible) {
            item.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* ==========================
   LIGHTBOX
========================== */

const familyImage =
document.getElementById("familyImage");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const closeLightbox =
document.getElementById("closeLightbox");

familyImage.addEventListener(
    "click",
    () => {

        lightbox.classList.add("show");

        lightboxImage.src =
        familyImage.src;

    }
);

closeLightbox.addEventListener(
    "click",
    () => {
        lightbox.classList.remove("show");
    }
);

lightbox.addEventListener(
    "click",
    (e) => {

        if (e.target === lightbox) {
            lightbox.classList.remove("show");
        }

    }
);

/* ==========================
   MUSIC BUTTON
========================== */

const musicBtn =
document.getElementById("musicBtn");

let musicPlaying = true;

musicBtn.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            bgMusic.pause();

            musicBtn.innerHTML = "♫";

        } else {

            bgMusic.play();

            musicBtn.innerHTML = "♪";

        }

        musicPlaying =
        !musicPlaying;

    }
);

/* ==========================
   RSVP SYSTEM
========================== */

const form =
document.getElementById("rsvpForm");

const wishList =
document.getElementById("wishList");

const toggles =
document.querySelectorAll(".toggle");

let attendance = "Hadir";

toggles.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            toggles.forEach(
                b => b.classList.remove("active")
            );

            btn.classList.add("active");

            attendance =
            btn.dataset.status;

        }
    );

});

function renderWishes() {

    const data =
    JSON.parse(
        localStorage.getItem("wishes")
    ) || [];

    wishList.innerHTML = "";

    data.reverse().forEach(item => {

        const card =
        document.createElement("div");

        card.classList.add("wish-card");

        card.innerHTML = `
            <span>${item.name}</span>
            <small>${item.status}</small>
            <p><i>${item.message}</i></p>
        `;

        wishList.appendChild(card);

    });

}

form.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const name =
        document.getElementById(
            "rsvpName"
        ).value;

        const message =
        document.getElementById(
            "message"
        ).value;

        const data =
        JSON.parse(
            localStorage.getItem("wishes")
        ) || [];

        data.push({
            name,
            status: attendance,
            message
        });

        localStorage.setItem(
            "wishes",
            JSON.stringify(data)
        );

        form.reset();

        renderWishes();

    }
);

renderWishes();

/* ==========================
   RIPPLE EFFECT
========================== */

const rippleButtons =
document.querySelectorAll(
    ".open-btn,.submit-btn"
);

rippleButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(e){

            const ripple =
            document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
            this.getBoundingClientRect();

            ripple.style.left =
            e.clientX -
            rect.left +
            "px";

            ripple.style.top =
            e.clientY -
            rect.top +
            "px";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        }
    );

});

/* ==========================
   FLOWER EFFECT
========================== */

function createPetal() {

    const petal =
    document.createElement("div");

    petal.classList.add(
        "flower-petal"
    );

    petal.innerHTML = "❀";

    petal.style.left =
    Math.random() * 100 +
    "vw";

    petal.style.fontSize =
    (12 + Math.random()*22)
    + "px";

    petal.style.animationDuration =
    (8 + Math.random()*10)
    + "s";

    petal.style.color =
    "#c8daf0";

    document.body.appendChild(
        petal
    );

    setTimeout(() => {
        petal.remove();
    }, 18000);

}

function startFlowerEffect() {

    setInterval(() => {

        createPetal();

    }, 800);

}

/* ==========================
   PARTICLE CANVAS
========================== */

const canvas =
document.getElementById(
    "particles"
);

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let particles = [];

for(let i=0;i<70;i++){

    particles.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*3,

        dx:(Math.random()-.5)*0.4,

        dy:(Math.random()-.5)*0.4

    });

}

function animateParticles(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
        "rgba(200,218,240,.5)";

        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if(
            p.x < 0 ||
            p.x > canvas.width
        ) p.dx *= -1;

        if(
            p.y < 0 ||
            p.y > canvas.height
        ) p.dy *= -1;

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

window.addEventListener(
    "resize",
    () => {

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }
);

/* ==========================
   END SCRIPT
========================== */
