console.log('script.js ready!');

const container = document.getElementById('container');
const bouncer = document.createElement('div');
bouncer.id = 'bouncer'
bouncer.textContent = ` ^o^/ `;

container.appendChild(bouncer);

bouncer.style.position = 'relative';

let leftDistance = 0; //bouncer's distance from the left of the container
let rightDistance = container.offsetWidth - bouncer.offsetWidth; //distance from right

let topDistance = 0;
let bottomDistance = container.offsetHeight - bouncer.offsetHeight;


let moveDistance = 4 // number of pixels moved
let x = 'right'; // tracks horizontal motion
let y = 'down'; // tracks vertical motion

const delay = 15; // ms delay between iterations

//variables tracking if the bouncer touches the wall
let touchRight;
let touchLeft;
let touchTop;
let touchBottom; 

//variables used to track changes in viewport size
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;


// speed mode buttons 
const standardBtn = document.getElementById('standard');
const fastBtn = document.getElementById ('fast');
const pauseBtn = document.getElementById('pause');
let paused = false;
standardBtn.classList.add('pressed');

standardBtn.addEventListener('click', () => {
    moveDistance = 4
    standardBtn.classList.add('pressed');
    fastBtn.classList.remove('pressed');
});
fastBtn.addEventListener('click', () => {
    moveDistance = 24;
    standardBtn.classList.remove('pressed');
    fastBtn.classList.add('pressed');
});

//pause functionality
pauseBtn.addEventListener('click', () => {
    if (!paused) {
        pauseBtn.classList.add('pressed');
        paused = true;
        pauseBtn.textContent = '>'
    } else {
        pauseBtn.classList.remove('pressed');
        paused = false;
        pauseBtn.textContent = '||';
        movement(); //reinitiate the loop
        
    }
})


function movement () {
    //horizontal motion
    if (x === 'right') { //moving right
        touchLeft = false;
        if (rightDistance > moveDistance) {
            
            //update stored position
            leftDistance = leftDistance + moveDistance;
            rightDistance = rightDistance - moveDistance;
            //update displayed position
            moveBoxX()
        } else {
            x = 'left';
            touchRight = true;
        }
    } else { //moving left
        touchRight = false;
        if (leftDistance > 0) {
            //update stored position
            leftDistance = leftDistance - moveDistance;
            rightDistance = rightDistance + moveDistance;
            moveBoxX();
        } else {
            x = 'right';
            touchLeft = true;
        }
    }

    //vertical motion
    if (y === 'down' ) { //moving down
        touchTop = false;
        if (bottomDistance > moveDistance) {
            //update stored position
            topDistance = topDistance + moveDistance;
            bottomDistance = bottomDistance - moveDistance;
            //update displayed position
            moveBoxY();
        } else {
            y = 'up';
            touchBottom = true;
        }
    } else { //moving up
        touchBottom = false;
        if (topDistance > 0) {
            //update stored position
            topDistance = topDistance - moveDistance;
            bottomDistance = bottomDistance + moveDistance;
            //update displayed position
            moveBoxY();
        } else {
            y = 'down';
            touchTop = true;
        }
    }

    //check if a corner has been touched 

    const cornerText = document.createElement('span'); // to be added if corner is achieved
    cornerText.textContent = 'TRUE CORNER ACHIEVED!!!';

    if (
        (touchTop && touchLeft) ||
        (touchTop && touchRight) ||
        (touchBottom && touchLeft) ||
        (touchBottom && touchLeft) 
    ) {
        console.log('TRUE CORNER!!!');
        container.after(cornerText);
    }    
        
    // detect change in container dimensions
    if (containerWidth !== container.offsetWidth) {
        containerWidth = container.offsetWidth;
        rightDistance = containerWidth - (leftDistance + bouncer.offsetWidth);
        if (rightDistance < 0) {
            rightDistance = 0;
            leftDistance = containerWidth - bouncer.offsetWidth;
        }
    }
    if (containerHeight !== container.offsetHeight) {
        containerHeight = container.offsetHeight;
        bottomDistance = containerHeight - (topDistance + bouncer.offsetHeight);
        if (bottomDistance < 0) {
            bottomDistance = 0;
            topDistance = containerHeight - bouncer.offsetHeight;
        }
    }
    

    function moveBoxX() {
        bouncer.style.left = `${leftDistance}px`;
    }
    
    function moveBoxY() {
        bouncer.style.top = `${topDistance}px`;
    }

    setTimeout(() => {
        if (!paused) {
            movement(); // looping every iteration
        }
    }, delay);
}
movement(); // initiating the loop





