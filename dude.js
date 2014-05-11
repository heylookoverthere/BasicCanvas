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

var platformer=false;
var friction=0.07;

function armor(sprtext,sloot)
{
	this.defense=0;
	this.visible=false;
	this.real=false;
	this.slot=0;
	this.bonuses=[];
	this.bonusVal=[];
	
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
var numshirts=9;
var numpants=7;
var numhelmets=8;
var numfaces=4;
var numhair=9;
for(var i=0;i<numshirts;i++)
{
	chestArmorList.push(new armor("shirt"+i,EquipSlots.Chest));
}


for(var i=0;i<numpants;i++)
{
	legArmorList.push(new armor("pants"+i,EquipSlots.Legs));
}

for(var i=0;i<numhelmets;i++)
{
	helmetList.push(new armor("helmet"+i,EquipSlots.Helmet));
}
//helmetList.push(new armor("

function point()
{
	x=0;
	y=0;
}
function bone(anchor)
{
	this.x1=anchor.x;
	this.y1=anchor.y;
	this.angle=90;
	this.length=15;
	
	/*will be calculated, based on angle and length.
	this.x2=0;
	this.y2=0;
	*/
	this.joint1=anchor;
	this.joint2=null;
	
}

bone.prototype.draw=function(can,cam)
{
	canvas.save();
	canvas.strokeStyle = "red";
	canvas.beginPath();
	canvas.lineWidth = 2;

	canvas.moveTo(this.x1,this.y1);
	if(false)//(this.joint2)
	{
		canvas.lineTo(joint2.x,joint2.y);
	}else
	{
		var ax=	this.x1+Math.cos(Math.radians(this.angle))*this.length;
		var ay=this.y1+Math.sin(Math.radians(this.angle))*this.length;
		canvas.lineTo(ax,ay);
	}
	
	canvas.closePath();
	canvas.stroke();
	canvas.restore();
};

function arm(that,side)
{
	this.backArm=new bone(that);
	if(side==0)
	{
	
	}else
	{
		
	}
	//this.foreArm=new bone(that.backArm);
	
 }
arm.prototype.draw=function(can,cam)
{
	this.backArm.draw(can,cam);
	
}

function dude()
{	
	this.flashing=false;
	this.flashMicroCounter=0;
	this.flashMacroCounter=0;
	this.flashSpeed=1;
	this.flashRate=5;
	this.flashFlag=false;
	this.falshDuration=100;
	this.flashAlpha=0.4;
	this.arms=[];
	this.arms.push(new arm(this,0));
	this.arms.push(new arm(this,1));
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
	this.speedFactor=1;
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
}

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
	can.translate((this.x-cam.tileX*16)*cam.zoom,(this.y-cam.tileY*16)*cam.zoom);
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
	this.arms[0].draw(can,cam);
	this.arms[1].draw(can,cam);
	can.restore();
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
dude.prototype.update=function()
{
	if(!this.alive) {return;}
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
	

	
	if(platformer)
	{
		this.yV+=.3;
	
		this.x+=this.xV;
		this.y+=this.yV;
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
  //confer bonuses
};