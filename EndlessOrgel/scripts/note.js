let oscs = [];
let CELL = 50;
var notes = [ 48, 50, 52, 53, 55, 57, 59,
	            60, 62, 64, 65, 67, 69, 71,
						  72, 74, 76, 77, 79, 81, 83];
var osc,env,osc1;

function soundinit(){
	env = new p5.Envelope();
	
	for(var i = 0; i < CELL;i++){
		var nimod = i%21;
		var ni = floor(nimod/21);
		var n = new myNote(notes[nimod]);
		oscs.push(n);
	}
	
}


function myNote(note){
	this.freq = midiToFreq(note);
	this.osc = new p5.Oscillator('sine');
    
    this.osc.start();
    this.osc.amp(0);

	this.play = function(){
        this.osc.freq(this.freq);
  	    this.osc.amp(0.5, 0.5);

        setTimeout(() => {
            this.osc.amp(0);
        }, 1000);
	}
	
}