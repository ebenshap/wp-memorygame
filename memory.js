//start of memory utility functions
var memoryGame={
//Relates to first page

gameForm:function(Name){

	var form=document.createElement('form');
	form.setAttribute('name', 'form1');
	form.setAttribute('id', 'form1');
//create input for name and instructions
	var inName=document.createElement('input')
	inName.setAttribute('type', 'text')
	inName.setAttribute('name', 'Name')
	inName.size=15
	if(Name !=undefined){
		inName.setAttribute('value', Name)		
	}

	var nameT=document.createTextNode("Please enter your name: ");	
	var nameP=document.createElement('p');
	nameP.appendChild(nameT)
	nameP.appendChild(inName)

//append question about name to form
	form.appendChild(nameP)

//create input for level and instructions
	var diffT=document.createTextNode("Please select your level of difficulty: ");	
	var diffP=document.createElement('p');
	diffP.appendChild(diffT);

	var select=document.createElement('select')
	select.setAttribute('name', 'level')
	select.setAttribute('id', 'level')

	var option1=document.createElement('option')
	option1.setAttribute('value', '6')
	var option1T=document.createTextNode('Easy');
	option1.appendChild(option1T);

	var option2=document.createElement('option')
	option2.setAttribute('value', '9')
	var option2T=document.createTextNode('Medium');
	option2.appendChild(option2T);

	var option3=document.createElement('option')
	option3.setAttribute('value', '12')
	var option3T=document.createTextNode('Hard');
	option3.appendChild(option3T);

	select.appendChild(option1)
	select.appendChild(option2)
	select.appendChild(option3)

	diffP.appendChild(select)

//append question about level to form
	form.appendChild(diffP);

//Create submission button
	var submit=document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('value', 'Play!');
	submit.setAttribute('name', 'button');
	
	form.appendChild(submit)

	submit.onclick=function(){
		var result=memoryGame.valGameForm(inName.value, select.value);
		if(result==false)
		{
			nameP.style.color='red';
		}
		else
		{
			memoryGame.setCookie(result)
			var urlString='?stage=middle'
			if (memoryGame.pageId!='undefined')
			{
				urlString+='&page_id='+memoryGame.pageId
			}
			document.location.href=urlString;
		}
		return false		
	}	

	return form
},

valGameForm:function(Name, Level)
{
	if(Name!='')
	{
		if(Level==6||Level==9||Level==12)
		{
			return gameArray=new Array(Name, Level);
		}
		else
		{
			return gameArray=new Array(Name, 6);
		}
	}
	else
	{
		return false;
	}
},

intro:function(){

	var form=memoryGame.gameForm();
	var memory=document.getElementById('memory');
	if(memory){
		var intro=document.createElement('div')
		intro.setAttribute('id', 'intro');
	
		var heading=document.createElement('h1')
		var headingT=document.createTextNode('Memory?')
		heading.appendChild(headingT);

		intro.appendChild(heading)
		intro.appendChild(form)
		memory.appendChild(intro)
	}
},

//relates to second page
//Define the Globals
counter:0,
guess:0,
imgClicked:0,
imgClicked:2,
finalArray:'',
matches:0,

checkLevelNotEmpty:function(){
	
	if (memoryGame.getCookie('level')=='')
	{
		var urlString='?stage=start'
			if (memoryGame.pageId!='undefined')
			{
				urlString+='&page_id='+memoryGame.pageId
			}
			document.location.href=urlString;
	} 
},

loadImages:function(){
	var absUrl=memParams.absUrl+'images';
	
	image1 =new Image();
	image1.src=absUrl+"/1.jpg"
	image2 =new Image();
	 image2.src=absUrl+"/2.jpg"
	 image3 =new Image();
	 image3.src=absUrl+"/3.jpg"
	 image4 =new Image();
	 image4.src=absUrl+"/4.jpg"
	 image5 =new Image();
	 image5.src=absUrl+"/5.jpg"
	 image6 =new Image();
	 image6.src=absUrl+"/6.jpg"
	 image7 =new Image();
	 image7.src=absUrl+"/7.jpg"
	 image8 =new Image();
	 image8.src=absUrl+"/8.jpg"
	 image9 =new Image();
	 image9.src=absUrl+"/9.jpg"
	 image10 =new Image();
	 image10.src=absUrl+"/10.jpg"
	 image11 =new Image();
	 image11.src=absUrl+"/11.jpg"
	 image12 =new Image();
	 image12.src=absUrl+"/12.jpg"

	 image15 =new Image();
	 image15.src=absUrl+"/deck.jpg"
	 image16 =new Image();
	 image16.src=absUrl+"/star.jpg"
},

start:0,

showGame:function(){

	memoryGame.checkLevelNotEmpty();
	var absUrl=memParams.absUrl;
	
	var level=memoryGame.getCookie('level')
	var chuck=memoryGame.createArray(level);

	memoryGame.start= new Date(); 
	document.cookie='start='+(memoryGame.start.getTime());	

	var what2=level*2;
	var rowLength=(what2/3);
	var middle=document.createElement('div');
	middle.setAttribute('id', 'middle')
	
	if(level==6)
	{
		middle.style.width='416px';
	}

	else if(level==9)
	{
		middle.style.width='624px';
	}

	else if(level==12)
	{
		middle.style.width='832px';
	}
 
	for (cards=0; cards<what2; cards++)
	{

		if (cards==rowLength|| cards==(rowLength*2))
		{
			var oBr=document.createElement("br");
			middle.appendChild(oBr);
		}
		var span=document.createElement("span");
		var oImg=document.createElement("img");
		oImg.src = absUrl+'images/deck.jpg';
		oImg.name = 'img'+cards;
		oImg.cardNum=cards
		var immediate=
		oImg.onclick=(function(){
			//use an immediate function so that the onclick function has it's own copy of the card value.
			//the one just outside of it's scope will get changed by the loop
			var card=cards
			return function(){
				return memoryGame.compareImg(card);
			}
		})()
		span.appendChild(oImg)
		middle.appendChild(oImg);
	}

	document.getElementById('memory').appendChild(middle)

},

createArray:function (numOfPics)
{
	var randNum=0
	var counter=new Array();
	var finalArray=new Array();

	for(i=0; i<numOfPics;i++)
	{
		counter[i]=0
	}
	
	for(i=0; i<numOfPics*2;i++)
	{
		randNum= Math.floor(Math.random()*numOfPics)
		if(counter[randNum]<2)
		{		
			counter[randNum]++
			finalArray[i]=randNum
		}
		else
		{
			i--
		}
	}
	memoryGame.finalArray=finalArray;
},

compare:function(a,b)
{
	return a-b;
},

timedMsg:function()
{
	setTimeout("memoryGame.replaceImg()",700);
},

/* This array will compare the two numbers choosen by the user
this is the function that runs the page  */

//this function  uses
compareImg:function(imgNumber)
{
	memoryGame.guess++;
	var test=document.getElementById('middle').getElementsByTagName('img')[imgNumber];

	var imgC=test.src;
	imgC= imgC.substr(imgC.lastIndexOf("/")+1);

// This conditional sees whether the user has chosen the first or second picture. -->
	
	if (imgC == "deck.jpg"&& memoryGame.counter<2)
	{		
			test.src=memParams.absUrl+'images/'+(memoryGame.finalArray[imgNumber]+1)+'.jpg'
			memoryGame.counter++;
			if(memoryGame.counter==1)
			{
				memoryGame.imgClicked=imgNumber;
			}
			else if(memoryGame.counter==2)
			{
				memoryGame.imgClicked2=imgNumber;
				memoryGame.timedMsg();				
			}
/* if there is no match then the images will go back to that of the back of the deck of cards. */

	}
},

replaceImg:function(){
	var absUrl=memParams.absUrl;
	
	if (memoryGame.finalArray[memoryGame.imgClicked2]+1!=memoryGame.finalArray[memoryGame.imgClicked]+1)	
	{
		document.getElementById('middle').getElementsByTagName('img')[memoryGame.imgClicked].src=absUrl+"images/deck.jpg";
		document.getElementById('middle').getElementsByTagName('img')[memoryGame.imgClicked2].src=absUrl+"images/deck.jpg";
		
		memoryGame.counter=0;
	}
	else
	{
		document.getElementById('middle').getElementsByTagName('img')[memoryGame.imgClicked].src=absUrl+"images/star.jpg";
		document.getElementById('middle').getElementsByTagName('img')[memoryGame.imgClicked2].src=absUrl+"images/star.jpg";
		memoryGame.matches++;
		memoryGame.counter=0;
		if (memoryGame.matches==memoryGame.getCookie('level'))
		{
			end=new Date();
			startTime=memoryGame.start.getTime();
			endTime=end.getTime();
			var time=endTime-startTime;

			document.cookie="mtime="+(time/1000);
			document.cookie="guesses="+memoryGame.guess;
			var urlString='?stage=end'
			if (memoryGame.pageId!='undefined')
			{
				urlString+='&page_id='+memoryGame.pageId
			}
			document.location.href=urlString;
			
		}
	}	
},
//Last page ---------------------------------------------------------
getStats:function()
{
	var everything2;
	var check;


	if (memoryGame.getCookie('everything')!='undefined')
	{
		var everything2= memoryGame.getCookie('everything');
	}

	memoryGame.guess=memoryGame.getCookie('guesses');
	memoryGame.name=memoryGame.getCookie('name');
	memoryGame.level=memoryGame.getCookie('level');
	var time=memoryGame.getCookie('mtime');
	memoryGame.start=memoryGame.getCookie('start');

	if (memoryGame.level==6)
	{
		memoryGame.level="easy"
	}
	else if (memoryGame.level==9)
	{
		memoryGame.level="medium"
	}
	else{
		memoryGame.level="hard"
	}

	if (everything2!=undefined)
	{
		var everything=everything2+memoryGame.name+"+"+memoryGame.guess+"+"+memoryGame.level+"+"+time+"+";

	}
	else
	{
		var everything=memoryGame.name+"+"+memoryGame.guess+"+"+memoryGame.level+"+"+time+"+";
	}

	if (memoryGame.start!=0)
	{
		document.cookie="everything="+everything;
	}
	return new Array(everything, everything2)
},

showScore:function()
{
	var memory=document.getElementById('memory')

	var tbody=document.createElement('tbody')
	var end=document.createElement('div');
	end.id= 'end';
	
	var greeting=document.createElement('p')
	greeting.className = 'greetings'

	var scores=memoryGame.getStats()
	
	var greetingT=document.createTextNode("Hello "+memoryGame.name+". It took you " +memoryGame.guess+" guesses playing the "+memoryGame.level+" level.");

	greeting.appendChild(greetingT)
	//append the greeting
	end.appendChild(greeting)

	var currentScore=scores[0].split("+");
	var pastScores=scores[1].split("+");
	
	var scoreTable=document.createElement('table');
	var header=document.createElement('tr');
	header.className = 'table_header';

	var colName=document.createElement('td')
	var colNameT=document.createTextNode('Name')
	colName.appendChild(colNameT)

	var colGuess=document.createElement('td')
	var colGuessT=document.createTextNode('Guesses')
	colGuess.appendChild(colGuessT)

	var colLevel=document.createElement('td')
	var colLevelT=document.createTextNode('Level')
	colLevel.appendChild(colLevelT)

	var colTime=document.createElement('td')
	var colTimeT=document.createTextNode('Time in Seconds')
	colTime.appendChild(colTimeT)

	header.appendChild(colName)
	header.appendChild(colGuess)
	header.appendChild(colLevel)
	header.appendChild(colTime)
	
	//append header
	tbody.appendChild(header)
	
	//the first row is created
	var row=document.createElement('tr')

	if (memoryGame.start!=0){
		
		for(a=0; a<currentScore.length-1; a++){
					
			var cell=document.createElement('td')
			var cellT=document.createTextNode(currentScore[a]);
			cell.appendChild(cellT)
			row.appendChild(cell)
			
			//once you get to the end of the 
			if ((a+1)%4==0){
				row=document.createElement('tr')
			}
			tbody.appendChild(row)
		}

	}
	else{	
		for(a=0; a<pastScores.length-1; a++){

			var cell=document.createElement('td')
			var cellT=document.createTextNode(pastScores[a]);
			cell.appendChild(cellT)
			row.appendChild(cell)
			if ((a+1)%4==0){
				row=document.createElement('tr')
			}
			tbody.appendChild(row)
		}
	}
	//remove the last row appended, which should be empty
	tbody.removeChild(row)
	scoreTable.appendChild(tbody)
	end.appendChild(scoreTable)
	document.cookie="start="+0;
	
	var playAgain=document.createElement('p')
	var playAgainT=document.createTextNode('Would you like to play again? ')
	
	var playAgainY= document.createElement('input')
	playAgainY.setAttribute( 'type', 'radio')
	playAgainY.setAttribute( 'value', 'y')
	playAgainY.setAttribute( 'checked', '')
	playAgainY.setAttribute( 'name', 'playAgain')
	
	var playAgainYT=document.createTextNode('Yes ')
	
	var playAgainN= document.createElement('input')
	playAgainN.setAttribute( 'type', 'radio')
	playAgainN.setAttribute( 'value', 'n')
	playAgainN.setAttribute( 'checked', 'checked')
	playAgainN.setAttribute( 'name', 'playAgain')
	
	var playAgainNT=document.createTextNode('No')

	playAgain.appendChild(playAgainT)
	playAgain.appendChild(playAgainY)
	playAgain.appendChild(playAgainYT)
	playAgain.appendChild(playAgainN)
	playAgain.appendChild(playAgainNT)
//Add behavior to inputs
	end.appendChild(playAgain);

	 var form=memoryGame.gameForm(memoryGame.name);

	end.appendChild(form);

	form.style.display='none'

	playAgainN.onclick=function(){
		form.style.display='none'
	}
	
	playAgainY.onclick=function(){
		form.style.display='block'
	}
	
	memory.appendChild(end)	
},

//Utility functions to deal with query string and cookies
setCookie:function(array)
{
	if(array[0]!=''&& array[1]!='')
	{
		document.cookie="name="+array[0];
		document.cookie="level="+array[1];
	}
},

getCookie:function(name) 
{

	var cookieValue = '';
	
	var httpCookies = document.cookie;
	var allCookies = httpCookies + "; "
	
	var found = allCookies.indexOf(name);
	if (found >=0)
	{
		var beg= allCookies.indexOf("=", found) +1;
		var end = allCookies.indexOf(";", found);
		cookieValue= allCookies.substring(beg,end);
	}
	
	return cookieValue ;
},

parseQueryString:function()
{
	Location=document.location.toString()
	if(Location.lastIndexOf('?')!=-1)
	{
		string=(Location.substr(Location.lastIndexOf('?')+1))
	
		stringArray=string.split('&')
		return stringArray;
	}
	else{
		return false
	}
},
//
getQueryValue:function(value){
	var stage=''
	var page=''
	
	var QueryArray=memoryGame.parseQueryString();
	
	if(QueryArray){
		
		for(var i=0; i<QueryArray.length; i++)
		{
			if(QueryArray[i].substr(0,5)=='stage')
			{
				stage= QueryArray[i].substr(QueryArray[i].lastIndexOf('=')+1) 
			}
			else if(QueryArray[i].substr(0,7)=='page_id')
			{
			
				memoryGame.pageId=QueryArray[i].substr(QueryArray[i].lastIndexOf('=')+1)
			}
		}	
			
		if(stage)
		{
			return stage
		}
		else
		{
			return false
		}
		
	}else
	{
		return false
	}
}


}

function memoryGameFunction(){
	memoryGame.location=document.location.toString()
	
		memoryGame.loadImages();
		var level=memoryGame.getQueryValue()	
		if( level =='start'||level==false){
			
			memoryGame.intro();
		}
		else if(memoryGame.getQueryValue()=='middle')
		{
			memoryGame.showGame()
		}

		else if(memoryGame.getQueryValue()=='end')
		{
			memoryGame.showScore();
		}
		else
		{
			var urlString='?stage=start'
			if (memoryGame.pageId!='undefined')
			{
				urlString+='&page_id='+memoryGame.pageId
			}
			document.location.href=urlString;
		
		}
}

jQuery(window).load(memoryGameFunction)
