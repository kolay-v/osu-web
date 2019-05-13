import * as PIXI from 'pixi.js';
import AudioPlayer from './audioPlayer';
import OSUJson, { OSUMap } from 'osu-json';

export default class Game {
  private app: PIXI.Application;
  private player = new AudioPlayer('audio.mp3');

  public constructor() {
    this.app = new PIXI.Application();
    this.app.renderer.backgroundColor = 0xffffff;
    const gameDiv = document.getElementById('game');
    if (!gameDiv) throw new Error('game div is null');
    gameDiv.appendChild(this.app.view);
  }

  public run = async () => {
    // await this.player.inverse();
    const file = await (await fetch('easy.osu')).text();
    alert(JSON.stringify(await OSUJson.ParseOSUFileAsync(file)));
    return file;
  };
}
