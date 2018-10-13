
var char = '';
var myAttack = '';
var counter = '';
var health = '';
var opponent = '';
var opp_health = '';


var all = {"obi": ["Obi-wan Kenobi",8,7,120,"assets/images/obi.jpeg"], 
        "luke":["Luke Skywalker",10,5,100,"assets/images/luke.jpg"],
        "sid":["Darth Sideous",7,20,150,"assets/images/sid.jpg"], 
        "maul":["Darth Maul",4,25,180,"assets/images/maul.jpg"]};

var defeated = [];

function reset(){
    for(i=0; i<defeated.length; i++){
        var healthDiv = $('<div>');
        healthDiv.addClass('health');
        healthDiv.addClass(defeated[i] +"-health");
        healthDiv.text(all[defeated[i]][3]);

        var newDiv = $('<div>');
        newDiv.addClass('chars');
        newDiv.attr('id', defeated[i]);
        newDiv.text(all[defeated[i]][0]);
        newDiv.append("<img src=" + all[defeated[i]][4] + ">");
        newDiv.append(healthDiv);

        $(".options").append(newDiv);
    }
    $("."+char+"-health").text(all[char][3]);
    $("."+opponent+"-health").text(all[opponent][3]);
    $(".options").append($("#"+char));
    $(".options").append($("#"+opponent));
    $(".top-row").append($(".options"));
    $(".chars").css({"background-color":"white",
                            "border-color":"darkgreen",
                        "color":"black"});
    char = '';
    myAttack = '';
    health = '';
    opponent = '';
    counter = '';
    opp_health = '';
    defeated = [];
    $(".reset").remove()
    console.log(char);
    console.log(opponent);
    
}


$(document).ready(function() {

    //$(this).css({"border-color": "#C1E0FF", 
    //         "border-width":"1px", 
    //         "border-style":"solid"});

    $(".options").on("click", ".chars", function() {
        console.log(this.id);
        if(char === ''){
            char = this.id;
            health = all[char][3];
            myAttack = all[char][1];
            $(".chars").css({"background-color":"red",
                            "border-color":"black"});
    
            $("#"+this.id).css({"background-color": "white",
                                "border-color":"darkgreen"});
            $("#character").append($("#"+this.id));
            $("#chooseEnemy").append($(".options"));
        } else if(char != '' && opponent === ''){
            opponent = this.id;
            opp_health = all[opponent][3];
            counter = all[opponent][2];
            $("#defender").append($("#"+this.id));
            $("#"+this.id).css({"background-color": "black",
                                "color":"white"});
        }
    });

    $(".attack").on("click", function() {
        if(char=='' || opponent ==''){
            $(".statement1").text("Select characters");
        }
        if(char != '' && opponent != '' && opp_health>0 && health>0){
            opp_health -= myAttack;
            if(opp_health<=0){
                defeated.push(opponent);
                $("#"+opponent).remove();
                if(defeated.length == 3){
                    $(".statement1").text("You have defeated " +all[opponent][0] +". Game over. YOU WIN!")
                    $(".statement2").text("");
                    var newbutton = $("<button class='reset'>" + "Reset" + "</button>") 
                    $("#defender").append(newbutton);
                    $(".reset").on("click", function(){
                        reset();
                    })
                }else{
                    $(".statement1").text("You have defeated " +all[opponent][0] +". You can choose to fight another enemy.")
                    $(".statement2").text("");
                    opponent = '';
                    myAttack +=all[char][1];
                    
                }  
            } else{
                health -=counter;
                if(health<=0){
                    $("."+char+"-health").text(health);
                    $(".statement1").text("You have been defeated. GAME OVER!");
                    $(".statement2").text("");
                    var newbutton = $("<button class='reset'>" + "Reset" + "</button>") 
                    $("#defender").append(newbutton);
                    $(".reset").on("click", function(){
                        reset();
                    })
                } else{
                    $(".statement1").text("You attacked "+all[opponent][0]+" for "+myAttack+" Damage!");
                    $(".statement2").text(all[opponent][0]+" Attacked you "+"for "+counter+" Damage!");
                    $("."+char+"-health").text(health);
                    $("."+opponent+"-health").text(opp_health);
                    myAttack +=all[char][1];
                }   
            }
        }
    });
});
//operator = $(this).val();


//$(".btn").on('click', function(e) {
//    let btn = e.target.innerHTML;
//    console.log(btn);
//    if (btn >= '0' && btn <= '9') {
//        handleNumber(btn);
//       
//    } else if (btn != "=") {
//        handleOperator(btn);
//    } else if (btn === "="){ //How to get the function to operate
//        handleTotal(opp);
//       // handleOperator(btn);
//
//    } else{ 
//
//    }
//});
