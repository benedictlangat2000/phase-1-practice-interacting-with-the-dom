document.addEventListener('DOMContentLoaded', function() {
    let counterValue = 0;
    let timer;
    let likes = {};

    const counterDisplay = document.getElementById('counter');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const pauseButton = document.getElementById('pause');
    const restartButton = document.getElementById('restart');
    const likesList = document.getElementById('likes');
    const commentInput = document.getElementById('comment');
    const submitCommentButton = document.getElementById('submitComment');

    // Function to update the counter display
    function updateCounter() {
        counterDisplay.textContent = counterValue;
    }

    // Function to handle incrementing the counter
    function incrementCounter() {
        counterValue++;
        updateCounter();
    }

    // Function to handle decrementing the counter
    function decrementCounter() {
        counterValue--;
        updateCounter();
    }

    // Function to handle liking a number
    function likeNumber() {
        if (!likes[counterValue]) {
            likes[counterValue] = 1;
        } else {
            likes[counterValue]++;
        }

        updateLikesList();
    }

    // Function to update the likes list
    function updateLikesList() {
        likesList.innerHTML = '';
        for (let number in likes) {
            const listItem = document.createElement('li');
            listItem.textContent = `${number}: ${likes[number]} Likes`;
            likesList.appendChild(listItem);
        }
    }

    // Function to handle pausing the counter
    function pauseCounter() {
        clearInterval(timer);
        plusButton.disabled = true;
        minusButton.disabled = true;
        pauseButton.textContent = 'Resume';
    }

    // Function to handle resuming the counter
    function resumeCounter() {
        timer = setInterval(incrementCounter, 1000);
        plusButton.disabled = false;
        minusButton.disabled = false;
        pauseButton.textContent = 'Pause';
    }

    // Function to handle restarting the counter
    function restartCounter() {
        counterValue = 0;
        updateCounter();
        likes = {};
        updateLikesList();
        resumeCounter();
    }

    // Event listeners for buttons
    plusButton.addEventListener('click', incrementCounter);
    minusButton.addEventListener('click', decrementCounter);
    pauseButton.addEventListener('click', function() {
        if (pauseButton.textContent === 'Pause') {
            pauseCounter();
        } else {
            resumeCounter();
        }
    });
    restartButton.addEventListener('click', restartCounter);
    submitCommentButton.addEventListener('click', function() {
        const commentText = commentInput.value;
        if (commentText.trim() !== '') {
            const commentDiv = document.createElement('div');
            commentDiv.textContent = commentText;
            document.body.appendChild(commentDiv);
            commentInput.value = '';
        }
    });

    // Start the timer
    timer = setInterval(incrementCounter, 1000);
});
