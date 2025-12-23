/**
 * SCENARIO: A Music Application
 * INITIAL REQUIREMENT: Calculate duration of Songs and Playlists.
 * NEW REQUIREMENT: Add "Podcasts", "Audiobooks", and "Commercials".
 */

// ==========================================
// 🔴 APPROACH 1: WITHOUT PATTERN (The "Simplicity" Trap)
// ==========================================

class SimpleSong { constructor(public name: string, public duration: number) { } }
class SimplePodcast { constructor(public name: string, public duration: number) { } }
class SimpleAudiobook { constructor(public name: string, public duration: number) { } }
class SimpleAd { constructor(public name: string, public duration: number) { } }

class SimplePlaylist {
    public songs: SimpleSong[] = [];
    // 🚩 MAINTENANCE NIGHTMARE: Every new type requires a NEW array in the container
    public podcasts: SimplePodcast[] = [];
    public audiobooks: SimpleAudiobook[] = [];
    public ads: SimpleAd[] = [];
    public playlists: SimplePlaylist[] = [];

    constructor(public name: string) { }
}


function calculateDuration(playlists: SimplePlaylist): number {
    let totalDuration = 0
    for (let song of playlists.songs) {
        totalDuration += song.duration
    }

    for (let podcasts of playlists.podcasts) {
        totalDuration += podcasts.duration
    }
    for (let ads of playlists.ads) {
        totalDuration += ads.duration
    }
    for (let audiobook of playlists.audiobooks) {
        totalDuration += audiobook.duration
    }


    for (let nestedPlaylists of playlists.playlists) {
        totalDuration += calculateDuration(nestedPlaylists)
    }
    return totalDuration
}




// Now with composite pattern

interface IPlayable {
    getDuation(): number
}

class Songs implements IPlayable {
    constructor(name: string, private duration: number) {

    }
    getDuation(): number {
        return this.duration
    }
}

class Audiobooks implements IPlayable {
    constructor(name: string, private duration: number) {
    }
    getDuation(): number {
        return this.duration
    }
}

class Ads implements IPlayable {
    constructor(name: string, private duration: number) { }
    getDuation(): number {
        return this.duration
    }
}

class Playlists implements IPlayable {
    duration: number = 0
    playlist: IPlayable[] = []
    constructor() { }
    add(item: IPlayable) {
        this.playlist.push(item)
    }
    getDuation(): number {
        this.playlist.forEach(o => {
            this.duration += o.getDuation()
        })
        return this.duration
    }

}

let playlist = new Playlists()
playlist.add(new Ads("Facebook", 5))
playlist.add(new Songs("Marron 5", 50))
playlist.add(new Audiobooks("Influce Friends and Family", 500))

console.log("Total playlist time spent: ", playlist.getDuation())

// ==========================================
// � APPROACH 2: WITH COMPOSITE PATTERN
// ==========================================

interface Playable {
    getDuration(): number;
}

class Song implements Playable {
    constructor(private name: string, private duration: number) { }
    getDuration(): number { return this.duration; }
}

// 🎉 Adding a new type is TRIVIAL. No existing code changes.
class Podcast implements Playable {
    constructor(private name: string, private duration: number) { }
    getDuration(): number { return this.duration; }
}
class Audiobook implements Playable {
    constructor(private name: string, private duration: number) { }
    getDuration(): number { return this.duration; }
}

class Playlist implements Playable {
    private items: Playable[] = []; // Only ONE list for everything

    add(item: Playable) { this.items.push(item); }

    // 🎉 The logic NEVER CHANGES. Even if you add 50 new types.
    getDuration(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getDuration();
        }
        return total;
    }
}

// --- VERIFICATION ---
console.log("--- APPROACH 2 (Composite) ---");
const mainPlaylist = new Playlist("My Mix");
mainPlaylist.add(new Song("Song A", 300));
mainPlaylist.add(new Podcast("Tech Talk", 3600));
mainPlaylist.add(new Audiobook("Harry Potter", 80000));

console.log(`Total Duration: ${mainPlaylist.getDuration()}`);