// Global Variables
var first_card_clicked=null;
var second_card_clicked=null;
var total_possible_matches=9;
var match_counter=0;
var flipped=false;
var matches=0;
var attempts=0;
var accuracy=0;
var games_played=0;


// on docready
$(document).ready(function () {
    console.log(total_possible_matches);
    display_stats();
    // When a card is clicked...
    $('.card').click(function(){
        card_clicked(this)
    });
    // Reset Button
    $('.reset').click(function () {
        games_played++;
        display_stats();
        reset_stats();
        console.log('games played: '+ games_played)
    });
//
});

function card_clicked(card) {
    // hide the back (the front is already "showing" but is blocked by back)
    if(flipped==true){
        return;
    }
    $(card).find('.back').hide();
    //if the first card has a value equal to null, assign it the value of the card clicked, and console log what "this" is to make sure I'm targeting correctly. Then return.
    if (first_card_clicked == null) {
        first_card_clicked = $(card);
        console.log(card);
        return;
    }
    //    if first card isn't null, ie was already assigned a value, then second card is assigned the value of card clicked instead. console log the two values.
    else {
        second_card_clicked = $(card);
        flipped=true;
        attempts++;
        console.log('attempts: ' + attempts);
        console.log('first card is ', first_card_clicked, 'second card is ', second_card_clicked);
        //if the two cards have equal .front img src attributes, then up the match_counter by 1, console log the new total, reset first/second cards to null, and if total matches possible and match_count are equal in value, send out an alert to say the game is over. Otherwise just return.
        if (first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')) {
            match_counter++;
            matches++;
            console.log('match counter: ' + match_counter);
            console.log('matches: ' + matches);
            first_card_clicked = null;
            second_card_clicked = null;
            flipped=false;
            display_stats();
            if (match_counter == total_possible_matches) {
                alert('GAME!');
            }
            else {
                return;
            }
        }
        //    if the cards dont match show the backs again and reset the values of first/second cards clicked to null, after 2 seconds
        else {
            display_stats();
            setTimeout(function () {
                $(first_card_clicked).find('.back').show();
                $(second_card_clicked).find('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;
                flipped=false;
            }, 2000);
            return;
        }
    }
}
//For displaying stats
function display_stats(){
    calc_acc();
    $('.games_played .value').html(games_played);
    $('.attempts .value').html(attempts);
    $('.accuracy .value').html(accuracy + '%');
    console.log('accuracy: ' +accuracy)
}

function calc_acc(){
    if(attempts != 0){
        accuracy = (matches/attempts) * 100;
        return null;
    }
}
function reset_stats(){
    accuracy=0;
    matches=0;
    attempts=0;
    display_stats();
}