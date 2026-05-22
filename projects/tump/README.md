(wip)

# $${ \color{#22E7DF} \textsf{TUAMP: Tiny's Untitled Aero Music Player} }$$
This is a music player that I've been working on recently.
It is heavily inspired by [Frutiger aero](https://en.wikipedia.org/wiki/Frutiger_Aero) and [Windows Media Center](https://en.wikipedia.org/wiki/Windows_Media_Center)

it all started with me some while ago trying out Windows 7 in a virtual machine some weeks ago, because i wanted to see how it is to use Win7 in 2026, and i accidentally stumbled upon windows media center, and i really liked the vibe, so i extracted to my main machine and loaded my files, and it was very cool, but it had a issue, it was glitchy, the metadata wasn't correctly loading, only one album cover per folder, _unstable_, etc...

then i tried searching online ogg codecs and a way to make covers load correctly, or even an alternative, but failed miserably, and with no options left... i decided to pull up my secret card: i cried ;-;

after crying, i decided to mess arround with aero style and made the album cover wall, and then i made a little player to make it more immersive

It currently features:
- Folder importing
- The amazing cover wall
- Playback controllers
- Mobile support (kinda)
- Speed changes pitch
- Playlist importing
- Cool effects
- Playlist Exporting


You can check it out [here](https://tinyvirtual.github.io/projects/tump)

<details>
  <summary>Changelog</summary>

  **v0.1.0:**
  ```diff
Changes (this time is made by human, because fuck copilot):
+ added another metadata library, this one now also supports ogg (my most used)
+ fixed pause with space
+ fixed playlist loading issues involving not loading and "memory leaks"
+ no more other all files, all merged togheter, you gotta make the playlist manually or load a specific folder if the case
+ removed degubbing console logs
+ the code it's now sync (because i changed libs)
+ placeholder covers now coexists with other covers
+ Removed some AI Slop suggested codes
  ```
  
  **v0.0.3** 
  ```
Fixed lag, changed UI a bit, added more support to mobile, i forgot :/
Added Playlist selector
Added play track in the tracks window
Playlist exporting
Changed title from Music PLayer to TUAMP
Added spinning disk
Changing tracks logic for playback selected from tracks (i guess)
Added propper alert notification
Added all playlists
Performance based loading (because was async)
Responsiveness
Option to disable canvas
Fullscreen
I dont even know anymore ;-;
  ```
  **v0.0.1:** 
  ```md
Added the player and the controls, added `audio.preservesPitch = false`
Used canvas instead of images like ai recomended
  ```
  **v0.0.0:** 
  
  ```
Not actually a real version, it was just a prototype cover wall build by chatgpt
  ```
[^1]
</details>

-----
[^1]: disclaimer: i'm sorry for using ai initially, but the code is most part human made, except the playlist thing which was made by ai because i was on hurry and was also too lazy to remake
  we all kinda need a little boost right?
