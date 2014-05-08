
var people=[];
var miles=new dude();
miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
people.push(miles);

camera.follow(miles);

document.body.addEventListener("click", mouseClick, false);
//document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);


//-----------------------------------------------


requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");

var sillycanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var sillycanvas = sillycanvasElement.get(0).getContext("2d");

var battleCanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var battleCanvas = battleCanvasElement.get(0).getContext("2d");

var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");

var mapCanvasElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "0").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
battleCanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.appendTo('body');
battleCanvasElement.appendTo('body');
canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

var gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];

window.addEventListener("MozGamepadConnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  e.gamepad.index, e.gamepad.id,
  e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("MozGamepadDisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
  e.gamepad.index, e.gamepad.id);
});


function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}

function akey(k) {  //represents a keyboard button
    k = k || "space";
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.desc="A small brown mushroom.";
    this.check= function(){
        if (keydown[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!keydown[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
    };
    this.checkDown= function(){
        if ((keydown[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!keydown[this.key]){
            this.dflag=false;
            return false;
        }
    };
    return this;
}

function aPadButton(k,pad) {  //represents a keyboard button
    k = k || 0;
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.parentPad=pad;
	this.desc="A small brown mushroom.";
    this.check= function(){
        if (this.parentPad.buttons[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!this.parentPad.buttons[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
    };
    this.checkDown= function(){
        /*if ((parentPad.buttons[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!parentPad.buttons[this.key]){
            this.dflag=false;
            return false;
        }*/
		if (this.parentPad.buttons[this.key] )
		{
			return true;
		}
		return false;
    };
    return this;
}

function virtualGamePad()
{
	this.buttons=[];
	this.dpad=[];
	this.pad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	this.dpad.push(this.pad.axes[0])
	this.dpad.push(this.pad.axes[1]);
	for(var i=0;i<this.pad.buttons.length;i++)
	{
		var daisy=new aPadButton(i,this.pad);
		this.buttons.push(daisy);
	}
	
}

virtualGamePad.prototype.update=function()
{
	this.pad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
};

curMap = new Map();
curMap.clear();

controller= new virtualGamePad(gamepad);

distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
}
time.prototype.update=function(){
    this.seconds++;
    if(this.seconds>60){
        this.seconds=0;
        this.minutes++;
        if (this.minutes>60){
            this.hours++;
            if(this.hours>24) {
				this.hours=0; 
				this.days++;
			} 
            this.minutes=0;
            this.seconds=0;
        }
    }
};

var theTime=new time();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var edskeys=[];

var pausekey=new akey("space");
pausekey.desc="Pause";
edskeys.push(pausekey);
var debugkey=new akey("l");
debugkey.desc="Debug key";
edskeys.push(debugkey);
var escapekey=new akey("esc");
escapekey.desc="Pause and bring up menu";
edskeys.push(escapekey);
var pageupkey=new akey("pageup");
pageupkey.desc="Nothing yet."
edskeys.push(pageupkey);
var pagedownkey=new akey("pagedown");
pagedownkey.desc="Nothing yet."
edskeys.push(pagedownkey);
var serversavekey=new akey("i");
serversavekey.desc="Server save, eventually."
edskeys.push(serversavekey);
var serverloadkey=new akey("k");
serverloadkey.desc="Server load, eventually."
edskeys.push(serverloadkey);
var upkey=new akey("up");
upkey.desc="Move camera"
edskeys.push(upkey);
var rightkey=new akey("right");
rightkey.desc="Move camera."
edskeys.push(rightkey);
var downkey=new akey("down");
downkey.desc="Move camera."
edskeys.push(downkey);
var leftkey=new akey("left");
leftkey.desc="Move camera."
edskeys.push(leftkey);

var zoomkey=new akey("z");
zoomkey.desc="Zoom";
edskeys.push(zoomkey);
var helpkey=new akey("h");
helpkey.desc="You just pressed it."
edskeys.push(helpkey);

var startkey=new akey("return");
pageupkey.desc="It's the fucking enter button."
edskeys.push(startkey);

var letterkeys=[];
letterkeys.push(new akey("a"));
letterkeys.push(new akey("b"));
letterkeys.push(new akey("c"));
letterkeys.push(new akey("d"));
letterkeys.push(new akey("e"));
letterkeys.push(new akey("f"));
letterkeys.push(new akey("g"));
letterkeys.push(new akey("h"));
letterkeys.push(new akey("i"));
letterkeys.push(new akey("j"));
letterkeys.push(new akey("k"));
letterkeys.push(new akey("l"));
letterkeys.push(new akey("m"));
letterkeys.push(new akey("n"));
letterkeys.push(new akey("o"));
letterkeys.push(new akey("p"));
letterkeys.push(new akey("q"));
letterkeys.push(new akey("r"));
letterkeys.push(new akey("s"));
letterkeys.push(new akey("t"));
letterkeys.push(new akey("u"));
letterkeys.push(new akey("v"));
letterkeys.push(new akey("w"));
letterkeys.push(new akey("x"));
letterkeys.push(new akey("y"));
letterkeys.push(new akey("z"));

var numberkeys=[];
numberkeys.push(new akey("0"));
numberkeys.push(new akey("1"));
numberkeys.push(new akey("2"));
numberkeys.push(new akey("3"));
numberkeys.push(new akey("4"));
numberkeys.push(new akey("5"));
numberkeys.push(new akey("6"));
numberkeys.push(new akey("7"));
numberkeys.push(new akey("8"));
numberkeys.push(new akey("9"));



function merp() {
requestAnimationFrame(merp,canvas);
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		mainUpdate();
		mainDraw();	
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{

    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

	bConsoleBox=new textbox();
	bConsoleBox.width=460;
	bConsoleBox.height=90;
	
	bConsoleBox.msg[0]=bConsoleStr[0+bConsoleBox.scroll];//[bConsoleStr.length-4];
	bConsoleBox.msg[1]=bConsoleStr[1+bConsoleBox.scroll];//[bConsoleStr.length-3];
	bConsoleBox.msg[2]=bConsoleStr[2+bConsoleBox.scroll];//[bConsoleStr.length-2];
	bConsoleBox.msg[3]=bConsoleStr[3+bConsoleBox.scroll];//[bConsoleStr.length-1];
	bConsoleBox.y=15;
	bConsoleBox.x=30;
	bConsoleBox.lines=4;
	

if(MUSIC_ON){
	document.getElementById("titleAudio").volume=MUSIC_VOL;
	document.getElementById("titleAudio").play(); //starts music
}

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "white";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Game",145,450);
	canvas.fillStyle = "grey";
	canvas.fillText("  Load Game",145,475);

	if(mmcur){
		canvas.fillText("-",130,450);
	}else	{
		canvas.fillText("-",130,475);

	}
	monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function mainMenuUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	
	controller.update();
	
	//gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	if(controller.pad)
	{
		if(controller.buttons[7].check())
		{
			mode=1;
			gamestart=true;
		}
	}
	
	if(startkey.check()){
		mode=1;
		gamestart=true;
	}
	if(downkey.check()){
		mmcur=!mmcur;
	}
	if(upkey.check()){
		mmcur=!mmcur;
	}
	
};

function reqsMet(dex){
	if(dex==0) {return true;}
	for(var i=0;i<maps[dex].numReqs;i++)
	{
		if(maps[maps[dex].preReq[i]].team==1)
		{
			return false;
		}
	}
	return true;
};


function worldMapDraw(){

};




function worldMapUpdate(){

};

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	curMap.draw(camera);
	for(var i=0;i<people.length;i++)
	{
		people[i].draw(canvas,camera);
	}
	monsta.draw(canvas,camera);
	
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	
	//console.log(gamepad.axes[0]);
	
	/*console.log(gamepad.buttons[0],gamepad.buttons[1],gamepad.buttons[2],gamepad.buttons[3],gamepad.buttons[4],gamepad.buttons[5],gamepad.buttons[6],gamepad.buttons[7],gamepad.buttons[8],gamepad.buttons[14],gamepad.buttons[15]);*/
	

	/*if(gamepad.buttons[0]===1)
	{
		console.log("zero");
	}
	if(gamepad.buttons[1]==1)
	{
		console.log("one");
	}
	if(gamepad.buttons[2]==1)
	{
		console.log("two");
	}*/
	if(controller.pad)
	{
		if(controller.buttons[0].check())
		{
			miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
			miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
			miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
		}
		
		if(controller.buttons[1].checkDown())
		{
			miles.crouching=true;
			console.log("couch");
		}else
		{
			miles.crouching=false;
		}
		if(controller.buttons[5].check())
		{
			miles.expression=Math.floor(Math.random()*4);
		}
		if(controller.buttons[4].check())
		{
			miles.hairSprites[0]=Sprite("hair"+Math.floor(Math.random()*5));
		}
	}
	if(debugkey.check())
	{
		miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
		miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
		miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
	}
	
	if(helpkey.check())
	{
		//stars[curSystem].planets[stars[curSystem].selected].orbitDecay=1;
		for(var i=0;i<edskeys.length;i++)
		{
			console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
		}
	}
	
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	camera.update();
	monsta.update();
	for(var i=0;i<people.length;i++)
	{
		people[i].update();
	}
	
	if(controller.pad)
	{
		if(controller.pad.axes[1]===-1)
		{
			miles.y-=miles.speed;
			if(miles.y<0) {miles.y=0;}
			mapDirty=true;
		}
		if(controller.pad.axes[1]===1)
		{
			miles.y+=miles.speed;
			if(miles.y>600) {miles.y=600;}
			mapDirty=true;
		}
		if(controller.pad.axes[0]===-1)
		{
			miles.x-=miles.speed;
			if(miles.x<0) {miles.x=0;}
			mapDirty=true;
		}
		if(controller.pad.axes[0]===1)
		{
			miles.x+=miles.speed;
			if(miles.x>600) {miles.x=600;}
			mapDirty=true;
		}
	}else
	{
		if(keydown.up)
		{
			miles.y-=miles.speed;
			if(miles.y<0) {miles.y=0;}
			mapDirty=true;
		}
		if(keydown.down)
		{
			miles.y+=miles.speed;
			if(miles.y>600) {miles.y=600;}
			mapDirty=true;
		}
		if(keydown.left)
		{
			miles.x-=miles.speed;
			if(miles.x<0) {miles.x=0;}
			mapDirty=true;
		}
		if(keydown.right)
		{
			miles.x+=miles.speed;
			if(miles.x>600) {miles.x=600;}
			mapDirty=true;
		}
	}
};
merp();
