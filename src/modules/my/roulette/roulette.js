import { LightningElement, track, api } from 'lwc';

export default class Roulette extends LightningElement {
    @api bullets = [{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}];
    selectBullet = false;
    bulletFired;
    bulletSelected;
    @track shotsFired = 0;

    @track currentScore = 0;

    @track time = "";
    msec = 0;
    sec = 0;
    min = 0;
    mytime = null;

    trigger;
    myModal;

    pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    endGame() {
        this.stopTimer(this.mytime);
        this.showModal();
    }

    resetGame() {
        this.hideModel();
        this.trigger.disabled = true;
        this.time = "";
        this.msec = 0;
        this.sec = 0;
        this.min = 0;
        this.mytime = null;
        this.selectBullet = false;
        this.shotsFired = 0;
        this.currentScore = 0;
    }
    
    get allBulletsClass() {
        let currClass = "sub"
        if (this.selectBullet) {
            return currClass + " bullet-disabled";
        }
        return currClass;
    }

    handleBulletSelected(evt) {
        //console.log('Current value of the bullet', evt.target, evt.target.textContent);
        this.startTimer();
        this.selectBullet = true;
        this.bulletFired = parseInt(evt.target.textContent, 10);
        this.bulletSelected = evt.target;
        this.bulletSelected.classList.add('slot-selected');
        this.trigger.disabled = false;
    }

    handleShoot() {
        let randomBullet;
        let selectedBullet = this.bulletSelected;

        randomBullet = this.bullets[Math.floor(Math.random() * this.bullets.length)];
        if (this.selectBullet === true) {
            this.trigger.disabled = true;

            //makes the bullet blinks when it is pulled
            selectedBullet.classList.add('bullet-fired');
            setTimeout(function () {
                selectedBullet.classList.remove('bullet-fired', 'slot-selected');
            }, 500);

			//checks to see if bullet selected matches a random number in the array
            if (randomBullet.key !== this.bulletFired) {
                this.shotsFired += 1;
                this.currentScore += (this.shotsFired * 5) + 100;
            } else {
                this.endGame();
            }
            this.selectBullet = false;
            //console.log(randomBullet, this.bulletFired, this.currentScore);
        } else {
            this.trigger.disabled = true;
        }
    }

    handleNewGame() {
        this.resetGame();
    }

    timer() {
        this.msec += 1;
        if (this.msec === 60) {
            this.sec += 1;
            this.msec = 0;
            if (this.sec === 60) {
                this.sec = 0;
                this.min += 1;
            }
        }
        this.time = this.pad(this.min) + ":" + this.pad(this.sec) + ":" + this.pad(this.msec);
    }

    startTimer() {
        if (!this.mytime) {
            this.trigger = this.template.querySelector('.shoots');
            this.myModal = this.template.querySelector('.modal');
        
            let localThis = this;
            this.mytime = setInterval(function() { localThis.timer(); }, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.mytime);
        this.mytime = null;
    }

    showModal() {
        this.myModal.style.display = "block";
    }

    hideModel() {
        this.myModal.style.display = "none";
    }
}

/*


function blinking(){
   myModal.classList.toggle('animate-modal');
}
//Modal functions that pops up when the game ends
function modal() {
    var blink = setInterval(blinking, 200);
    restart.addEventListener('click', function (evt) {
        if (evt.target.tagName === 'P') {
            myModal.style.display = "none";
            location.reload();
        }
    });


    //exit the modal stage when click anywhere
    window.addEventListener('click', modalEvent);
}
});

*/