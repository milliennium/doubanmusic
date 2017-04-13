$('.twonode').on('mousemove',function () {
			$('.na_secimg').css('display','block')
		}).on('mouseout',function () {
			$('.na_secimg').css('display','none')
		});
		$('.na_secimg').on('mousemove',function () {
			$(this).css('display','block')
		}).on('mouseout',function () {
			$(this).css('display','none')
		});
		$('.firform').on('click',function () {
			return false;
		})
		$('.inp_inp').on('click',function () {
			$('.no_result').remove();
			$('.res_h2').css('display','block');
			var inp_input = document.getElementsByClassName('inp_input')[0];
			$.ajax({
				url:'https://api.douban.com/v2/music/search',
				data: {q:inp_input.value,start: 0, count: 20},
				async: true,
				dataType: 'jsonp',
				success: function(data) {
					console.log(data);
					var len = data.musics.length;

					for(var i = 0;i < len; i++) {
						
						$('<div class="result"></div>').appendTo('.result_list');
					}
					$('<div class="pic">').appendTo('.result');
					$('<div class="content">').appendTo('.result');
					$('<a>').appendTo('.pic');
					$('<img>').appendTo('.result .pic a');
					for(var i = 0;i < len; i++) {
						$('.result .pic a img').eq(i).attr('src',data.musics[i].image);
						$('.result .pic a').eq(i).attr('href',data.musics[i].mobile_link);
					}
					$('<div class="title">').appendTo('.content');
					$('<h3>').appendTo('.content .title');
					$('<span>[音乐]&nbsp;</span>').appendTo('.content .title h3');
					$('<a>').appendTo('.content .title h3');
					for(var i = 0; i < len; i++) {
						$('.content .title h3 a').eq(i).html(data.musics[i].title);
						$('.content .title h3 a').eq(i).attr('href',data.musics[i].mobile_link);
					}
					$('<div class="rating-info">').appendTo('.content .title');
					$('<span class="allstar">').appendTo('.rating-info');
					for(var i = 0; i < len; i++) {
						var starposition = (10-Math.ceil(data.musics[i].rating.average))*(-11)+"px";
						$('.allstar').eq(i).css({'background-image':'url(https://img3.doubanio.com/f/shire/b8f4c3672ef81106701071831e22422a745d3b74/pics/rating_icons/ic_rating_s.png)','background-position-y':starposition})
					}
					$('<span class="rating_nums">').appendTo('.rating-info');
					for(var i = 0; i < len; i++) {
						$('.rating_nums').eq(i).html(data.musics[i].rating.average);
					}
					$('<span class="numcount">').appendTo('.rating-info');
					for(var i = 0; i < len; i++) {
						$('.numcount').eq(i).html('('+data.musics[i].rating.numRaters+')');
					}
					
					$('<span class="subject-cast">').appendTo('.rating-info');
					for(var i = 0; i < len; i++) {
							for (var j = 0; j < data.musics[i].tags.length; j++) {
								$('.subject-cast').eq(i).html((data.musics[i].attrs.singer[0]+'/')+ (data.musics[i].tags[j].name == '流行' ? '' : '流行/') + (data.musics[i].attrs.pubdate[0].split('-')[0])      );
							}
					}
					$('<p>').appendTo('.content');
					for(var i = 0;i < len; i++) {
						$('.content p').eq(i).html('这个真没有--')
					}
					$('<div class="result-list-ft">').appendTo('.result_list');
					$('<a class="more">').appendTo('.result-list-ft');
					$('.result-list-ft a').html('显示更多');
					var listindex = 20;
					$('.result-list-ft').on('click',function() {
							$.ajax({
								url:'https://api.douban.com/v2/music/search',
								data: {q:inp_input.value,start: listindex, count: 20},
								async: true,
								dataType: 'jsonp',
								success: function(data) {console.log(data);
									var litotal = $('.result').length;
									console.log(litotal);
									var getnum = ((data.total-litotal)>20) ? 20 : data.total-litotal;
									
									var j = 0;
									for(var i = 0;i < getnum; i++) {
										$('<div class="result"></div>').insertBefore('.result-list-ft');
									}
									for(var i = listindex;i < listindex+getnum;i++) {
										$('<div class="pic">').appendTo($('.result')[i]);
										$('<div class="content">').appendTo($('.result')[i]);
										$('<a>').appendTo($('.pic')[i]);
										$('<img>').appendTo($('.result .pic a')[i]);
										$('.result .pic a img').eq(i).attr('src',data.musics[j].image);
										$('.result .pic a').eq(i).attr('href',data.musics[j].mobile_link);
										$('<div class="title">').appendTo($('.content')[i]);
										$('<h3>').appendTo($('.content .title')[i]);
										$('<span>[音乐]&nbsp;</span>').appendTo($('.content .title h3')[i]);
										$('<a>').appendTo($('.content .title h3')[i]);
										$('.content .title h3 a').eq(i).html(data.musics[j].title);
										$('.content .title h3 a').eq(i).attr('href',data.musics[j].mobile_link);
										$('<div class="rating-info">').appendTo($('.content .title')[i]);
										$('<span class="allstar">').appendTo($('.rating-info')[i]);
										var starposition = (10-Math.ceil(data.musics[j].rating.average))*(-11)+"px";
										$('.allstar').eq(i).css({'background-image':'url(https://img3.doubanio.com/f/shire/b8f4c3672ef81106701071831e22422a745d3b74/pics/rating_icons/ic_rating_s.png)','background-position-y':starposition});
										$('<span class="rating_nums">').appendTo($('.rating-info')[i]);
										$('.rating_nums').eq(i).html(data.musics[j].rating.average);
										$('<span class="numcount">').appendTo($('.rating-info')[i]);
										$('.numcount').eq(i).html('('+data.musics[j].rating.numRaters+')');
										$('<span class="subject-cast">').appendTo($('.rating-info')[i]);
										for (var m = 0; m < data.musics[j].tags.length; m++) {
											$('.subject-cast').eq(i).html(((data.musics[j].attrs.singer||'')[0]||'')+ '/' + (data.musics[j].tags[m].name == '流行' ? '' : '流行/') + ((data.musics[j].attrs.pubdate||'')[0]||''.split('-')[0]))
										}
										// $('.subject-cast').eq(i).html(((data.musics[j].attrs.singer||'')[0]||'')+'/'+
										// 	((data.musics[j].attrs.pubdate||'')[0]||''.split('-')[0])

										// 	);
										$('<p>').appendTo($('.content')[i]);
										$('.content p').eq(i).html('这个真没有--')
										j++;
										if($('.result').length==data.total) {
											$('.result-list-ft a').html('没有更多啦');
										}
									}
									listindex+=20;
								},
								type: 'GET'
							});
					})
				},
				type: 'GET'
			});
		})
		var originaltop = $('.search_cate ul').offset().top - 30;
		$(window).on('scroll',function() {
			if($(window).scrollTop()>200) {
				var newscrollTop = document.documentElement.scrollTop||document.body.scrollTop - originaltop + 'px';
				$('.search_cate ul').css('position','relative').css('top',newscrollTop)
			}else{
				$('.search_cate ul').css('position','static')
			}
				
		})