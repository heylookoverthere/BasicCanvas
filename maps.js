var camera = {  //represents the camera, aka what part of the map is on screen
    x: 0,
    y: 0,
	tileX:0,
	tileY:0,
    width: 60,
    height: 40,
    zoom: 1,
	panning: false,
	following: null,
	panX: 0,
	panY: 0,
	zoomMove: 1,
	moveSpeed: 2,
	panSpeed: 3,
	updateTile: function(){
		this.tileX=Math.floor(this.x/tileSize);
		this.tileY=Math.floor(this.y/tileSize);
	},
	pan: function(x,y) {
		this.panning=true;
		        if(this.zoom==1)
		{
			this.panX=x-26;
			this.panY=y-20;
		}
		else if(this.zoom==2){
			this.panX=x-46;
			this.panY=y-40;
		}else if(this.zoom==3){
			this.panX=x-78;
			this.panY=y-60;
		}
		
	},
	centerX: function() {
        if(this.zoom==1)
		{
			return this.tileX+26;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.tileX+46;// * Math.pow(2, curMap.zoom-1);
		}else if(this.zoom==3){
			 return this.tileX+78;// * Math.pow(2, curMap.zoom-1);
		}

    },
	centerY: function() {
        if(this.zoom==1)
		{
			return this.tileY+20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.tileY+40;
		}else if(this.zoom==3){
			return this.tileY+60;
		}

    },
    center: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		mapDirty=true;
        if(this.zoom==1)
		{
			//tax=targ.x-26;// * Math.pow(2, curMap.zoom-1);
			tax=targ.tileX-26;
			//console.log("cioc");
			tay=targ.tileY-20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			 tax=targ.x-46;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-40;
		}else if(this.zoom==3){
			 tax=targ.x-78;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-60;
		}
        if (tax<0) {tax=0;}
        if (tay<0) {tay=0;}
        if (tax>MAP_WIDTH-this.width) {tax=MAP_WIDTH-this.width;}
        if (tay>MAP_HEIGHT-this.height) {tay=MAP_HEIGHT-this.height;}

        this.tileX=tax;
        this.tileY=tay;
    },
	centerNew: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		mapDirty=true;
        if(this.zoom==1)
		{
			//tax=targ.x-26;// * Math.pow(2, curMap.zoom-1);
			tax=targ.x-300;
			//console.log("cioc");
			tay=targ.y-300;
		}
		else if(this.zoom==2){
			 tax=targ.x-46;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-40;
		}else if(this.zoom==3){
			 tax=targ.x-78;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-60;
		}
        if (tax<0) {tax=0;}
        if (tay<0) {tay=0;}
        if (tax>MAP_WIDTH-this.width) {tax=MAP_WIDTH-this.width;}
        if (tay>MAP_HEIGHT-this.height) {tay=MAP_HEIGHT-this.height;}

        this.x=tax;
        this.y=tay;
		this.tileX=Math.floor(this.x/16);
		this.tileY=Math.floor(this.y/16);
    },
	follow: function(targ){
		this.following=targ;
	},
	unFollow: function(){
		this.following=null;
	},	isOn: function(thing)
	{
		if(((thing.x-this.tileX*tileSize)*this.zoom>0) && ((thing.x-this.tileX*tileSize)*this.zoom<CANVAS_WIDTH)&& ((thing.y-this.tileY*tileSize)*this.zoom>0) && ((thing.y-this.tileY*tileSize)*this.zoom<CANVAS_HEIGHT))
		{
			return true;
		}
		return false;
	},
	update: function(){
		this.updateTile();
		this.x=this.tileX*tileSize;
		this.y=this.tileY*tileSize;
		if (this.following)
		{
			if(!this.following.alive)
			{
				this.following=null;
				return;
			}
			this.center(this.following);
		}

		if(this.panning){
			mapDirty=true;
			if((this.tileX<this.panX)  && (this.tileX<MAP_WIDTH-(this.width* this.zoom)))
			{
				this.tileX+=this.panSpeed;
				if(this.tileX>this.panX)
				{
					this.tileX=this.panX;
				}
			}else if((this.tileX>this.panX)  && (this.tileX>1))
			{

				this.tileX-=this.panSpeed;
				if(this.tileX<this.panX)
				{
					this.tileX=this.panX;
				}
			}
			if((this.tileY<this.panY) && (this.tileY<MAP_HEIGHT-(this.height* this.zoom))) //todo
			{
				
				this.tileY+=this.panSpeed;
				if(this.tileY>this.panY)
				{
					this.tileY=this.panY;
				}
			}else if((this.tileY>this.panY) && (this.tileY>1))
			{
				this.tileY-=this.panSpeed;
				if(this.tileY<this.panY)
				{
					this.tileY=this.panY;
				}
			}
			if((this.tileX==this.panX) && (this.tileY==this.panY))
			{
				this.panning=false;
			}
			if((this.tileX>MAP_WIDTH-((this.width+this.zoom)* this.zoom)) && (this.tileY>MAP_HEIGHT-((this.height+this.zoom)* this.zoom)))
			{
				this.panning=false;
			}
			if((this.tileX<2) && (this.tileY<2))
			{
				this.panning=false;
			}
		}
		this.check();
	},
    check: function() {
		if(this.zoom==1){
			this.tileX.clamp(0, MAP_WIDTH-60);
			this.tileY.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==2){
		     this.tileX.clamp(0, MAP_WIDTH-60);
			 this.tileY.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==3){
			this.tileX.clamp(0, MAP_WIDTH-60);
			this.tileY.clamp(0, MAP_HEIGHT-40);//todo
		}
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
    },
    rX: function(fx) {
        return fx-this.tileX;
    },
    rY: function(fy) {
        return fy-this.tileY;
    }
};





function Tile() { //the Map is made of a 2D array of tiles.
    this.x = 0;
    this.y = 0;
    this.data =  0;
}
Tile.prototype.width = 16;
Tile.prototype.height = 16;
Tile.prototype.draw = function(cam) { 
    if(this.data==TileType.Grass){
        tileSprite[TileType.Grass].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==TileType.Mountains){
	tileSprite[TileType.Mountains].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==TileType.Swamp){
        tileSprite[TileType.Swamp].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==TileType.Forest){
        tileSprite[TileType.Forest].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16); 
    }else if(this.data==TileType.Water){
        tileSprite[TileType.Water+tileani].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==TileType.Plains){
        tileSprite[TileType.Plains].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==TileType.Ocean){
        tileSprite[TileType.Ocean+tileani].draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else if(this.data==42){
        watersprite.draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }else{  //if strange data, draw a solid color
        canvas.fillStyle = bColors[0]; 
        canvas.fillRect((this.x-cam.tileX)*this.width, (this.y-cam.tileY)*this.height, this.width, this.height);
    }
    if(this.cracked==1){
        crackedsprite.draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }
    if(this.platform==1){
        platformsprite.draw(canvas, (this.x-cam.tileX)*16, (this.y-cam.tileY)*16);
    }
    
};

function tileToCost(data, sqd) {
    if(sqd.getFlightHeight()>2) {return 2;}
    if(( data == TileType.Mountains ) ||( data == TileType.Ocean )) return 0;
    if(sqd.getFlightHeight()>1) {return 2;}
    if(( data == TileType.Water ) && sqd.canSwim()){ return 2;}
    if( data == TileType.Water ) {return 0;}
    if((data==TileType.Swamp ) &&(sqd.leader.class==SEEAss.Frog)) {return 2};
    if( data == TileType.Swamp  ) return 5;
    if( data == TileType.Forest  ) return 3;
    if( data == TileType.Sand  ) return 2;
    if( data == TileType.Road  ) return 1;
    return 2;
};

function mapToGraph(map, sqd) { 
    var tilesArray = [];
    for( var i=0; i<MAP_WIDTH; ++i ) {
        var rowArray = [];
        for( var j=0; j<MAP_HEIGHT; ++j ) {
            var tile = map.tiles[i][j];
            var data = tileToCost(tile.data, sqd);
            for( var ii=-1; ii<2; ++ii ) {
                for( var jj=-1; jj<2; ++jj) {
                    if( i+ii < 0 || i+ii >= MAP_WIDTH || j+jj < 0 || j+jj >= MAP_WIDTH ) {
                        continue;
                    }
                    var adjTile = map.tiles[i+ii][j+jj];
                    if( !adjTile ) continue;
                    adjData = tileToCost(adjTile.data,sqd);
                    if( data == 0 || adjData == 0 ) { data = 0; } else {
                        data = Math.max(data, adjData);
                    }
                }
            }
            rowArray.push(data);
        }
        tilesArray.push(rowArray);
    }
    return new Graph(tilesArray);
}


function Map(I) { //map object
    I = I || {};
    var i = 0;
    var j = 0;
	I.x=0;
	I.y=0;
	//list of towns
	//story file?
	//enemy unit file
    I.active = true;
    I.color = "#00A";
    I.tiles = new Array(MAP_WIDTH);
    for( i=0; i<MAP_WIDTH; i++ ) { I.tiles[i] = new Array(MAP_HEIGHT);  }
    for (i=0;i<MAP_WIDTH; i++){
        for (j=0;j<MAP_HEIGHT; j++){
            I.tiles[i][j]= new Tile();
            I.tiles[i][j].x=i;
            I.tiles[i][j].y=j;
        }
    }
    I.width = MAP_WIDTH;
    I.height = MAP_HEIGHT;

    I.getPath = function(startX, startY, endX, endY,sqd) {
        var graph = mapToGraph(I,sqd);
        return astar.search(graph.nodes, graph.nodes[startX][startY], graph.nodes[endX][endY]);
    };
	
	I.walkable=function(x,y){
		if((I.tiles[x][y].data!=TileType.Mountains)){return true;}// &&(I.tiles[x][y].data!=TileType.Ocean) &&(I.tiles[x][y].data!=TileType.Lava)) {return true;}
		return false;
	}
	
	 I.canStand = function (x,y) { //sidemode only
		/*if( !I.walls[x] || !I.walls[x][y] ) {
			  return true;
			}
		if (I.walls[x][y].data >44)   {
			return true;*/
		if (I.tiles[x][y].data ==TileType.Mountains)   {
			return true;
		}else if (false){//(I.tiles[x][y].platform){
			return true;
		}else {return false;}
    };
	
	I.stringifyTiles = function(name) {
		var tempstring= "";
		for (i=0;i<MAP_WIDTH; i++){
			for (j=0;j<MAP_HEIGHT; j++){
			tempstring = tempstring +I.tiles[i][j].data;
			tempstring += ","
			}
		}
	};
	
	I.loadTiles = function (name) {
	var hempstring=localStorage.getItem(name);
		I.buildMapFromLoadedTiles(name, hempstring);
    };
	
	I.buildMapFromLoadedTiles = function(name, hempstring) {
		tempstring=hempstring.split(",");
		for (i=0;i<MAP_WIDTH; i++){
			for (j=0;j<MAP_HEIGHT; j++){
			I.tiles[i][j].data = tempstring[j+MAP_HEIGHT*i];
			}
		}
    };
	
	I.saveTiles = function (name) {
		var tempstring = I.stringifyTiles(name);
		localStorage.setItem(name, tempstring);
	
    };
	
    
    I.drawPath = function(x,y,xx,yy) {
        var path = I.getPath(x, y, xx, yy);
        for( var i=0; i<path.length; ++i ) {
            I.setTile(path[i].x, path[i].y, 1);
        }
    };
    I.zoom = 1;
	
	I.minusScrollZoom = function(cam) {
        if (I.zoom == 1)
		{
			//I.zoom=3;cam.tileX-=20;cam.tileY-=13;
			
		} else if (I.zoom==2) 
		{
			I.zoom=1;cam.tileX+=30*Math.pow(2, I.zoom-1);cam.tileY+=20*Math.pow(2, I.zoom-1);

		} else 
		{
			I.zoom=2;cam.tileX+=30*Math.pow(2, I.zoom-1);cam.tileY+=20*Math.pow(2, I.zoom-1);			
		}
		if(cam.tileX<0)
		{
			cam.tileX=0;
		}
		if(cam.tileY<0)
		{
			cam.tileY=0;
		}
		if(I.zoom==0)
		{
			if(cam.tileX>MAP_WIDTH-60)
			{
				cam.tileX=MAP_WIDTH-60;
			}
			if(cam.tileY>MAP_HEIGHT-40)
			{
				cam.tileY=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.tileX>MAP_WIDTH-30)
			{
				cam.tileX=MAP_WIDTH-30;
			}
			if(cam.tileY>MAP_HEIGHT-20)
			{
				cam.tileY=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };
	
	I.minusZoom = function(cam) {
        if (I.zoom == 1)
		{
			//I.zoom=3;cam.tileX-=20;cam.tileY-=13;
			
		} else if (I.zoom==2) 
		{
			I.zoom=1;cam.tileX+=30*Math.pow(2, I.zoom-1);cam.tileY+=20*Math.pow(2, I.zoom-1);

		} else 
		{
			I.zoom=2;cam.tileX+=30*Math.pow(2, I.zoom-1);cam.tileY+=20*Math.pow(2, I.zoom-1);			
		}
		if(cam.tileX<0)
		{
			cam.tileX=0;
		}
		if(cam.tileY<0)
		{
			cam.tileY=0;
		}
		if(I.zoom==0)
		{
			if(cam.tileX>MAP_WIDTH-60)
			{
				cam.tileX=MAP_WIDTH-60;
			}
			if(cam.tileY>MAP_HEIGHT-40)
			{
				cam.tileY=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.tileX>MAP_WIDTH-30)
			{
				cam.tileX=MAP_WIDTH-30;
			}
			if(cam.tileY>MAP_HEIGHT-20)
			{
				cam.tileY=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };
	
    I.setZoom = function(cam) {
        if (I.zoom == 1) 
		{
			I.zoom=2;cam.tileX-=30*Math.pow(2, I.zoom-1);cam.tileY-=20*Math.pow(2, I.zoom-1);
		} else if (I.zoom==2) 
		{
			I.zoom=3;cam.tileX-=30*Math.pow(2, I.zoom-1);cam.tileY-=20*Math.pow(2, I.zoom-1);
		} else {
			//I.zoom=1;cam.tileX+=50;cam.tileY+=33;
		}
		if(cam.tileX<0)
		{
			cam.tileX=0;
		}
		if(cam.tileY<0)
		{
			cam.tileY=0;
		}
		if(I.zoom==0)
		{
			if(cam.tileX>MAP_WIDTH-60)
			{
				cam.tileX=MAP_WIDTH-60;
			}
			if(cam.tileY>MAP_HEIGHT-40)
			{
				cam.tileY=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.tileX>MAP_WIDTH-30)
			{
				cam.tileX=MAP_WIDTH-30;
			}
			if(cam.tileY>MAP_HEIGHT-20)
			{
				cam.tileY=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };

    I.draw = function(cam) {
		//console.log("yar1");
		if(!mapDirty) {return;}
		//console.log("yar");
		cam.zoom=I.zoom;
        cam.check();
		var poopx=cam.tileX+cam.width*Math.pow(2, I.zoom-1);
		var poopy=cam.tileY+cam.height*Math.pow(2, I.zoom-1);
		if(poopx>MAP_WIDTH)
		{
			//poopx=MAP_WIDTH-(cam.tileX+cam.width);
		}
		if(poopy>MAP_HEIGHT)
		{
			poopy=MAP_HEIGHT-(cam.tileY+cam.height);
		}
        for (i=Math.floor(cam.tileX);i<poopx; i+=I.zoom){
            for (j=Math.floor(cam.tileY);j<poopy; j+=I.zoom){
                var tileTypes = {};
                for( var ii=0; ii<I.zoom; ii+=1 ) {
                    if ((i+ii>=MAP_WIDTH)) { continue;}
                    for( var jj=0; jj<I.zoom; jj+=1 ) {
                        if ((j+jj>=MAP_HEIGHT)) {continue;}

                        var data = I.tiles[i+ii][j+jj];
                        if( data ) {
                            if( !tileTypes[data.data] ) { tileTypes[data.data] = 1; }
                            else{ tileTypes[data.data] += 1; }
                        }
                    }
                }
                var dominantType = {type: null, occurs: 0};

                for( var type in tileTypes ) {
                    if( tileTypes[type] && tileTypes[type] > dominantType.occurs ) {
                        dominantType.occurs = tileTypes[type];
                        dominantType.type = type;
                    }
                }
                if(dominantType.type && dominantType.type <20) {
					tileSprite[dominantType.type].draw(canvas, (i-cam.tileX)*16/Math.pow(2,I.zoom-1), (j-cam.tileY)*16/Math.pow(2,I.zoom-1));
                }else if(dominantType.type&& dominantType.type<24){
					tileSprite[20+tileani].draw(canvas, (i-cam.tileX)*16/Math.pow(2,I.zoom-1), (j-cam.tileY)*16/Math.pow(2,I.zoom-1));
				}else if (dominantType.type&& dominantType.type<28) {
					tileSprite[24+tileani].draw(canvas, (i-cam.tileX)*16/Math.pow(2,I.zoom-1), (j-cam.tileY)*16/Math.pow(2,I.zoom-1));
				}else 
				{
					tileSprite[TileType.Lava+tileani].draw(canvas, (i-cam.tileX)*16/Math.pow(2,I.zoom-1), (j-cam.tileY)*16/Math.pow(2,I.zoom-1));
				}
            }
        }
		mapDirty=false;
    };
    I.clear =function(){
        for (i=0;i<MAP_WIDTH; i++){
            for (j=0;j<MAP_HEIGHT; j++){
                I.tiles[i][j]= new Tile();
                I.tiles[i][j].x=i;
                I.tiles[i][j].y=j;
            }
        }
    };
    

    I.setTile = function (x,y,data) {
        I.tiles[x][y].data = data;
    };
    
	closeEnough=function(dba,tgb){
		if(Math.abs(dba[0]-tgb[0])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[1]-tgb[1])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[2]-tgb[2])>RGB_THRESHOLD)
		{
			return false;
		}
		return true;
	};

	I.buildMap= function(name){
        
		var imageObj = new Image();
		imageObj.onload = function() {
				mapCanvas.drawImage(imageObj, 0, 0);
				MAP_WIDTH=imageObj.width;
				MAP_HEIGHT=imageObj.height;	
				I.width=MAP_WIDTH;
				I.height=MAP_HEIGHT;
				mapBitmap = mapCanvas.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);
		for( var i=0; i<MAP_WIDTH * MAP_HEIGHT * 4; i+=4 ) {//TODO/PROBLEMMAPWIDTH?
		  var rgba = [mapBitmap.data[i], mapBitmap.data[i+1], mapBitmap.data[i+2], mapBitmap.data[i+3]];
		  var mountainrgb =[0,0,0,0];
		  var oceanrgb =[0,0,255,0];
		  var forestrgb =[0,255,0,0];
		  var sandrgb =[255,255,0,0];
		  var roadrgb =[195,195,195,0];
		  var swamprgb =[0,255,64,0];
		  var plainsrgb =[128,64,64,0];
		  var snowrgb =[230,230,230,0];
		  var waterrgb =[0,100,255,0];
		  var lavargb =[255,0,0,0];
		  var grassrgb=[255,255,255,0];
		  var yPos = Math.floor(i / 4 / MAP_WIDTH);
		  var xPos = (i / 4) % MAP_WIDTH;
		if(closeEnough(rgba,mountainrgb)) {
			I.setTile(xPos, yPos, TileType.Mountains);
		  } else if (closeEnough(rgba,forestrgb)){
			I.setTile(xPos, yPos, TileType.Forest);
		  } else if (closeEnough(rgba,oceanrgb)){
			I.setTile(xPos, yPos, TileType.Ocean);
		  } else if (closeEnough(rgba,sandrgb)){
			I.setTile(xPos, yPos, TileType.Sand);
		  } else if (closeEnough(rgba,roadrgb)){
			I.setTile(xPos, yPos, TileType.Road);
		  } else if (closeEnough(rgba,waterrgb)){
			I.setTile(xPos, yPos, TileType.Water);
		  } else if (closeEnough(rgba,plainsrgb)){
			I.setTile(xPos, yPos, TileType.Plains);
		  } else if (closeEnough(rgba,lavargb)){
			I.setTile(xPos, yPos, TileType.Lava);
		  } else if (closeEnough(rgba,swamprgb)){
			I.setTile(xPos, yPos, TileType.Swamp);
		  }else if (closeEnough(rgba,snowrgb)){
			I.setTile(xPos, yPos, TileType.Snow);
		  }else{ //if (closeEnough(rgba,grassrgb)) {
			I.setTile(xPos, yPos, TileType.Grass);
		  }
		}
		I.buildRadar();

      };
	imageObj.src = "images/"+name+".png";

    };
	
    I.buildRadar= function(){
        
       //radarCanvas.globalAlpha = 0.55;
        for (var i=0;i<MAP_WIDTH; i++){
            for (j=0;j<MAP_HEIGHT; j++){
                radarCanvas.fillStyle = tileColors[I.tiles[i][j].data];
                radarCanvas.fillRect(i, j, 2, 2);
            }
        }

        radarBitmap = radarCanvas.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);
		var idata = radarBitmap.data;
		for (var i = 0; i < idata.length; i += 4) 
		{
			idata[i+3] = 255;
		}
    };

    I.drawRadar= function (cam,x,y,arm) {
		
		//if(mode<1){return;}
		if(!starting) {return;}
        cam.check();
        //canvas.save();
        //canvas.globalAlpha = 0.55;
        canvas.putImageData(radarBitmap,x,y);
		//canvas.drawImage(radarCanvas,x,y);
        
        /*for(var i=0;i<maps[mapSelected].numTowns;i++)
        {
            canvas.fillStyle = "blue";
            if(towns[i].team==1){ canvas.fillStyle = "#FF2C85";}
            canvas.fillRect(x+towns[i].x, y+towns[i].y, 8, 8);
        }
        
        for(var i=0;i<arm[0].numSquads;i++){
            
            canvas.fillStyle = "#FFD700";
            canvas.fillRect(x+arm[0].squads[i].x, y+arm[0].squads[i].y, 4, 4);
        }
        
        for(var i=0;i<arm[1].numSquads;i++){
            
            canvas.fillStyle = "red";
            canvas.fillRect(x+arm[1].squads[i].x, y+arm[1].squads[i].y, 4, 4);
        }*///todo

        canvas.globalAlpha = 0.35;
		canvas.fillStyle = "white";
        canvas.fillRect(x+cam.tileX, y+cam.tileY, cam.width*I.zoom, cam.height*I.zoom);
		canvas.globalAlpha=1;
	   // canvas.restore();
    };
    return I;
}
