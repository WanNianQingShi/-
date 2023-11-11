function getOnlineSearchResult(keyWord) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {

            //console.log(typeof (ajax.responseText));

            var res = JSON.parse(ajax.responseText);

            document.getElementById('online-music-result--item-root').innerHTML = ''

            res.result.songs.forEach((e) => {
                var item = document.createElement('button');

                item.classList.add('list-item');

                item.innerHTML = e.name

                item.value = JSON.stringify(e);
                //设置每个item
                item.setAttribute('onclick', `setOnlineSourceObserverPage(event)`)


                //
                var artist = document.createElement('label');

                artist.classList.add('artist');

                var shelf = '';

                e.artists.forEach((e) => {
                    shelf = shelf + e.name + ' ';
                })

                artist.innerHTML = shelf;

                item.appendChild(artist);

                document.getElementById('online-music-result--item-root').appendChild(item)
            })

            clonePage('online-music-result')


        }
    }
    ajax.open("GET", `http://cloud-music.pl-fe.cn/search?keywords=${keyWord}`, true);
    ajax.send();
}

function outSearchResult() {
    //输出搜索结果
    var point = document.getElementsByName('online-music-search--input');
    point = point[point.length - 1];
    var key = point.value;
    getOnlineSearchResult(key);
}

function setOnlineSourceObserverPage(e) {
    var obj = e.target.value;                  //获取被点击对象的value,赋值给obj
    obj = JSON.parse(obj);
    document.getElementById('online-music-observer--artist').innerHTML = '';
    document.getElementById('online-music-observer--album').innerHTML = '';
    document.getElementById('online-music-observer--name').innerHTML = obj.name;
    //设置作者信息
    obj.artists.forEach((event) => {
        var artNode = document.createElement('button');
        artNode.classList.add('list-item')
        artNode.innerHTML = event.name;
        document.getElementById('online-music-observer--artist').appendChild(artNode);
    })
    //设置专辑信息
    var albumNode = document.createElement('button');
    albumNode.classList.add('list-item');
    albumNode.innerHTML = obj.album.name;
    document.getElementById('online-music-observer--album').appendChild(albumNode);
    //
    //设置在线播放操作

    document.getElementById('online-music-observer--stream-play').setAttribute('onclick', `playStreamMusic(event)`);
    var musicAuthorStr=''

    obj.artists.forEach((event) => {
        musicAuthorStr=musicAuthorStr+' '+event.name
    })
    
    var musicInfo = {
        id: obj.id,
        songName:obj.name,
        author:musicAuthorStr
    }
    document.getElementById('online-music-observer--stream-play').value = JSON.stringify(musicInfo);  //给在线播放按钮设置value

    clonePage('online-music-observer')
}

function playStreamMusic(e) {
    var node = e.target;
    var musicInfo = JSON.parse(node.value);
    console.log(node.value)
    //设置音乐名，作者
    document.getElementById('song-name').innerHTML =musicInfo.songName;
    document.getElementById('singer').innerHTML =musicInfo.author;
        //执行播放操作
        startPlayMusic(`http://music.163.com/song/media/outer/url?id=${musicInfo.id}.mp3`);
    //关闭所有窗口
    document.querySelectorAll('.page').forEach((item) => {
        //判断时候为常住窗口
        if (item.style.display === `block` && item.getAttribute('property') !== 'ignore-copy') {
            item.style.opacity = '0';
            item.style.transform = 'scale(3)';
            setTimeout(function () { item.remove(); }, 400);
        } else if (item.style.display === `block` && item.getAttribute('property') === 'ignore-copy') {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    })
}

