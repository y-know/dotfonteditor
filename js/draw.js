// JavaScript Document
window.addEventListener("load", function () 
{
    // 必要な変数を宣言しておく
    var canvas = document.getElementById("myCanvas");
    var c = canvas.getContext("2d");
    var w = 14*50;
    var h = 14*50;
	var gridNum = 14;
    var drawing = false;
    var oldPos;
	var drawColor = "black";
    // CanvasとContextを初期化する
    canvas.width = w;
    canvas.height = h;
    c.strokeStyle = "#c0c0c0";
    c.lineWidth = 1;
    c.lineJoin = "round";
    c.lineCap = "round";
	
	
	var gridArray = new Array ();
	var previewHtml = "";
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(700,0);
	c.moveTo(0,0);
	c.lineTo(0,700);

	for (var i=0;i<gridNum;i++) {
		gridArray[i] = new Array ();
		for (var p=0;p<gridNum;p++) {
			gridArray[i][p] = 0;
			previewHtml+="<div class='previewCell' id='b"+i+"_"+p+"'></div>";
            
			/*
            c.moveTo(oldPos.x, oldPos.y);
            c.lineTo(pos.x, pos.y);
            c.stroke();
			*/
			
			c.rect(i*50-0.5, p*50-0.5, 50, 50);
			c.stroke();

		}
	}
     c.closePath();
	$("#previewBox").html(previewHtml);
	
	
    // タップ開始時に、絵を描く準備をする
    canvas.addEventListener("touchstart", function (event) 
    {
        drawing = true;
        oldPos = getPosT(event);
    }, false);
    // タップ終了時に、絵を描く後処理を行う
    canvas.addEventListener("touchend", function () 
    {
		var dataNum = "";
        drawing = false;
		for (var i=0;i<gridNum;i++) {
			for (var p=0;p<gridNum;p++) {
				if (gridArray[i][p]==0) {
					$("#b"+p+"_"+i).css("background","#FFFFFF");
				} else {
					$("#b"+p+"_"+i).css("background","#000000");
				}
				if (dataNum=="") {
				}  else {
					dataNum+=",";
				}
				dataNum+=gridArray[i][p];
			}
		}
		$("#data").val(dataNum);
    }, false);
    // gestureイベント（２本指以上で触ると発生するやつ）の
    // 終了時にも絵を描く後処理を行う
    canvas.addEventListener("gestureend", function () 
    {
        console.log("mouseout");
        drawing = false;
    }, false);
    // 実際に絵を描く処理
    // 前回に保存した位置から現在の位置迄線を引く
    canvas.addEventListener("touchmove", function (event) 
    {
        var pos = getPosT(event);
        if (drawing) 
        {
            c.beginPath();
			/*
            c.moveTo(oldPos.x, oldPos.y);
            c.lineTo(pos.x, pos.y);
            c.stroke();
			*/
			var posX = Math.floor(pos.x/50);
			var posY = Math.floor(pos.y/50);
			if (drawColor == "black") {
				gridArray[posX][posY] = 1;
			} else {
				gridArray[posX][posY] = 0;
			}
			c.fillRect(posX*50, posY*50, 49, 49);
            oldPos = pos;
            c.closePath();
			
        }
    }, false);
    // タップ位置を取得する為の関数群
    function scrollX()
    {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    function scrollY()
    {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function getPosT (event) 
    {
        var mouseX = event.touches[0].clientX - $(canvas).position().left + scrollX();
        var mouseY = event.touches[0].clientY - $(canvas).position().top + scrollY();
        return {
            x : mouseX, y : mouseY
        };
    }
    // 色と線の太さを設定する関数
    $("#black").click(function () 
    {
			c.fillStyle = "rgb(0, 0, 0)";
			drawColor = "black";
    });
    $("#white").click(function () 
    {
			c.fillStyle = "rgb(255, 255, 255)";
			drawColor = "white";
    });
    // 削除ボタンの動作                                 
    $("save_button").click(function () 
    {
        
    });
}, false);