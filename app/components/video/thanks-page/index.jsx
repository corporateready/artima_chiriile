import React from "react";

function WistiaVideo() {
  const [playerReady, setPlayerReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script.async = true;
    document.body.appendChild(script);

    window._wq = window._wq || [];
    window._wq.push({
      id: "a6lrr4vejf", // замените на ваш ID видео
      onReady: function (video) {
        playerRef.current = video;
        setPlayerReady(true);

        // Скрываем кнопку, когда видео начинает играть
        video.bind("play", () => {
          setIsPlaying(true);
        });
      },
    });
  }, []);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <div className="wistia_responsive_wrapper absolute top-0 left-0 w-full h-full">
        <div
          className="wistia_embed wistia_async_a6lrr4vejf"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>

      {playerReady && !isPlaying && (
        <button
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            className="w-[57rem] h-[57rem] sm:w-[80rem] sm:h-[80rem]"
            viewBox="0 0 81 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M68.7153 12.5498C61.1786 5.01309 51.1571 0.861328 40.4987 0.861328C29.8404 0.861328 19.8189 5.01309 12.2822 12.5498C4.74551 20.0865 0.59375 30.108 0.59375 40.7663C0.59375 51.4247 4.74551 61.4462 12.2822 68.9828C19.8189 76.5195 29.8404 80.6713 40.4987 80.6713C51.1571 80.6713 61.1786 76.5195 68.7153 68.9828C76.252 61.4462 80.4037 51.4247 80.4037 40.7663C80.4037 30.108 76.252 20.0865 68.7153 12.5498ZM40.4987 75.7346C21.2176 75.7346 5.53045 60.0474 5.53045 40.7663C5.53045 21.4852 21.2176 5.79803 40.4987 5.79803C59.7798 5.79803 75.467 21.4852 75.467 40.7663C75.467 60.0474 59.7798 75.7346 40.4987 75.7346Z"
              fill="url(#paint0_linear_1294_18)"
            />
            <path
              d="M29.8594 56.7287L57.7929 40.7658L29.8594 24.8047V56.7287Z"
              fill="url(#paint1_linear_1294_18)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1294_18"
                x1="13.0405"
                y1="121.783"
                x2="14.5042"
                y2="-31.2914"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#916527" />
                <stop offset="1" stopColor="#DAA22E" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1294_18"
                x1="34.2157"
                y1="73.1733"
                x2="34.8849"
                y2="11.9453"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#916527" />
                <stop offset="1" stopColor="#DAA22E" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      )}

    </div>
  );
}

export default WistiaVideo