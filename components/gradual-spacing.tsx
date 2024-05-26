"use client";

import { Player } from "@remotion/player";
import React, { useState } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

const GradualSpacingSchema = z.object({
  sentence: z.string(),
  duration: z.number().optional(),
  delayMultiple: z.number().optional(),
});

export type WordsGradualSpacingProps = z.infer<typeof GradualSpacingSchema>;

export const WordsGradualSpacing: React.FC<WordsGradualSpacingProps> = ({
  sentence,
  duration = 0.5,
  delayMultiple = 0.015,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // const totalDuration = sentence.length * delayMultiple * fps;
  const totalFrames = duration * fps;

  const _chars = sentence.split("");

  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
        display: "flex",
      }}
      className={`text-center font-bold tracking-tighter text-black drop-shadow-sm items-center justify-center`}
    >
      {_chars.map((char, i) => {
        const startFrame = i * delayMultiple * fps;
        const opacity = interpolate(
          frame,
          [startFrame, startFrame + totalFrames],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        const fontScale = interpolate(
          frame,
          [startFrame, startFrame + totalFrames],
          [0.97, 1],
          { extrapolateRight: "clamp" }
        );
        const translateX = interpolate(
          frame,
          [startFrame, startFrame + totalFrames],
          [0, 10],
          { extrapolateRight: "clamp" }
        );
        return (
          <span
            key={i}
            style={{
              fontSize: 80 * fontScale,
              opacity,
              transform: `translateX(${translateX}px)`,
              display: "inline-block",
            }}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};
// COMPONENT_END

export default () => {
  const [sentence, setsentence] = useState(
    "This text animates with gradual spacing!"
  );

  const [fps, setfps] = useState(30);

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="w-full sm:w-96 aspect-video rounded-lg overflow-hidden border border-slate-400 bg-white">
        <Player
          loop
          controls
          allowFullscreen
          autoPlay
          clickToPlay
          style={{
            width: "100%",
            height: "100%",
          }}
          inputProps={{
            sentence,
          }}
          component={WordsGradualSpacing}
          durationInFrames={3 * fps}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={fps}
        />
      </div>

      <div className="flex flex-col w-full sm:w-max gap-3">
        <div className="flex flex-col w-full">
          Change text:
          <input
            type="text"
            defaultValue={sentence}
            onChange={(e) => setsentence(e.target.value)}
            className="border h-14 p-2 w-full border-slate-400 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          FPS:
          <select
            value={fps}
            onChange={(e) => setfps(parseInt(e.target.value))}
            className="border w-20 h-14 p-2 pl-3 border-slate-400 rounded-lg"
          >
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="120">120</option>
          </select>
        </div>
      </div>
    </div>
  );
};
