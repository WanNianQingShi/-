var ProgressReact = null

function applyPlayProgress() {
    if (player != null) {
        var pro = (player.getPosition() / player.getDuration()) * 100;
        document.getElementById('progress').value = pro.toString();
    } else {
        return 0;
    }
}

function togglePlay() {
    var statu = player.isPaused();
    if (player != null && player != undefined) {
        if (statu == true) {
            player.resume();
        }
        else {
            player.pause();
        }
    }
}
function addPlayerManager() {

    document.getElementById('progress').ontouchstart = function () {
        document.getElementById('progress').style.transform='scaleY(1.4) scaleX(1.1)'
        clearInterval(ProgressReact);
    }


    document.getElementById('progress').ontouchend = function () {
        document.getElementById('progress').style.transform='scaleY(1) scaleX(1)'
        var pro = document.getElementById('progress').value;
        pro = parseFloat(pro);
        //alert(pro);
        seekToPosition(pro);
        ProgressReact = setInterval(applyPlayProgress, 100);
    }

  
    setInterval(function () {
        var statu = player.isPaused();
        if (statu == false) {
            document.getElementById('control').innerHTML = `<i class='bi bi-pause-fill' style='font-size:60px'></i>`;

        }
        else if (statu == true) {
            document.getElementById('control').innerHTML = `<i class='bi bi-play-fill' style='font-size:60px'></i>`;

        }
        else {
            document.getElementById('control').innerHTML = `<i class='bi bi-play-fill' style='font-size:60px'></i>`;
        }
    }, 100)
}