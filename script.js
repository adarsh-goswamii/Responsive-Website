function init() {
    // alert("hii");
    let currPageNo= 0;
    const slides = document.querySelectorAll('.slide');
    const pages= document.querySelectorAll('.page');
    background= [ 'radial-gradient(#2B3760, #0B1023)', 
                'radial-gradient(#4a1e0d, #260b01)', 
                'radial-gradient(#adb5bd, #212529)' ]; 

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            changeDots(this); // here this basically points to the slide we just clicked
            changeSlide(index);
        });
    });

    function changeDots(dot) {
        slides.forEach(slide=> {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    function changeSlide(pageNo) {
        const loadPage= pages[pageNo];
        const currPage= pages[currPageNo];

        let loadImgLeft= loadPage.querySelector('.hero .model_left');
        let loadImgRight= loadPage.querySelector('.hero .model_right');
        let currImgLeft= currPage.querySelector('.hero .model_left');
        let currImgRight= currPage.querySelector('.hero .model_right');
        let loadText= loadPage.querySelector('.details');
        let portfolio= document.querySelector('.portfolio');
        // prompt(currPage+" "+currImgLeft+" "+currImgRight);

        const t1= new TimelineMax();
        t1.fromTo(currImgLeft, 0.3, {y: '-10%'}, {y: '-100%'})
        .fromTo(currImgRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, {backgroundImage: background[pageNo]})
        .fromTo(currPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity:0, pointerEvents:'none'})
        .fromTo(loadPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents:'all'}, '-=0.5')
        .fromTo(loadImgLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.5')
        .fromTo(loadImgRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.7')
        .fromTo(loadText, 0.3, {opacity: 0, y: 30}, {opacity: 1, y: 0})
        .set(loadImgLeft, { clearProps: 'all' })
        .set(loadImgRight, { clearProps: 'all' });
        // most of the part is self-explanatory but the -=0.2 parameter has been added as
        // initially first currImgLeft animation will occur for 0.3 and then currImgRight 
        // animation will occur but we dont want that time delay and wish it to start after 0.1
        currPageNo= pageNo;
    }
}

init();

