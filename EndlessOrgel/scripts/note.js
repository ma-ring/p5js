let oscs = [];
let CELL = 20;
var notes = [ 48, 50, 52, 53, 55, 57, 59,
	            60, 62, 64, 65, 67, 69, 71,
						  72, 74, 76, 77, 79, 81, 83];
var osc,env,osc1;

function soundinit(){
	
	for(var i = 0; i < CELL;i++){
		var nimod = i%21;
		var ni = floor(nimod/21);
		var n = new myNote(notes[nimod]+ni*21);
		oscs.push(n);
	}
	
}


function myNote(note){
	this.note = note;
	this.freq = midiToFreq(note);
	this.osc = new p5.Oscillator('sine');
    
    this.osc.start();
    this.osc.amp(0);

	this.play = function(){
        this.osc.freq(this.freq);
  	    this.osc.amp(0.001, 0.1);

        setTimeout(() => {
            this.osc.amp(0);
        }, 500);
	}
	
}
function midiToFreq(midiNote) {
    // MIDIノート番号から周波数を計算
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

class orgenNote{
	constructor(){
		
	}
}