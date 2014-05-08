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

var legArmorList=[];
var chestArmorList=[];
var helmetList=[];

chestArmorList.push(noChest);

legArmorList.push(noLegs);

chestArmorList.push(new armor("shirt0",EquipSlots.Chest))
chestArmorList.push(new armor("shirt1",EquipSlots.Chest));
chestArmorList.push(new armor("shirt2",EquipSlots.Chest));
chestArmorList.push(new armor("shirt3",EquipSlots.Chest));
chestArmorList.push(new armor("shirt4",EquipSlots.Chest));
chestArmorList.push(new armor("shirt5",EquipSlots.Chest));

legArmorList.push(new armor("pants0",EquipSlots.Legs));
legArmorList.push(new armor("pants1",EquipSlots.Legs));
legArmorList.push(new armor("pants2",EquipSlots.Legs));
legArmorList.push(new armor("pants3",EquipSlots.Legs));
legArmorList.push(new armor("pants5",EquipSlots.Legs));
legArmorList.push(new armor("pants4",EquipSlots.Legs));

helmetList.push(noHelmet);
//helmetList.push(new armor("

function dude()
{	
	this.alive=true;
	this.race=0;
	if(Math.random()*10>5)
	{
		this.race=1;
	}
	
	this.x=1;
	this.y=1;
	this.tileX=1;
	this.tileY=1;
	this.hp=100;
	this.speed=2;
	this.width=32;
	this.height=32;
	this.expression=Math.floor(Math.random()*4);
	this.crouching=false;
	this.maxHp=100;
	this.facing=0;
	this.headSprites=[];
	this.headSprites.push(Sprite("head"+this.race));
	this.chestSprites=[];
	this.chestSprites.push(Sprite("chest"+this.race));
	this.legSprites=[];
	this.legSprites.push(Sprite("legs"+this.race));
	this.hairSprites=[];
	this.hairSprites.push(Sprite("hair"+Math.floor(Math.random()*3)));
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
dude.prototype.draw=function(can,cam)
{
	can.save();
	can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
	can.scale(cam.zoom,cam.zoom);
	this.legSprites[this.facing].draw(can, 0,0);
	this.chestSprites[this.facing].draw(can, 0,0);
	this.headSprites[this.facing].draw(can, 0,0);
	this.faceSprites[this.facing][this.expression].draw(can,0,0);
	this.hairSprites[this.facing].draw(can, 0,0);
	for(var i=0;i<4;i++)
	{
		if(this.equipment[i].visible)
		{
			this.equipment[i].sprite.draw(can,0,0);
		}
	}
	can.restore();
};

dude.prototype.update=function()
{
	
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
  console.log(thing, thing.slot);
  //confer bonuses
};