var debugInfo=false;
var people=[];
var miles=new dude();
miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
miles.gun=miles.guns[0];
people.push(miles);
for(var i=0;i<12;i++)
{
	var giles=new dude();
	giles.x=Math.random()*219*16;
	giles.y=10;
	//giles.doGesture(GestureTypes.Dance,100000);
	giles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
	giles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
	giles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
	people.push(giles);
}

function allPoint(guy)
{
	for (var i=1;i<people.length;i++)
	{
		people[i].stopGesturing();
		people[i].doGesture(Math.floor(Math.random()*6),50000,miles);
		//console.log(":yar:");
	}
}

//camera.center(miles);
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

window.addEventListener("GamepadConnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  e.gamepad.index, e.gamepad.id,
  e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("GamepadDisconnected", function(e) {
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
        if (keydown[this.key] )
		{
            return true;
        }
        return false;
    };
    return this;
}

function aPadButton(k,pad) {  //represents a keyboard button
    k = k || 0;
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.pressedTime=0;
	this.parentPad=pad;
	this.desc="A small brown mushroom.";
    this.check= function(){
        if ((this.parentPad.buttons[this.key]) && (!this.aflag)){ 
            this.aflag=true;
			timestamp = new Date();
			this.pressedTime=timestamp.getTime();
            return false;
        }
        if((!this.parentPad.buttons[this.key]) && (this.aflag===true)){
            this.aflag=false;
			timestamp = new Date();
			var nurp=timestamp.getTime();
			if(nurp-this.pressedTime<1000)
			{	
				//console.log(nurp-this.pressedTime);
				return true;
			}else
			{
				return false;
			}
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
	this.keyboard=false;
		
		this.pad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
		if(navigator.webkitGetGamepads()[0]){
		//if(this.pad){
			this.keyboard=false;
			this.dpad.push(this.pad.axes[0])
			this.dpad.push(this.pad.axes[1]);
			for(var i=0;i<this.pad.buttons.length;i++)
			{
				var daisy=new aPadButton(i,this.pad);
				this.buttons.push(daisy);
			}
			console.log("Controller detected.");
		}else
		{
			this.buttons=[];
			this.keyboard=true;
			this.buttons.push(new akey("z")); //a
			this.buttons[0].desc="Remove hat";
			this.buttons.push(new akey("space")); //b
			this.buttons[1].desc="Jump";
			this.buttons.push(new akey("x")); //x
			this.buttons[2].desc="Change clothes";
			this.buttons.push(new akey("shift")); //y
			this.buttons[3].desc="Run / Pound the ground";
			this.buttons.push(new akey("n"));
			this.buttons[4].desc="Change hair";
			this.buttons.push(new akey("m"));
			this.buttons[5].desc="Change face";
			this.buttons.push(new akey("j"));
			this.buttons[6].desc="Toggle platformer mode";
			this.buttons.push(new akey("return"));
			this.buttons[7].desc="Respawn";
			console.log("No controller detected, use keyboard.");
		}
	
};

virtualGamePad.prototype.switchToKeyboard=function()
{
	this.buttons=[];
	this.keyboard=true;
	this.buttons.push(new akey("z")); //a
	this.buttons[0].desc="Remove hat";
	this.buttons.push(new akey("space")); //b
	this.buttons[1].desc="Jump";
	this.buttons.push(new akey("x")); //x
	this.buttons[2].desc="Change clothes";
	this.buttons.push(new akey("shift")); //y
	this.buttons[3].desc="Run / Pound the ground";
	this.buttons.push(new akey("n"));
	this.buttons[4].desc="Change hair";
	this.buttons.push(new akey("m"));
	this.buttons[5].desc="Change face";
	this.buttons.push(new akey("j"));
	this.buttons[6].desc="Toggle platformer mode";
	this.buttons.push(new akey("return"));
	this.buttons[7].desc="Respawn";
	console.log("controller no longer detected, switching to keyboard controls");
};

virtualGamePad.prototype.switchToController=function()
{
	this.buttons=[];
	this.dpad=[];
	this.keyboard=false;
	this.pad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	if((!this.keyboard) && (navigator.webkitGetGamepads()[0])){
	//if(this.pad){
		this.keyboard=false;
		this.dpad.push(this.pad.axes[0])
		this.dpad.push(this.pad.axes[1]);
		for(var i=0;i<this.pad.buttons.length;i++)
		{
			var daisy=new aPadButton(i,this.pad);
			this.buttons.push(daisy);
		}
	}
	
	console.log("controller detected, disabling keyboard controls.");
};

virtualGamePad.prototype.checkLeft=function()
{
	if(this.keyboard)
	{
		if(keydown.a)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkRight=function()
{
	if(this.keyboard)
	{
		if(keydown.d)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUp=function()
{
	if(this.keyboard)
	{
		if(keydown.w)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDown=function()
{
	if(this.keyboard)
	{
		if(keydown.s)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.update=function()
{
	this.pad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	if((!this.keyboard) && (!navigator.webkitGetGamepads()[0]))
	{
		this.switchToKeyboard();

	}else if((this.keyboard) && (navigator.webkitGetGamepads()[0]))
	{
		this.switchToController();
	}
	
};

curMap = new Map();
curMap.clear();

controller= new virtualGamePad();

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

var outfitkey=new akey("o");
outfitkey.desc="change into a random outfit."
edskeys.push(outfitkey);

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

function drawGUI(can)
{
	can.fillStyle="white";
	can.fillText("Player: "+miles.x+","+miles.y,25,25);
	can.fillText("tiles: "+miles.tileX+","+miles.tileY,25,40);
	can.fillText("Camera: "+camera.x+","+camera.y,25,55);
	can.fillText("tile: "+camera.tileX+","+camera.tileY,25,70);
	can.fillText("HP: "+miles.hp+"/"+miles.maxHp ,755,40);
	can.fillText("Jumps: "+Math.floor(miles.numJumps-miles.jumpTrack),755,55);
}

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

function startGame()
{
	mode=1;	
	gamestart=true;
	curMap.buildMap("map4");
}

function mainMenuUpdate(){
	startGame();
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
	
	
	
	gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
	if(controller.buttons[7].check())
	{
		console.log("yart");
		startGame();
	}
		
	if(startkey.check()){
		startGame();
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

function dingle(x,y)
{
	canvas.save()
	canvas.globalAlpha=0.4;
	
	if(curMap.walkable(Math.floor(miles.tileX)+x,Math.floor(miles.tileY)+y))
	{
		canvas.fillStyle="white";
	}else
	{
		canvas.fillStyle="red";
	}

	canvas.translate(((miles.tileX+x)*16-camera.tileX*16)*camera.zoom,((miles.tileY+y)*16-camera.tileY*16)*camera.zoom);
	canvas.fillRect(0,0,16,16);
	canvas.restore();

}

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	curMap.draw(camera);
	/*canvas.fillStyle="white";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);*/
	for(var i=0;i<people.length;i++)
	{
		if(people[i].showTail)
		{
			people[i].drawTail(canvas,camera);
		}
		people[i].draw(canvas,camera);
	}
	monsta.draw(canvas,camera);

	/*dingle(0,1);
	dingle(0,0);
	dingle(1,0);
	dingle(1,1);*/
	
	//canvas.fillRect(miles.tileX+camera.x,miles.tileY+camera.y,16,16);
	
	canvas.globalAlpha=0.4;
	curMap.drawRadar(camera,665,350);
	canvas.globalAlpha=1;
	if(debugInfo)
	{
		drawGUI(canvas);
	}
	
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	controller.update();
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
	if((controller.keyboard ) ||(controller.pad))
	{
		if(controller.buttons[7].check())
		{
			miles.x=220;
			miles.y=170;
		}
	
		if(controller.buttons[1].check())
		{
			if(miles.crouching)
			{
				miles.bigJump();
			}else
			{
				miles.jump();
			}
		}
		if(controller.buttons[2].check())
		{
			/*miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
			miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
			miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);*/
			miles.cycleGuns();
		}
		
		if(!platformer)
		{
			/*if(controller.buttons[0].checkDown())
			{
				miles.crouching=true;
			}else
			{
				miles.crouching=false;
			}*/
			if(controller.buttons[0].checkDown())//A
			{
				//miles.equip(noHelmet);
				miles.arms[0].backArm.angle=195;
				miles.arms[1].backArm.angle=345;
			}else
			{
				miles.arms[0].backArm.angle=90;
				miles.arms[1].backArm.angle=90;
			}
		}else
		{
			if(miles.aiming)
			{
			
				if(controller.buttons[0].check())
				{
					miles.shoot();
				}
			}else
			{
				if(controller.buttons[0].checkDown())
				{
					miles.wingsOut=true;
				}else
				{
					miles.wingsOut=false;
				}
			}
		}
		if(controller.buttons[3].check())//Y
		{
			if(miles.jumpTrack>0)
			{
				if(true)//(miles.dongle)
				{
					miles.pound();
				}
			}
		}
		if(controller.buttons[5].checkDown())//R
		{
			//miles.expression=Math.floor(Math.random()*numfaces);
			miles.aiming=true;
		}else
		{
			miles.aiming=false;
		}
		if(controller.buttons[4].check()) //X
		{
			miles.backDash();
			
		}
	}
	if(debugkey.check())
	{
		//platformer=!platformer;
		debugInfo=!debugInfo;
		allPoint(miles);
		miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
	}
	if(controller.buttons[6].check())
	{
		platformer=!platformer;
	}
	
	if(outfitkey.check())
	{
		miles.equipOutfit(Math.floor(Math.random()*4));
	}
	
	if(helpkey.check())
	{
		//stars[curSystem].planets[stars[curSystem].selected].orbitDecay=1;
		/*for(var i=0;i<edskeys.length;i++)
		{
			console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
		}*/
		if(controller.keyboard)
		{
			for(var i=0;i<controller.buttons.length;i++)
			{
				console.log(controller.buttons[i].key.toUpperCase() + ": "+controller.buttons[i].desc);
			}
		}else
		{
			console.log("Use the controller.");
			for(var i=0;i<edskeys.length;i++)
			{
				console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
			}
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
	
	var speeMulti=1;
	
		//miles.dongle=false;
		if((controller.buttons[3].checkDown()) &&(miles.onSurface()) && ((controller.checkLeft()) || (controller.checkRight())) )
		{
			//speedMulti=3;
			//miles.speedFactor=30;
			miles.running=1;
			//controller.buttons[3].aflag=false;
			miles.accelerate();
			if(miles.speedFactor>15)
			{
				miles.showTail=true;
			}
			miles.tailLength=2;
			if(miles.tail.length>2)
			{
				miles.tail.splice(0,miles.tail.length-2);
			}
		}else
		{
			//miles.speedFactor=10;
			miles.running=1;
			miles.deccelerate();
			//speedMulti=1;
			if(!miles.pounding)
			{
				miles.showTail=false;
			}
			miles.tailLength=5;
		}
	
	if (controller.buttons[3].checkDown())
	{
			miles.running=2;
	}else
	{
		miles.running=1;
	}
	
	if(true)
	{
		if(!platformer)
		{
			if(controller.checkUp())
			{
				miles.yV=-4*miles.running;
				//console.log(miles.running);
				//camera.y-=miles.speed*speedMulti;
				//camera.y=miles.y-CANVAS_HEIGHT/2;
				if(miles.y<0) {miles.y=0;}
				mapDirty=true;
			}else if(controller.checkDown())
			{
				miles.yV=4*miles.running;;//miles.speed*(miles.speedFactor/10);
				//camera.y+=miles.speed*speedMulti;
				//camera.y=miles.y-CANVAS_HEIGHT/2;
				if(miles.y>curMap.height*tileSize-miles.height) {miles.y=(curMap.height-2)*tileSize}
				mapDirty=true;
			}else
			{
				miles.yV=0;
		
			}
			if(controller.checkLeft())
			{
				miles.xV=-4*miles.running;;//miles.speed*(miles.speedFactor/10);
				//camera.x-=miles.speed*speedMulti;
				//camera.x=miles.x-CANVAS_WIDTH/2;
				if(miles.x<0) {miles.x=0;}
				mapDirty=true;
			}else if(controller.checkRight())
			{
				
				miles.xV=4*miles.running;//miles.speed*(miles.speedFactor/10);
				//camera.x+=miles.speed*speedMulti;
				//camera.x=miles.x-CANVAS_WIDTH/2;
				if(miles.x>(curMap.width-5)*tileSize) {miles.x=(curMap.width-5)*tileSize}
				mapDirty=true;
			}else
			{
				miles.xV=0;
			}
		}else
		{

			if(controller.checkUp())
			{
				miles.gesturing=false;
				if(miles.aiming)
				{
					if(otherControls)
					{
					if(miles.facingLeft)
					{
						miles.arms[0].backArm.angle=270;
					}else
					{
						miles.arms[1].backArm.angle=270;
					}
					miles.aimingUp=true;
					}else
					{
						miles.gun.angleOffset+=aimSpeed;
					}
				}
				//what does up do?
			}else
			{
				miles.aimingUp=false;
			}
			if(controller.checkDown())
			{
				miles.crouching=true;
				miles.gesturing=false;
				mapDirty=true;
				if(miles.aiming)
				{
					if(otherControls)
					{
						if(miles.facingLeft)
						{
							miles.arms[0].backArm.angle=90;
						}else
						{
							miles.arms[1].backArm.angle=90;
						}
						miles.aimingDown=true;
					}else
					{
						miles.gun.angleOffset-=aimSpeed;
					}
				}
			}else
			{
				miles.crouching=false;
				miles.aimingDown=false;
			}
			if(controller.checkLeft())
			{
				miles.stopGesturing();
				miles.facingLeft=true;
				if(!miles.aiming)
				{
					if(!miles.lastLeft)
					{
						this.xV=0;
					}
					
					if((curMap.walkable(Math.floor(miles.x/tileSize),Math.floor(miles.y/tileSize))) && (curMap.walkable(Math.floor(miles.x/tileSize),Math.floor(miles.y/tileSize)+1)))
					{
						miles.xV-=0.2*(miles.speedFactor/10);
						mapDirty=true;
						if(miles.xV<-miles.maxSpeed*(miles.speedFactor/10))
						{
							miles.xV=-miles.maxSpeed*(miles.speedFactor/10);
						}
						if(miles.x<0) {miles.x=0;}
					}else
					{
						miles.xV=0;
					}
					miles.lastLeft=true;
				}
			}
			if(controller.checkRight())
			{	
				miles.facingLeft=false;
				miles.stopGesturing();
				if(!miles.aiming)
				{
					
					if(miles.lastLeft)
					{
						this.xV=0;
					}
					//miles.facingLeft=false;
					if((curMap.walkable(Math.floor(miles.x/tileSize)+1,Math.floor(miles.y/tileSize))) && (curMap.walkable(Math.floor(miles.x/tileSize)+2,Math.floor(miles.y/tileSize)+1)))
					{
						miles.xV+=0.2*miles.speedFactor;
						mapDirty=true;
						if(miles.xV>miles.maxSpeed*(miles.speedFactor/10))
						{
							miles.xV=miles.maxSpeed*(miles.speedFactor/10);
						}
						if(miles.x>(curMap.width-5)*tileSize) {miles.x=(curMap.width-5)*tileSize}
					}else
					{
						miles.xV=0;
					}
					miles.lastLeft=false;
				}
			}
		}
	}
	if(true)
	{
		if(keydown.up)
		{
			camera.y-=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileY<0) {camera.y=0; camera.tileY=0;}
			mapDirty=true;
		}
		if(keydown.down)
		{
			camera.y+=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileY>curMap.height-camera.height) {camera.tileY=curMap.height-camera.height;camera.y=camera.tileY;}
			mapDirty=true;
		}
		if(keydown.right)
		{
			camera.x+=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileX>curMap.width-camera.width) {camera.tileX=curMap.width-camera.width;}
			mapDirty=true;
		}
		if(keydown.left)
		{
			camera.x-=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileX<0) {camera.tileX=0;}//todo
			mapDirty=true;
		}
	}
};
merp();
