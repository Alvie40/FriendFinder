
var newFriend = {};
var bestFriend = {
	diff: 100,
	name: "",
	image: ""
};

function findFriend(scores) {

	$.get('/api/friends', (friends) => {

		var count = 0;
        var arrayLength = friends.length;

		for (var i = 0; i < arrayLength; i++) {
            console.log("name:"+friends[i].name);
            var diff = calcScoreDiff(scores, friends[i].scores);
            if(diff < bestFriend.diff){
                bestFriend.diff = diff;
                bestFriend.name = friends[i].name;
                bestFriend.image = friends[i].photo;
            }
			count++;		
		}		

		if (count === arrayLength) {
			$('#friendName').text(bestFriend.name);
			$('#friendImg').attr('src', bestFriend.image);
			$('#myModal').modal('toggle');
		}
	});	
}



function calcScoreDiff(scores, friend) {

	var diff = 0;
	var count = 0;

	for (var i = 0; i < 10; i++) {
		diff += Math.abs(scores[i] - friend[i]);
		count++;
	}
    console.log("difference: "+diff+"   bestFriend difference: "+bestFriend.diff);
    return diff;

}



$('#submit').on('click', () => {
	var userName = $('#name').val().trim();
	var imag = $('#image').val().trim();
	var ans1 = $('#q1').val().trim();
	var ans2 = $('#q2').val().trim();
	var ans3 = $('#q3').val().trim();
	var ans4 = $('#q4').val().trim();
	var ans5 = $('#q5').val().trim();
	var ans6 = $('#q6').val().trim();
	var ans7 = $('#q7').val().trim();
	var ans8 = $('#q8').val().trim();
	var ans9 = $('#q9').val().trim();
	var ans10 = $('#q10').val().trim();

	if (userName === "" || imag === ""){
		alert("Name and image URL are both required");
	}else if(ans1 === "" || 
			 ans2 === "" || 
			 ans3 === "" || 
			 ans4 === "" || 
			 ans5 === "" ||
			 ans6 === "" ||
			 ans7 === "" ||
			 ans8 === "" ||
			 ans9 === "" ||
			 ans10 === ""
	) {
		alert("Please answer all questions");	
	} else {
		newFriend = {
			name: userName,
			photo: imag,
			scores: [ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10]
		};

		findFriend(newFriend.scores);

		setTimeout(postData, 2000);

		function postData() {
			$.post({url: '/api/friends', contentType: 'application/json'}, JSON.stringify(newFriend));
		}

		$('#name').val("");
		$('#image').val("");
		$('#q1').val("");
		$('#q2').val("");
		$('#q3').val("");
		$('#q4').val("");
		$('#q5').val("");
		$('#q6').val("");
		$('#q7').val("");
		$('#q8').val("");
		$('#q9').val("");
		$('#q10').val("");
	}
});



