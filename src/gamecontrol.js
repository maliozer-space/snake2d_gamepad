

var outputs = document.getElementsByClassName('output'),
    names = document.getElementsByTagName('h3');

            function init() {
                var listener = new GamepadListener({}, false);

                listener.on('gamepad:connected', function (e) {
                    console.log('connected', e);
                    var index = e.detail.gamepad.index,
                        id = e.detail.gamepad.id;

                    outputLog(index, "Connected: " + id, e.detail);
                    names[index].innerHTML = id;
                });

                listener.on('gamepad:disconnected', function (e) {
                    var index = e.detail.index;

                    outputLog(index, "Disconnected: " + names[index].innerHTML, e.detail);
                    names[index].innerHTML = 'gamepad has just been disconnected, press a button';
                });
//axis
                listener.on('gamepad:axis', function (e) {
                    var index = e.detail.gamepad.index,
                        axis = e.detail.axis,
                        value = e.detail.value;
                    if(value == -1 || value == 1){
                        outputLog(index, "Axis [" + axis + "]: " + value, e.detail);
                    }
                    
                    if(axis == 0 && value==1){
                        s.dir(1,0);
                    } else if(axis == 0 && value== -1){
                        s.dir(-1,0);
                    } else if(axis == 1 && value== 1){
                        s.dir(0,1);
                    } else if(axis == 1 && value== -1){
                        s.dir(0,-1);
                    }
                });
//buttons
                listener.on('gamepad:button', function (e) {
                    var index = e.detail.gamepad.index,
                        button = e.detail.index,
                        pressed = e.detail.pressed ? 'pressed' : 'released',
                        value = e.detail.value;

                    outputLog(index, "Button [" + button + "] " + pressed + ": " + value, e.detail);
                });

                listener.start();
            }

            function outputLog (index, message, detail)
            {
                
                outputs[index].innerHTML = "<p>" + message.toString() + "</p>" + outputs[index].innerHTML;
               // console.log(detail);
            }

            window.addEventListener('load', init);