function quitApp() {
    plus.runtime.quit();
}

function onPlusReady() {

    getMusicFileList();

    setTimeout(setMusicList, 1000)

}

var MusicContent = {
    "main": [

    ]
};
var player = null;

function getMusicFileList() {
    plus.io.resolveLocalFileSystemURL('file:///storage/emulated/0/Music', function(entry) {

        //alert(entry.fullPath);
        var reader = entry.createReader();
        reader.readEntries(function(entries) {

            for (var i = 0; i < entries.length; i++) {
                //alert(entries[i].fullPath);
                if (entries[i].isFile === true) {
                    var current = {
                        name: entries[i].name,
                        path: "file://" + entries[i].fullPath
                    };
                    MusicContent.main.push(current);
                }
            }
        })
        setMusicList();
        //alert(JSON.stringify(MusicContent));
    }, function(err) {
        alert(err.message);
    })


}

function startPlayMusic(path) {
    if (player != null) {
        player.close();
    }
    player = plus.audio.createPlayer(path);
    //player.setStyle('autoplay:true');

    player.play(function() {}, function(err) {
        alert(err.message)
    });
}

function pausePlayMusic() {
    player.pause();
}

function resumePlayMusic() {
    player.resume();
}

function setRangePosition() {
    p = (player.getPosition() / player.getDuration()) * 100;
    document.getElementById('slider').value = p;
}

function seekToPosition(percent) {
    var af = player.getDuration() * (percent / 100);
    af = af.toFixed(3);
    // alert(af)
    player.seekTo(af);

}

function closePlayer() {
    player.close();
}

function deleteFile(FilePath) {

}

var musicListClock = null;

function setMusicList() {
    MusicContent.main.forEach(function(item) {
        var btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerHTML = item.name;
        btn.addEventListener('click', function() {
            startPlayMusic(item.path)
            document.getElementById('music-list').style.opacity= "0";
            setTimeout(function() {
                document.getElementById('music-list').style.display = `none`;
            }, 350);
            document.getElementById('song-name').innerHTML = item.name.split('.')[0];
            document.getElementById('singer').innerHTML = item.name.split('.')[1];
        })
        btn.addEventListener('touchstart', function() {
                //在按下时开始计时
                musicListClock = setTimeout(function() {
                    //设置删除文件操作
                    document.getElementById('music-list-item-action--delete').click = function() {
                        deleteFile(item.path);
                    };
                    //设置查看属性操作
                    document.getElementById('music-list-item-action--property').click = function() {

                        }
                        //设置标记操作
                    document.getElementById('music-list-item-action--sign').click = function() {

                    }
                    clonePage('music-list-item-action')

                }, 1000);

            })
            //当取消或在1s内松开是取消计时器
        btn.addEventListener('touchend', function() {
            if (musicListClock != null) {
                clearTimeout(musicListClock);
            }
        });
        btn.addEventListener('touchcancel', function() {
            if (musicListClock != null) {
                clearTimeout(musicListClock);
            }
        })
        btn.addEventListener('touchmove', function() {
                if (musicListClock != null) {
                    clearTimeout(musicListClock);
                }
            })
            //添加元素到root
        document.getElementById('music-list-root').appendChild(btn);
    })
}