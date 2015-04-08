var secondsLeft = localStorage['secondsLeft'] ? parseInt(localStorage['secondsLeft']) : 300,
    submitButton = document.getElementById('submit'),
    stopTimer,
    answer1 = '1',
    answer2 = '3',
    answer3 = '2';

if(localStorage['results']) {
    if(localStorage['submitted']) {
        submitButton.disabled = true;
        printResults(JSON.parse(localStorage['results']));
    }
    loadResults(JSON.parse(localStorage['results']));
}

document.getElementById('timer').innerHTML = Math.floor(secondsLeft / 60) + ':' + secondsLeft % 60;
if(!localStorage['submitted']) {
    stopTimer = setInterval(updateTime, 1000);
}

function updateTime() {
    secondsLeft--;
    if(secondsLeft === 0) {
        clearInterval(stopTimer);
        submitButton.disabled = true;
    }
    document.getElementById('timer').innerHTML = Math.floor(secondsLeft / 60) + ':' + secondsLeft % 60;
}

submitButton.addEventListener('click', function() {
    rememberResults();
    printResults(JSON.parse(localStorage['results']));
    localStorage['submitted'] = true;
    clearInterval(stopTimer);
    submitButton.disabled = true;
});

window.addEventListener('beforeunload', function() {
    rememberResults();
    localStorage['secondsLeft'] = secondsLeft;
});

function rememberResults() {
    var results = {};
    results['answer1'] = getAnswer(document.getElementsByName('question1'));
    results['answer2'] = getAnswer(document.getElementsByName('question2'));
    results['answer3'] = getAnswer(document.getElementsByName('question3'));

    localStorage['results'] = JSON.stringify(results);

    function getAnswer(elements) {
        for(var i in elements) {
            if(elements[i].checked) {
                return elements[i].value;
            }
        }
    }   
}

function printResults(results) {
    var resultsSection = document.getElementById('results');

    resultsSection.innerHTML = 'Question 1: ' + (results['answer1'] === answer1) + '<br>';
    resultsSection.innerHTML += 'Question 2: ' + (results['answer2'] === answer2) + '<br>';
    resultsSection.innerHTML += 'Question 3: ' + (results['answer3'] === answer3) + '<br>';
}

function loadResults(results) {
    check(document.getElementsByName('question1'), results['answer1']);
    check(document.getElementsByName('question2'), results['answer2']);
    check(document.getElementsByName('question3'), results['answer3']);

    function check(elements, value) {
        for(var i in elements) {
            if(elements[i].value === value) {
                elements[i].checked = true;
                break;
            }
        }
    }
}


