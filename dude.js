EquipSlots={};
EquipSlots.Legs=0;
EquipSlots.Chest=1;
EquipSlots.Helmet=2;
EquipSlots.Ring=3;

BonusTypes={};
BonusTypes.None=0;
BonusTypes.AttackUp=1;
BonusTypes.EvadeUp=2;
BonusTypes.SpeedUp=3;
BonusTypes.Regen=4;
BonusTypes.MagicUp=5;

GestureTypes={};
GestureTypes.Surrender=0;
GestureTypes.Wave=1;
GestureTypes.Dance=2;
GestureTypes.Waft=3;
GestureTypes.Cower=4;
GestureTypes.Point=5;
GestureTypes.HeardSomething=6;
GestureTypes.Suprised=7;

var sleeveColorList=[];
sleeveColorList.push("4800FF");
sleeveColorList.push("007F0E");
sleeveColorList.push("0094FF");
sleeveColorList.push("00FF21");
sleeveColorList.push("267F00");
sleeveColorList.push("D980FF");
sleeveColorList.push("white");
sleeveColorList.push("DAFF7F");
sleeveColorList.push("white");//("007F0E");
sleeveColorList.push("404040");
sleeveColorList.push("404040");
sleeveColorList.push("3A61FF");
sleeveColorList.push("1F6300");

var otherControls=true;
var aimSpeed=9;
var platformer=true;
var friction=0.07;

function gun(guy,type)
{
	this.guy=guy;
	this.name="Checkov's Gun";
	this.damage=5;
	this.recoil=2;
	this.kockback=1;
	this.clipSize=10;
	this.shotsPer=1;
	this.reloadSpeed=1;
	this.shotSpeed=4;
	this.aimAdjHead=0;
	this.angleOffset=0;
	if(type==0)
	{	
		this.sprite=Sprite("gun0");
		this.bothArms=false;
		this.xOffset=-3;
		this.yOffset=-3;
	}else if(type==1)
	{
		this.sprite=Sprite("gun1");
		this.bothArms=true;
		//this.angleOffset=15;
		this.xOffset=-18;
		this.yOffset=-6;
	}else
	{
		this.sprite=Sprite("gun2");
		this.bothArms=true;
		this.xOffset=-18;
		this.yOffset=-6;
		this.aimAdjHead=4;
	}

}

gun.prototype.draw=function(can,cam)
{
	can.save();
	if(this.guy.facingLeft)
	{
		can.translate((this.guy.x+this.guy.arms[0].backArm.joint2.x-cam.tileX*16)*cam.zoom,(this.guy.y+this.guy.arms[0].backArm.joint2.y-cam.tileY*16)*cam.zoom);
		can.rotate((this.guy.arms[0].backArm.angle)* (Math.PI / 180));
		
		//flip it.
		
		can.scale(1, -1);
	}else
	{
		can.translate((this.guy.x+this.guy.arms[1].backArm.joint2.x-cam.tileX*16)*cam.zoom,(this.guy.y+this.guy.arms[1].backArm.joint2.y-cam.tileY*16)*cam.zoom);
		can.rotate((this.guy.arms[1].backArm.angle)* (Math.PI / 180));
	
	}
	//can.scale(cam.zoom,cam.zoom);
	this.sprite.draw(can, this.xOffset,this.yOffset);
	can.restore();

}

function armor(sprtext,sloot,id)
{
	this.defense=0;
	if(!id) {id=0;}
	this.id=id;
	this.visible=false;
	this.real=false;
	this.slot=0;
	this.coversHair=false;
	this.coversFacialHair=false;
	this.bonuses=[];
	this.bonusVal=[];
	if(sloot==EquipSlots.Chest)
	{
		this.sleeves=true;
		if(id==6)
		{
			this.sleeves=false;
		}
		this.sleeveColor=sleeveColorList[this.id];
		this.sleeveLength=5;
	}
	if(sloot)
	{
		this.slot=sloot;
		this.real=true;
	}
	if(sprtext)
	{
		this.visible=true;
		this.real=true;
		/*this.sprites=[];
		for(var i=0;i<4;i++)
		{
			this.sprites.push(Sprite(sprtext+i));
		}*/
		this.sprite=Sprite(sprtext);
	}

}
armor.prototype.addBonus=function(type,mag)
{
	this.bonuses.push(type);
	this.bonusVal.push(mag);
};

noLegs=new armor();
noChest=new armor();
noHelmet=new armor();
noRing=new armor();
noChest.slot=1;
noHelmet.slot=2;
noRing.slot=3;

var legArmorList=[];
var chestArmorList=[];
var helmetList=[];

chestArmorList.push(noChest);

legArmorList.push(noLegs);
helmetList.push(noHelmet);
var numshirts=13;
var numpants=11;
var numhelmets=24;
var numfaces=4;
var numhair=9;
var numfacialhair=5;
for(var i=0;i<numshirts;i++)
{
	chestArmorList.push(new armor("shirt"+i,EquipSlots.Chest,i));
}

chestArmorList[10].sleeveLength=10;

for(var i=0;i<numpants;i++)
{
	legArmorList.push(new armor("pants"+i,EquipSlots.Legs));
}

for(var i=0;i<numhelmets;i++)
{
	helmetList.push(new armor("helmet"+i,EquipSlots.Helmet));
}
//helmetList.push(new armor("

for(var i=1;i<helmetList.length;i++)
{
	helmetList[i].coversHair=true;
	helmetList[i].coversFacialHair=true;
}


helmetList[1].coversFacialHair=false;
helmetList[3].coversFacialHair=false;
helmetList[7].coversFacialHair=false;
helmetList[8].coversFacialHair=false;
helmetList[10].coversFacialHair=false;
helmetList[10].coversHair=false;
helmetList[11].coversFacialHair=false;
helmetList[12].coversFacialHair=false;
helmetList[12].coversHair=false;
helmetList[13].coversFacialHair=false;
helmetList[13].coversHair=false;
helmetList[14].coversFacialHair=false;
helmetList[14].coversHair=false;
helmetList[15].coversFacialHair=false;
helmetList[15].coversHair=false;
helmetList[17].coversFacialHair=false;
helmetList[17].coversHair=false;
helmetList[21].coversFacialHair=false;


function point()
{
	x=0;
	y=0;
}
function bone(anchor)
{
	this.body=anchor;
	this.side=0;
	this.joint1={};
	this.joint2={};
	this.joint1.x=anchor.x+3; //this doesn't matter because update.
	this.joint1.y=anchor.y+6;
	this.angle=90;
	this.length=10;
	this.joint2.x=anchor.x+60;
	this.joint2.y=anchor.y+60;
	/*will be calculated, based on angle and length.
	this.x2=0;
	this.y2=0;
	*/
	//this.joint1=anchor;
	//this.joint2=null;
	
}

/*bone.prototype.draw=function(can,cam)
{
	//can.save();
	can.globalAlpha=1;
	can.strokeStyle = "red"; 
	can.beginPath();
	can.lineWidth = 3;
	//can.translate((this.x-cam.tileX*16)*cam.zoom,(this.y-cam.tileY*16)*cam.zoom);
	can.moveTo(this.joint1.x,this.joint1.y+this.body.crouchAdj);
	if(true)//(this.joint2)
	{
		can.lineTo(this.joint2.x,this.joint2.y+this.body.crouchAdj);
	}else
	{
		var ax=	this.joint1.x+Math.cos(Math.radians(this.angle))*this.length;
		var ay=this.joint1.y+this.body.crouchAdj+Math.sin(Math.radians(this.angle))*this.length;
		canvas.lineTo(ax-cam.tileX,ay-cam.tileY);
	}
	
	can.closePath();
	can.stroke();
	//can.restore();
};*/
bone.prototype.drawNew=function(can,cam)
{
	//can.save();
	can.strokeStyle = this.body.skinColor;//"white"; 
	can.beginPath();
	can.lineWidth = 3;
	//can.translate(0,0);
	can.translate((this.x-cam.tileX*16)*cam.zoom,(this.y-cam.tileY*16)*cam.zoom);
	can.moveTo(this.joint1.x,this.joint1.y-this.body.heightOffset);
	if(true)//(this.joint2)
	{
		can.lineTo(this.joint2.x,this.joint2.y);
	}else
	{
		var ax=	this.joint1.x+Math.cos(Math.radians(this.angle))*this.length;
		var ay=this.joint1.y+Math.sin(Math.radians(this.angle))*this.length;
		canvas.lineTo(ax-cam.tileX,ay-cam.tileY);
	}
	
	can.closePath();
	can.stroke();
	
};

bone.prototype.drawSleeve=function(can,cam,wang)
{

	if((this.body) && (this.body.equipment)&&(this.body.equipment[1].sleeves) )
	{
		can.translate((this.x-cam.tileX*16)*cam.zoom,(this.y-cam.tileY*16)*cam.zoom);
		can.strokeStyle = this.body.equipment[EquipSlots.Chest].sleeveColor;//"white"; 
		can.beginPath();
		can.lineWidth = 4;
		can.moveTo(this.joint1.x,this.joint1.y-this.body.heightOffset);
		var ax=	this.joint1.x+Math.cos(Math.radians(this.angle))*this.body.equipment[1].sleeveLength;
		var ay= this.joint1.y+Math.sin(Math.radians(this.angle))*this.body.equipment[1].sleeveLength;
		//can.lineTo(this.joint2.x,this.joint2.y);
		can.lineTo(ax,ay);
		can.closePath();
		can.stroke();
		//can.restore();
	}

		
};

function arm(that,side)
{
	this.body=that;
	var thot={};
	thot.x=that.x+30;
	thot.y=that.y;
	thot.equipment=[]
	for(var i=0;i<that.equipment.length;i++)
	{
		thot.equipment.push(that.equipment[i]);
	}

	if(side==0)
	{
		this.backArm=new bone(that);
	}else
	{
		this.backArm=new bone(that);
		this.backArm.side=1;
		this.backArm.joint1.x+=24;
		//this.backArm.angle=0;
	}
	//this.foreArm=new bone(that.backArm);
	
 }
 arm.prototype.update=function()
 {
	if(this.backArm.side==0)
	{
		this.backArm.joint1.x=8;//this.body.x+6;
	}else
	{
		this.backArm.joint1.x=24//this.body.x+24;
	}
	this.backArm.joint1.y=15+this.body.crouchAdj;//this.body.y+15;
	this.backArm.joint2.x=8;//this.body.x+6;
	this.backArm.joint2.y=0+this.body.crouchAdj;//this.body.y;
	var ax=	this.backArm.joint1.x+Math.cos(Math.radians(this.backArm.angle))*this.backArm.length;
	var ay= this.backArm.joint1.y+Math.sin(Math.radians(this.backArm.angle))*this.backArm.length;
	this.backArm.joint2.x=ax
	this.backArm.joint2.y=ay;
 };
arm.prototype.draw=function(can,cam)
{
	this.backArm.drawNew(can,cam);
	
}

arm.prototype.drawSleeves=function(can,cam,wang)
{
	this.backArm.drawSleeve(can,cam,wang);
	
}

arm.prototype.relax=function()
{
	this.backArm.angle=90;
}

function dude(otherdude)
{	
	if(!otherdude)
	{
	this.shaking=false;
	this.shakeTrack=0;
	this.shakeRate=1;
	this.shakeFlag=false
	this.shakeOffset=0;
	this.aiming=false;
	this.aimingUp=false;
	this.heightOffset=Math.floor(Math.random()*220)/100;
	this.running=1;
	this.aimingDown=false;
	this.aimAngle=90;
	this.inBox=false;
	this.dongle=true;
	this.gunTrack=0;
	this.lastBackDash=0;
	this.backDashCoolDown=800;
	this.gesturing=false;
	this.gesture=GestureTypes.Wave;
	this.guns=[];
	this.guns.push(new gun(this,0));
	this.guns.push(new gun(this,1));
	this.guns.push(new gun(this,2));
	this.gun=null;
	this.flashing=false;
	this.wingsOut=false;
	this.wingsOut=false;
	this.flashMicroCounter=0;
	this.flashMacroCounter=0;
	this.flashSpeed=1;
	this.flashRate=5;
	this.flashFlag=false;
	this.falshDuration=100;
	this.flashAlpha=0.4;
	this.gesturing=false;
	this.gestureTrack=0;
	this.gestureStart=0;
	this.gestureDuration=1000;
	this.gestureRate=5+Math.random()*10;//10;
	if(Math.random()*10<5)
	{
		this.danceFlag=false;
	}else
	{
		this.danceFlag=true;
	}

	this.alive=true;
	this.race=1;
	this.skinColor="#FFBC59";
	if(Math.random()*10>5)
	{
		this.race=0;
		this.skinColor="#7F3300";
	}
	this.sleeveColor="#404040"
	this.x=120*tileSize;//this seems to be straight X, camera uses tile X
	this.y=170*tileSize;
	this.facingLeft=false;
	this.tileX=Math.floor(this.x/tileSize);
	this.tileY=Math.floor(this.y/tileSize);
	this.xV=0;
	this.yV=0;
	this.elasticity=.3;
	this.maxSpeed=4;
	this.numJumps=8;
	this.falling=false;
	this.jumpTrack=0;
	this.tail=[];
	this.tailRate=0;
	this.tailLength=5;
	this.showTail=false;
	this.tailCount=0;
	this.tileX=1;
	this.tileY=1
	this.headHeight=-8;
	this.headBobTop=-8;
	this.headBobBottom=-6;
	this.bodyHeight=2;
	this.bodyBobRoom=-2;
	this.maxSpeedFactor=30;
	this.headBob=false;
	this.hp=100;
	this.speed=2;
	this.width=32;
	this.height=32;
	this.expression=Math.floor(Math.random()*numfaces);
	this.crouching=false;
	this.maxHp=100;
	this.facing=0;
	this.headBobRate=3;
	this.headBobTrack=0;
	this.bodyBobRate=15;
	this.bodyBobTrack=0;
	this.breathRate=20;
	this.breathTrack=0;
	this.bobs=0;
	this.speedFactor=10;
	this.friction=0.04;
	this.breathing=false;
	this.crouching=false;
	this.bobbingUp=true;
	this.bodyBobbingUp=true;
	this.headSprites=[];
	this.headSprites.push(Sprite("head"+this.race));
	this.chestSprites=[];
	this.chestSprites.push(Sprite("chest"+this.race));
	this.legSprites=[];
	this.legSprites.push(Sprite("legs"+this.race));
	this.hairSprites=[];
	this.hairSprites.push(Sprite("hair"+Math.floor(Math.random()*numhair)));
	this.facialHairSprites=[];
	if(Math.random()*10>7)
	{
		this.facialHairSprites.push(Sprite("facialhair"+Math.floor(Math.random()*numfacialhair)));
	}else
	{
		this.facialHairSprites.push(Sprite("facialhair"+0));
	}
	
	this.faceSprites=[];
	
	this.faceSprites[0]=[];
	this.faceSprites[0].push(Sprite("face0"));
	this.faceSprites[0].push(Sprite("face1"));
	this.faceSprites[0].push(Sprite("face2"));
	this.faceSprites[0].push(Sprite("face3"));
	this.faceSprites[1]=[];
	this.faceSprites[2]=[];
	this.faceSprites[3]=[];
	this.equipment=new Array(4);
	this.equipment[EquipSlots.Legs]=noLegs;
	this.equipment[EquipSlots.Chest]=noChest;
	this.equipment[EquipSlots.Helmet]=noHelmet;
	this.equipment[EquipSlots.Ring]=noRing;
	this.arms=[];
	this.arms.push(new arm(this,0));
	this.arms.push(new arm(this,1));
	}else
	{
		/*this.flashing=otherdude.flashing;
		this.wingsOut=otherdude.wingsOut
		this.flashMicroCounter=0;
		this.flashMacroCounter=0;
		this.flashSpeed=otherdude.flashSpeed;
		this.flashRate=otherdude.;
		this.flashFlag=otherdude.;
		this.falshDuration=otherdude.;
		this.flashAlpha=otherdude.;
		this.gesturing=otherdude.;
		this.gestureTrack=otherdude.;
		this.gestureRate=otherdude.;
		this.danceFlag=otherdude.;
		this.arms=otherdude.
		this.alive=otherdude.
		this.race=otherdude.
		this.skinColor=otherdude.
		this.x=otherdude.
		this.y=otherdude.
		this.tileX=otherdude.
		this.tileY=otherdude.
		this.xV=otherdude.;
		this.yV=otherdude.;
		this.elasticity=otherdude.;
		this.maxSpeed=otherdude.;
		this.numJumps=otherdude.;
		this.falling=otherdude.;
		this.jumpTrack=otherdude.;
		this.tail=otherdude.;
		this.tailRate=otherdude.;
		this.tailLength=otherdude.;
		this.showTail=otherdude.;
		this.tailCount=otherdude.;
		this.tileX=otherdude.;
		this.tileY=otherdude.
		this.headHeight=otherdude.;
		this.headBobTop=otherdude.;
		this.headBobBottom=otherdude.;
		this.bodyHeight=otherdude.;
		this.bodyBobRoom=otherdude.;
		this.maxSpeedFactor=otherdude.;
		this.headBob=otherdude.;
		this.hp=otherdude.;
		this.speed=otherdude.;
		this.width=otherdude.;
		this.height=otherdude.;
		this.expression=otherdude.
		this.crouching=otherdude.
		this.maxHp=otherdude.
		this.facing=otherdude.;
		this.headBobRate=otherdude.headBobRate;
		this.headBobTrack=otherdude.headBobTrack;
		this.bodyBobRate=otherdude.bodyBobRate;
		this.bodyBobTrack=otherdude.bodyBobTrack;
		this.breathRate=otherdude.breathRate;
		this.breathTrack=otherdude.breathTrack;
		this.bobs=otherdude.bobs;
		this.speedFactor=otherdude.speedFactor;
		this.friction=otherdude.friction;
		this.breathing=otherdude.breathing;
		this.crouching=otherdude.crouching;
		this.bobbingUp=otherdude.bobbingUp;
		this.bodyBobbingUp=otherdude.bodyBobbingUp;
		this.headSprites=otherdude.headSprites;
		this.chestSprites=otherdude.chestSprites;
		this.legSprites=otherdude.legSprites;
		this.hairSprites=otherdude.hairSprites;

		this.faceSprites=otherdude.faceSprites;
		
	

		this.equipment=otherdude.eqipment;*/

	}
}

dude.prototype.equipOutfit=function(w)
{
	if(w==0) //knight
	{
		this.equip(legArmorList[8]);
		this.equip(chestArmorList[10]);
		this.equip(helmetList[6]);
	}else 	if(w==1) //batman
	{
		this.equip(legArmorList[9]);
		this.equip(chestArmorList[11]);
		this.equip(helmetList[16]);
	}else 	if(w==2) //superman
	{
		this.equip(legArmorList[10]);
		this.equip(chestArmorList[12]);
		this.equip(helmetList[0]);
	}else 	if(w==3) //snake
	{
		this.equip(legArmorList[11]);
		this.equip(chestArmorList[13]);
		this.equip(helmetList[14]);
	}
};

dude.prototype.cycleGuns=function()
{
	this.gunTrack++;
	if(this.gunTrack>this.guns.length-1)
	{
		this.gunTrack=0;
	}
	this.gun=this.guns[this.gunTrack];
};

dude.prototype.toggleArmed=function()
{
	if(this.gun)
	{
		this.gun=null;
	}else
	{
		this.gun=this.guns[this.gunTrack];
	}
};

dude.prototype.kill=function()
{
	this.hp=0;
	this.alive=false;
};

dude.prototype.hurt=function(damage)
{
	this.flashing=true;
	this.hp-=damage;
	if(this.hp<1)
	{
		this.kill();
	}
		
}

dude.prototype.backDash=function()
{
	var atimestamp = new Date();
	var neow=atimestamp.getTime();
	if(neow-this.lastBackDash>this.backDashCoolDown)
	{
		if(this.facingLeft)
		{
			this.xV+=7;
		}else
		{
			this.xV-=7;
		}
		
		this.lastBackDash=atimestamp.getTime();
	}
};

dude.prototype.draw=function(can,cam) //todo change to draw sprite.
{
	if(!this.alive) {return;}
	can.save();
	if(this.flashFlag)
	{
		can.globalAlpha=this.flashAlpha;
	}

	//can.translate((this.x+cam.tileX)*cam.zoom,(this.y+cam.tileY)*cam.zoom);
	//can.translate(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
	can.translate((this.x-cam.tileX*16)*cam.zoom+this.shakeOffset,(this.y-cam.tileY*16)*cam.zoom);
	can.scale(cam.zoom,cam.zoom);
	this.legSprites[this.facing].draw(can, 0,0);
	this.chestSprites[this.facing].draw(can, 0,this.bodyHeight+this.crouchAdj-this.heightOffset);

	if(this.equipment[EquipSlots.Legs].visible)
	{
			this.equipment[EquipSlots.Legs].sprite.draw(can,0,0);
	}
	if(this.equipment[EquipSlots.Chest].visible)
	{
			this.equipment[EquipSlots.Chest].sprite.draw(can,0,this.bodyHeight+this.crouchAdj-this.heightOffset);
			if(false)//this.crouching)
			{
				this.legSprites[this.facing].draw(can, 0,0);
				this.equipment[EquipSlots.Legs].sprite.draw(can,0,0);
			}
	}
	var wump=0;
	if((this.aiming) && (this.gun) && (!this.crouching))
	{
		wump=this.gun.aimAdjHead;
	}

		
	this.headSprites[this.facing].draw(can, 0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead-this.heightOffset+wump);
	this.faceSprites[this.facing][this.expression].draw(can,0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead-this.heightOffset+wump);

	if(!this.equipment[EquipSlots.Helmet].coversHair)
	{
		this.hairSprites[this.facing].draw(can, 0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead-this.heightOffset+wump);
	}
	if(!this.equipment[EquipSlots.Helmet].coversFacialHair)
	{
		this.facialHairSprites[this.facing].draw(can, 0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead-this.heightOffset+wump);
	}
	if(this.equipment[EquipSlots.Helmet].visible)
	{
		this.equipment[EquipSlots.Helmet].sprite.draw(can,0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead-this.heightOffset+wump);
	}

	for(var i=0;i<this.arms.length;i++)
	{
		this.arms[i].draw(can,cam);
	}
	
	
	/*for(var i=0;i<this.arms.length;i++)
	{*/
		this.arms[0].drawSleeves(can,cam,false);
		this.arms[1].drawSleeves(can,cam,true);
	//}
	if(this.equipment[EquipSlots.Ring].visible)
	{
		this.equipment[EquipSlots.Ring].sprite.draw(can,0,0);
	}
	can.restore();
	if(this.gun)
	{
		this.gun.draw(can,cam);
	}
	
	

};

dude.prototype.drawTail=function(can,cam) //todo change to draw sprite.
{
	if(!this.alive) {return;}
	if(this.flashing){return;}
	for(var i=0;i<this.tail.length;i++)
	{
		can.save();
		can.globalAlpha=0.1;
		can.translate((this.tail[i].x-cam.tileX*16)*cam.zoom,(this.tail[i].y-cam.tileY*16)*cam.zoom);
		//can.translate(CANVAS_WIDTH/2+this.tail[i].x,CANVAS_HEIGHT/2+this.tail[i].y);
		can.scale(cam.zoom,cam.zoom);
		this.legSprites[this.facing].draw(can, 0,0);
		this.chestSprites[this.facing].draw(can, 0,this.bodyHeight+this.crouchAdj);

		if(this.equipment[EquipSlots.Legs].visible)
		{
				this.equipment[EquipSlots.Legs].sprite.draw(can,0,0);
		}
		if(this.equipment[EquipSlots.Chest].visible)
		{
				this.equipment[EquipSlots.Chest].sprite.draw(can,0,this.bodyHeight+this.crouchAdj);
				if(false)//this.crouching)
				{
					this.legSprites[this.facing].draw(can, 0,0);
					this.equipment[EquipSlots.Legs].sprite.draw(can,0,0);
				}
		}

		for(var ip=0;ip<this.arms.length;ip++)
		{
			this.arms[ip].draw(can,cam);
		}
		this.headSprites[this.facing].draw(can, 0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead);
		this.faceSprites[this.facing][this.expression].draw(can,0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead);

		if(this.equipment[EquipSlots.Helmet].visible)
		{
			this.equipment[EquipSlots.Helmet].sprite.draw(can,0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead);
		}else
		{
			this.hairSprites[this.facing].draw(can, 0,this.bodyHeight+this.headHeight+this.crouchAdj+this.crouchAdjHead);
		}
		if(this.equipment[EquipSlots.Ring].visible)
		{
			this.equipment[EquipSlots.Ring].sprite.draw(can,0,0);
		}
		can.restore();
	
	}

};

dude.prototype.realDraw=function(can,cam)
{
	
}

dude.prototype.accelerate=function()
{
	this.speedFactor++;
	if(this.speedFactor>this.maxSpeedFactor)
	{
		this.speedFactor=this.maxSpeedFactor;
	}
};

dude.prototype.deccelerate=function()
{
	this.speedFactor--;
	if(this.speedFactor<10)
	{
		this.speedFactor=10;
	}
};

dude.prototype.headBobIterate=function()
{
	if(this.bobbingUp)
	{
		this.headHeight++;
		if(this.headHeight>this.headBobBottom)
		{
			this.bobbingUp=false;
		}
	}else
	{
		this.headHeight--;
		if(this.headHeight<this.headBobTop)
		{
			this.bobbingUp=true;
		}
	}
};

dude.prototype.bodyBobIterate=function()
{
	if(this.bodyBobbingUp)
	{
		this.bodyHeight++;
		if(this.bodyHeight>-this.bodyBobRoom)
		{
			this.bodyBobbingUp=false;
			this.bobs++;
		}
	}else
	{
		this.bodyHeight--;
		if(this.bodyHeight<-this.bodyBobRoom)
		{
			this.bodyBobbingUp=true;
			this.bobs++;
		}
	}
	if(this.bobs>1) 
	{
		this.bobs=0;
		this.breathing=false;
	}
};

dude.prototype.pound=function()
{
	
	if(this.pounding) {return;}
	this.yV=+16;
	this.pounding=true;
	this.showTail=true;
	//animation
};

dude.prototype.jump=function()
{
	if(this.pounding) {return;}
	if(this.jumpTrack<this.numJumps)
	{
		this.yV=-6;
		this.falling=true;
		this.jumpTrack++;
	}
};
dude.prototype.bigJump=function()
{
	if(this.pounding) {return;}
	if(this.jumpTrack<this.numJumps)
	{
		this.yV=-8;
		this.falling=true;
		this.jumpTrack++;
	}
};
dude.prototype.onSurface=function()
{
	if(this.falling){
		return true;//false;
	}
	return true;
};

dude.prototype.shoot=function()
{
	console.log("boom");
	monsta.shootTextured(this.gun.x,this.gun.y,90,.5,"explosion0");
};

dude.prototype.doGesture=function(type,dur,obj)
{
	this.gesturing=true;
	this.gesture=type;
	this.gestureDuration=dur;
	this.gesturingAt=obj;
	var atimestamp = new Date();
	this.gestureStart=atimestamp.getTime();
};

dude.prototype.stopGesturing=function()
{

	this.gesturing=false;
	if(this.gesture==GestureTypes.Cower)
	{
		this.shaking=false;
		this.shakeOffset=0;
		this.crouching=false;
	}
}

dude.prototype.update=function()
{
	if(!this.alive) {return;}
	if(this.aiming)
	{
		if(this.aimingUp)
		{
		
		}else if(this.aimingDown)
		{
		
		}else
		{
			var mup=0;
			if(this.gun)
			{
				mup=this.gun.angleOffset;
			}
			if(this.facingLeft)
			{
				
				this.arms[0].backArm.angle=180+mup;
				this.arms[1].backArm.angle=100;
				if(this.gun.bothArms)
				{
					this.arms[1].backArm.angle=180+mup;
				}
			}else
			{
				this.arms[1].backArm.angle=0-mup;
				this.arms[0].backArm.angle=100;
				if(this.gun.bothArms)
				{
					this.arms[0].backArm.angle=0-mup;
				}
			}
		}
	}else
	{
		this.arms[0].relax();
		this.arms[1].relax();
	}
	
	if(this.shaking)
	{
		this.shakeTrack++;
		if(this.shakeTrack>this.shakeRate)
		{
			this.shakeTrack=0;
			this.shakeFlag=!this.shakeFlag;
		}
		if (this.shakeFlag)
		{
			this.shakeOffset=0.5;
		}else
		
		{
			this.shakeOffset=-0.5;
		}
	
	}
	
	if(this.gesturing)
	{
		var atimestamp = new Date();
		var neow=atimestamp.getTime();
		if(neow-this.gestureStart<this.gestureDuration)
		{
			if(this.gesture===GestureTypes.Dance)
			{
				this.gestureTrack++;
				if(this.gestureTrack>this.gestureRate)
				{
					this.gestureTrack=0;
					this.danceFlag=!this.danceFlag;
				}
				if(this.danceFlag)
				{
					this.crouching=true;
					this.arms[0].relax();
					this.arms[1].relax();
				}else
				{
					this.crouching=false;
					this.arms[0].backArm.angle=195;
					this.arms[1].backArm.angle=345;
				}
			}else if(this.gesture==GestureTypes.Wave)
			{
				this.gestureTrack++;
				if(this.gestureTrack>30)//this.gestureRate)
				{
					this.gestureTrack=0;
					this.danceFlag=!this.danceFlag;
				}
				if(this.danceFlag)
				{
					this.arms[0].backArm.angle+=90+this.gestureTrack*4;
				
				}else
				{
					this.arms[0].backArm.angle-=90+this.gestureTrack*4;
				}
			
			}else if(this.gesture==GestureTypes.Surrender)
			{
				this.arms[0].backArm.angle=270;
				this.arms[1].backArm.angle=270;
			
			}else if(this.gesture==GestureTypes.Point)
			{
				var beta=Math.atan2(this.gesturingAt.y-this.y,this.gesturingAt.x-this.x)* (180 / Math.PI);
	
				if(this.gesturingAt.x>this.x)
				{
					this.arms[1].backArm.angle=beta;
				}else
				{
					this.arms[0].backArm.angle=beta;
				}
				//this.arms[1].backArm.angle=270;
			
			}else if(this.gesture==GestureTypes.Cower)
			{
				this.arms[0].backArm.angle=300;
				this.arms[1].backArm.angle=240;
				this.crouching=true;
				this.shaking=true;
			
			}else if(this.gesture==GestureTypes.Waft)
			{
				this.gestureTrack++;
				if(this.gestureTrack>this.gestureRate)
				{
					this.gestureTrack=0;
					this.danceFlag=!this.danceFlag;
				}
				if(this.danceFlag)
				{
					this.arms[0].backArm.angle+=50+this.gestureTrack*4;
				
				}else
				{
					this.arms[0].backArm.angle-=50+this.gestureTrack*4;
				}
			
			}
		}else
		{
			this.stopGesturing();
		}
	}else if(!this.aiming)
	{
		if(this.wingsOut)
		{
			this.arms[0].backArm.angle=195;
			this.arms[1].backArm.angle=345;
		}else
		{
			this.arms[0].relax();
			this.arms[1].relax();
		}
	}
	for(var i=0;i<this.arms.length;i++)
	{
		this.arms[i].update();
	}
	this.tailCount++;
	if(true)//(this.tailCount>this.tailRate)
	{
		this.tailCount=0;

		var teddard=new point();
		teddard.x=this.x;
		teddard.y=this.y;
		this.tail.push(teddard);
		if(this.tail.length>this.tailLength)
		{
			this.tail.splice(0,1);
		}
		
	}
	if(this.crouching)
	{
		this.crouchAdj=5;
		this.crouchAdjHead=3;
	}else
	{
		this.crouchAdj=0;
		this.crouchAdjHead=0;
	}

		this.breathTrack++;
		if(this.breathTrack>this.breathRate)
		{
			this.breathing=true;
			this.breathTrack=0;
		}
	if(this.headBob)
	{
		this.headBobTrack++;
		
		if(this.headBobTrack>this.headBobRate)
		{
			this.headBobTrack=0;
			this.headBobIterate();
		}
	}
	if(this.breathing)
	{
		this.bodyBobTrack++;
		if(this.bodyBobTrack>this.bodyBobRate)
		{
			this.bodyBobTrack=0;
			this.bodyBobIterate();
			mapDirty=true;
		}
	}
	
	var proposedX=this.x+this.xV;
	var proposedY=this.y+this.yV;
	if(!platformer)
	{
		if((Math.floor(proposedX/tileSize)>0) && (Math.floor(proposedY/tileSize)>0) && (curMap.walkable(Math.floor(proposedX/tileSize),Math.floor(proposedY/tileSize))) && (curMap.walkable(Math.floor(proposedX/tileSize)+1,Math.floor(proposedY/tileSize))) && (curMap.walkable(Math.floor(proposedX/tileSize)+1,Math.floor(proposedY/tileSize)+1))&& (curMap.walkable(Math.floor(proposedX/tileSize),Math.floor(proposedY/tileSize)+1)) )
		{
			this.x=proposedX;
			this.y=proposedY;
		}
	}else 
	{
		if((Math.floor(proposedX/tileSize)>0) && (Math.floor(proposedY/tileSize)>0) && (curMap.walkable(Math.floor(proposedX/tileSize),Math.floor(proposedY/tileSize))) && (curMap.walkable(Math.floor(proposedX/tileSize)+1,Math.floor(proposedY/tileSize))) )
		{
			this.x=proposedX;
			this.y=proposedY;
		}
	}


	
	if(platformer)
	{

		
		
		if((curMap.canStand(Math.floor(this.x/tileSize)+1,Math.floor(this.y/tileSize)+2)) || (curMap.canStand(Math.floor(this.x/tileSize)+1,Math.floor(this.y/tileSize)+2)))//problem, getting stuck in ground.
		{
			this.falling=false;
			this.pounding=false;
			this.jumpTrack=0;
			this.yV=-this.yV*this.elasticity;
			if(Math.abs(this.yV)<0.05)
			{
				this.yV=0;
			}
			this.showTail=false;
		}else
		{
			if(this.wingsOut)
			{
				this.yV+=.06;
			}else
			{
				this.yV+=.3;
			}
		}
		
		if(this.y>curMap.height*16-33)
		{
			this.y=curMap.height*16-33;
			this.falling=false;
			this.pounding=false;
			this.jumpTrack=0;
			this.yV=-this.yV*this.elasticity;
			if(Math.abs(this.yV)<0.5)
			{
				this.yV=0;
			}
			this.showTail=false;
		}
		//friction
		if(this.xV>0)
		{
			this.xV-=friction;
			this.xV-=this.friction;
		}else if(this.xV<0)
		{
			this.xV+=friction;
			this.xV+=this.friction;
		}
		if(Math.abs(this.xV)<0.05)
		{
			this.xV=0;
		}

		mapDirty=true;
	}

	
	/*this.x=Math.floor(this.x);
	this.y=Math.floor(this.y);*/
	if(this.x<0) {this.x=0;}
	if(this.x>(curMap.width-5)*tileSize) {this.x=(curMap.width-5)*tileSize}
	this.tileX=this.x/16;
	this.tileY=this.y/16;
	/*this.tileX=Math.floor(this.x/16);
	this.tileY=Math.floor(this.y/16);*/
	if(this.flashing)
	{
		this.flashMicroCounter++;
		if(this.flashMicroCounter>this.flashSpeed)
		{
			this.flashMicroCounter=0;
			this.flashFlag=!this.flashFlag;
			this.flashMacroCounter++;
			if(this.flashMacroCounter>this.flashRate)
			{
				this.flashMacroCounter=0;
				this.flashFlag=false;
				this.flashing=false;
			}
			
		}
	}
};	

dude.prototype.equip=function(thing)
{
  //check requirements
  if(this.equipment[thing.slot].real)
  {
	//remove bonuses
	//remove and add to inventory
  }
  this.equipment[thing.slot]=thing;
  if(this.slot==EquipSlots.Chest)
  {
  
  
  }
  //confer bonuses
};