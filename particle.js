function particle(){
	this.shooter=null;
	this.alive=false;
	this.x=0;
	this.y=0;
	this.damage=0;
	this.centerX=0;
	this.centerY=0;
	this.collisions=false;
	this.color=bColors[Math.floor(Math.random()*8)];
	this.gravity=false;
	this.xv=0;
	this.yv=0;
	this.textured=false;
	//this.texture=
	this.size=6;
	this.speed=(Math.random()*4)+1;
	this.orbiting=false;
	this.orbx=0;
	this.orby=0;
	this.orbitDiameter=4;
	this.orbitTrack=0;
	this.orbitSpeed=1;
	this.updateRate=40;
	this.destx=0;
	this.desty=0;
	this.gotoDest=false;
	this.lastUpdateTime=0;
	this.startTime=0;
	this.durTime=2000;
	this.gravity=true;
	this.smoker=false;
	this.flicker=true;
	this.exploader=false;
	//this.startTime=
	//this.curTime=
	//this.durTime=2;
}

particle.prototype.checkCollision=function(thing)
{
	//if(((thing.x+this.x)>0) && ((thing.x+this.x)<CANVAS_WIDTH)&& ((thing.y+this.y)>0) && ((thing.y+this.y)<CANVAS_HEIGHT))
	if((this.x+8>thing.x) && (this.x-8<thing.x+thing.width) && (this.y+8>thing.y) && (this.y-8<thing.y+thing.height))
	{
			return true;
	}
	return false;
}

particle.prototype.update=function(){
		var stamp = new Date();
		var tim=stamp.getTime();
		if(tim-this.startTime>this.durTime) {this.alive=false;}
		if(tim-this.lastUpdateTime<this.updateRate) { return;}
		if(this.orbiting)
		{
			this.orbitTrack+=this.orbitSpeed;
			//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			if(this.gotoDest)
			{
				if(this.orbx<this.destx) {this.orbx+=this.speed;}
				if(this.orbx>this.destx) {this.orbx-=this.speed;}
				if(this.orby<this.desty) {this.orby+=this.speed;}
				if(this.orby>this.desty) {this.orby-=this.speed;}
				if((Math.abs(this.orbx-this.destx)<5) && (Math.abs(this.orby-this.desty)<5)) {this.gotoDest=false;}
			}
		}else
		{
			this.x+=this.xv;
			this.y+=this.yv;
			if(this.flicker)
			{
				this.color=bColors[Math.floor(Math.random()*8)];
			}

		}
		if(this.gravity)
		{
				this.yv+=0.35;
		}
		//this.counter--;
		//time stuff
		//if (this.counter<1) this.alive=false;
		if(this.collisions)
		{
			//TODO
			for(var i=0;i<people.length;i++)
			{
				if(this.checkCollision(people[i]))
				{
					//people[i].doGesture(GestureTypes.Cower,50000);
					//console.log("hit");
					this.alive=false;
					people[i].hurt(this.damage,this.shooter);
				}
			}
		}

	};

function particleSystem(){
	this.particles = new Array();
	this.updateRate=1;
	this.lastUpdate=0;
}

particleSystem.prototype.start=function(dur,x,y,xv,yv,color,gravity,exploader){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
particleSystem.prototype.startTextured=function(dur,x,y,xv,yv,color,gravity,exploader,spt){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};                                        
particleSystem.prototype.shootProjectile=function(x,y,ang,spd,exploader,spt,shooter,dmg){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.shooter=shooter;
		tod.x=x;
		tod.y=y;
		tod.damage=dmg;
		tod.xv=Math.cos(ang* (Math.PI / 180))*spd; 
		tod.yv=Math.sin(ang*(Math.PI / 180))*spd;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=50000;
		tod.collisions=true;
		//tod.color=color;
		tod.gravity=true;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=50000;
		shooter.bullets.push(tod);
		this.particles.push(tod);
	};
particleSystem.prototype.draw=function(can,cam){
		var c=1;

		for(var i=0;i<this.particles.length;i++)
		{
			if((this.particles[i].alive) && (cam.isOn(this.particles[i])))
			{
				if (true){//this.particles[i].color!=c){
					can.fillStyle = this.particles[i].color;
					c= this.particles[i].color;
				}
				if(this.particles[i].textured)
				{
					this.particles[i].sprite.draw(can, this.particles[i].x-cam.tileX*tileSize,this.particles[i].y-cam.tileY*tileSize);
				}else
				{
					can.fillRect(this.particles[i].x+cam.tileX, this.particles[i].y+cam.tileY, this.particles[i].size*cam.zoom, this.particles[i].size*cam.zoom);
				}
			}
		}
	};
particleSystem.prototype.update=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].update();
			if(!this.particles[i].alive)
			{
				if(this.particles[i].exploader)
				{
					this.explosion(6,this.particles[i].x,this.particles[i].y,4);
				}	
				this.particles.splice(i,1);
			}
		}
	};
particleSystem.prototype.explosion=function(num,x,y,force){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.start(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true);
		}
	};
particleSystem.prototype.explosionTextured=function(num,x,y,force,txt){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.startTextured(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,txt);
		}
	};
particleSystem.prototype.shoot=function(x,y,ang,vel){
		this.start(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],false);

	};
particleSystem.prototype.shootTextured=function(x,y,ang,vel,tex){
		this.startTextured(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,tex);

	};
particleSystem.prototype.startOrbit=function(dur,x,y,diam){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.orbx=x;
		tod.orby=y;
		tod.orbiting=true;
		tod.orbitDiameter=diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.orbitSpeed=(Math.random()*8)+1;
		tod.textured=true;
		tod.sprite=Sprite("bee");
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
particleSystem.prototype.swarm=function(x,y){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				var dx=(Math.random()*64)-32;
				var dy=(Math.random()*64)-32;
				/*this.particles[i].orbx=x+dx;
				this.particles[i].orby=y+dy;*/
				this.particles[i].gotoDest=true;
				this.particles[i].destx=x+dx;
				this.particles[i].desty=y+dy;
			}
		}
	};
particleSystem.prototype.unSwarm=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gotoDest=true;
				this.particles[i].destx=Math.floor(Math.random()*CANVAS_WIDTH);
				this.particles[i].desty=Math.floor(Math.random()*CANVAS_HEIGHT);
			}
		}
	};
particleSystem.prototype.colonyCollapse=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gravity=true;
			}
		}
	};
