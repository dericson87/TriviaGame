$(document).ready(function () {


    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: "What is Tiger's first name?",
        q2: 'What color does Tiger like to wear on Sunday?',
        q3: 'How many PGA tour victories does Tiger have?',
        q4: 'What is the most number of PGA tour wins Tiger has had in a year?',
        q5: "What is the longest consecutive streak Tiger has playing PGA tour events without missing the cut?",
        q6: 'How many majors has Tiger won?',
        q7: "How many hole in ones has Tiger made in professional events?"
    },
    options: {
        q1: ['Willie', 'Jermaine', 'Eldrick', 'Gordo'],
        q2: ['White', 'Blue', 'Black', 'Red'],
        q3: ['65', '70', '75', '80'],
        q4: ['8', '9', '10', '11'],
        q5: ['102', '75', '142', '25'],
        q6: ['13', '16', '17', '20'],
        q7: ['16', '17', '19', '18']
    },
    answers: {
        q1: 'Eldrick',
        q2: 'Red',
        q3: '80',
        q4: '9',
        q5: '142',
        q6: '17',
        q7: '19'
    },

    startGame: function () {

        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);


        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();

    },

    nextQuestion: function () {


        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);


        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }


        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);


        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-default btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Pick faster! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        } else if (trivia.currentSet === Object.keys(trivia.questions).length) {


            $('#results')
                .html('<h3>Thanks for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Hopefully you learned some useless knowledge about Tiger today.</p>');


            $('#game').hide();


            $('#start').show();
        }

    },

    guessChecker: function () {


        var resultId;


        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


        if ($(this).text() === currentAnswer) {

            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct!</h3>');
        } else {

            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>What were you thinking?! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}