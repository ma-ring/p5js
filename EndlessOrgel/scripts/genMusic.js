
class genMusic{
    //modelUrl = "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn";
    modelUrl = "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn";

    playerUrl = 'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';
    constructor(){
        this.melodyRNN = new mm.MusicRNN(this.modelUrl);
        this.melodyRNN.initialize().then(()=>{
        });

        this.player = new mm.Player();
        //new mm.SoundFontPlayer(this.playerUrl);
    }


    async generate(seed, generateTime = 10, temperature = 1.0, stepsPerQuarter = 4) {
        // シード NoteSequence を量子化
        const quantizedSeed = mm.sequences.quantizeNoteSequence(seed, stepsPerQuarter);
        // 量子化されたシードから生成
        const contSeq = await this.melodyRNN.continueSequence(quantizedSeed, generateTime, temperature);
        // シードと生成部分を連結して返す
        return mm.sequences.concatenate([contSeq]);
    }

    async play(sequence){
        sequence.notes.forEach(n => {
            //n.program = 90;
            n.velocity = 10;
        });
        //
        // 
        if (this.player.isPlaying) {
            this.player.stop(); // 前の再生を止める
        }
        this.player.start(sequence);
    }
}