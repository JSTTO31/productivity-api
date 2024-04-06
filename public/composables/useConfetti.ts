export default () => {
  const celebrationAudio : HTMLAudioElement = document.getElementById('audio-celebration') as HTMLAudioElement
  if(celebrationAudio){
    celebrationAudio.play()
    celebrationAudio.volume = 1
  }
  //@ts-ignore
  confetti({
    scalar: 1.1,
    particleCount: 100,
    angle: 1, // Straight up
    colors: [
      "#ff4500", // OrangeRed
      "#9370db", // MediumPurple
      "#ffa500", // Orange
    ],
    spread: 155,
    velocity: 200,
    origin: { x: 0.2, y: 0 }, // Bottom center
  });
  //@ts-ignore
  confetti({
    scalar: 1.1,
    particleCount: 100,
    angle: 1, // Straight up
    colors: [
      "#ff4500", // OrangeRed
      "#9370db", // MediumPurple
      "#ffa500", // Orange
    ],
    spread: 155,
    velocity: 200,
    origin: { x: 0.8, y: 0 }, // Bottom center
  });
};
