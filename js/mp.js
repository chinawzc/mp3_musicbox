$(function(){

		$("audio").get(0).play();

		//暂停、播放
		var r=1; // 1是播放-1是暂停
		$("#pause").click(function(){
			if (r==1) {
				$("audio").get(0).pause();
				$(".cd_tou").css({"animation-play-state":"paused"});
				$(".circle").css({"animation-play-state":"paused"});
				$("#pause").css('background','url(img/pause.png)');
				r*=-1;
			}else{
				$("audio").get(0).play();
				$(".cd_tou").css({"animation-play-state":"running"});
				$(".circle").css({"animation-play-state":"running"});
				$("#pause").css('background','url(img/run.png)');
				r*=-1;
			}
		})

		//刷新
		$("#rfre").click(function(){
			auplay()
		})


		//歌曲切换
		var sty=1;//sty=1为顺序播放
		var curr=0;
		var sSrc=["music/演员 - 薛之谦.mp3","music/丑八怪 - 薛之谦.mp3","music/绅士 - 薛之谦.mp3","music/一半 - 薛之谦.mp3","music/认真的雪薛之谦.mp3","music/Alan Walker - Faded.mp3","music/Maroon 5 - Animals.mp3","music/Ellie Goulding - Love Me Like You Do.mp3","music/杨浩龙 - 杀猪刀.mp3","music/久石譲 (Joe Hisaishi)(邻家的龙猫).mp3"];
		$(".circle").find("img").eq(0).addClass("imgshow");
		$(".list").eq(0).addClass("show");

		//curr值


		//下一首
		$("#next").click(function(){
			switch(sty){
				case 1:curr++;
					break;
				case 2:var a=Math.floor(Math.random()*10);curr=a;
					break;
				case 3:curr=curr;
					break;
			}
			auplay();
		})

		//上一首
		$("#pre").click(function() {
			switch(sty){
				case 1:curr--;
					break;
				case 2:var a=Math.floor(Math.random()*10);curr=a;
					break;
				case 3:curr=curr;
					break;
			}
			auplay()
		});

		//随机
		$("#shuffle").click(function(){
			sty+=1;
			if (sty==4) {
				sty=1
			};
			if (sty==0) {
				sty=3
			}
			switch(sty){
				case 1:$("#shuffle").css('background','url(img/seque.png)');
					break;
				case 2:$("#shuffle").css('background','url(img/shuffle.png)');
					break;
				case 3:$("#shuffle").css('background','url(img/single.png)');
					break;
			}
			// var a=Math.floor(Math.random()*4);
			// curr=a;
			// auplay()
		})


		//播放第c个
		function auplay(){
			if (curr<0) {
				curr=9
			};
			if(curr>9){
				curr=0
			};
			$(".sour").attr('src',sSrc[curr]);
			$(".list").eq(curr).addClass("show");
			$(".list").eq(curr).siblings().removeClass("show");
			//$(".circle").find("img").eq(curr).addClass("imgshow");
			//$(".circle").find("img").eq(curr).siblings().removeClass("imgshow");
			$("audio").get(0).load();
			if (r==1) {
				$("audio").get(0).play();
			}
		}



		//显示时间和进度条和歌曲结束时的播放
		var timer=setInterval(function(){
			var min=Math.floor(parseInt($("audio").get(0).currentTime)/60);
			var sec=parseInt($("audio").get(0).currentTime)%60;
			var dmin=Math.floor(parseInt($("audio").get(0).duration)/60);
			var dsec=parseInt($("audio").get(0).duration)%60;
			var  timeratio=parseInt($("audio").get(0).currentTime)/parseInt($("audio").get(0).duration);
			var  b=200*timeratio;
			if (sec<10&&dsec<10) {
				$("#autime").html(min+":"+"0"+sec+"/"+dmin+":"+"0"+dsec)
			}
			if(sec<10&&dsec>10){
				$("#autime").html(min+":"+"0"+sec+"/"+dmin+":"+dsec)
			}
			if(sec>10&&dsec<10){
				$("#autime").html(min+":"+sec+"/"+dmin+":"+"0"+dsec)
			}
			if(sec>10&&dsec>10){
				$("#autime").html(min+":"+sec+"/"+dmin+":"+dsec);
			}

			$("#bar").get(0).style.width=b+"px";
			if (timeratio==1) {
				//alert(sty);
				//alert(timeratio);
				switch(sty){
					case 1:curr++;
						break;
					case 2:var a=Math.floor(Math.random()*10);curr=a;
						break;
					case 3:curr=curr;
						break;
				}
				auplay()
			}
		},50);


		//音量控制
		convol=$("audio").get(0).volume=0.5;
		$("#plus").click(function(){
			//alert($("audio")[0].duration);
			if (convol=$("audio").get(0).volume<1) {
				convol=$("audio").get(0).volume+=0.125;
			}
			volimg()
		});
		$("#minus").click(function(){
			if (convol=$("audio").get(0).volume>0) {
				convol=$("audio").get(0).volume-=0.125;
			}
			volimg()
		});
		//音量大小图片
		function volimg(){
			if (convol=$("audio").get(0).volume==0) {
				$('#vol').find('img').attr('src','img/v0.png')
			}else if(convol=$("audio").get(0).volume==0.25){
				$('#vol').find('img').attr('src','img/v1.png')
			}else if(convol=$("audio").get(0).volume==0.5){
				$('#vol').find('img').attr('src','img/v2.png')
			}else if(convol=$("audio").get(0).volume==0.75){
				$('#vol').find('img').attr('src','img/v3.png')
			}
		}



})
