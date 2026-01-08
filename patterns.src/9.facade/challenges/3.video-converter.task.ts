/**
 * CHALLENGE 3: VIDEO CONVERSION PIPELINE (YouTube Style)
 *
 * CONTEXT:
 * Processing a video upload involves many complex, low-level steps:
 * Loading the file -> Checking the Codec -> Extracting Audio -> Transcoding Video -> Mixing Audio back -> Saving.
 *
 * GOAL:
 * Create a `VideoConverterFacade` that offers a simple method: `convert(filename, format)`.
 *
 * REQUIREMENTS:
 * The facade must coordinate:
 * 1. `VideoLoader`: Loads specific file.
 * 2. `BitrateReader`: generic read buffer logic.
 * 3. `CodecFactory`: extracts the source codec.
 * 4. `Transcoder`: converts buffer to new format.
 * 5. `AudioMixer`: fixes audio sync.
 *
 * This is a classic "Pipeline" facade.
 */

class VideoFile {
    constructor(private name: string) { }
}

class CodecFactory {
    extract(file: VideoFile) { console.log("Extracting codec info..."); return "mp4"; }
}

class BitrateReader {
    static read(file: VideoFile, codec: string) { console.log("Reading buffer..."); return "buffer-data"; }
    static convert(buffer: string, fromCodec: string, toCodec: string) { console.log("Processing buffer..."); return "new-buffer"; }
}

class AudioMixer {
    fix(result: string) { console.log("Fixing audio..."); return "final-video-data"; }
}

export class VideoConverterFacade {
    // TODO: Coordinate the subsystems
    private file?: VideoFile
    private codec: CodecFactory
    private audioMixer: AudioMixer
    constructor (){
        this.codec= new CodecFactory()
        this.audioMixer = new AudioMixer()
    }
    convert(filename: string, format: string): string {
         this.file = new VideoFile(filename)

        console.log(`--- Conversion started: ${filename} to ${format} ---`);
        // 1. Load file
        // 2. Extract codec

        // 3. Read & Convert
        let sourceCode = this.codec.extract(this.file)
       let buffer =  BitrateReader.read(this.file, sourceCode)
       let transcoded =  BitrateReader.convert(buffer, sourceCode, format)
        // 4. Fix Audio
        return this.audioMixer.fix(transcoded)
    }
}

// --- TEST CASE ---
try {
    const converter = new VideoConverterFacade();
    const result = converter.convert("funny-cat.mov", "mp4");
    console.log("Result:", result);

} catch (e) {
    console.error(e);
}
