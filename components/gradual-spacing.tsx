"use client";

import { Player } from "@remotion/player";
import React from "react";
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

export default () => {
  return (
    <div className="w-96 h-[216px] rounded-lg overflow-hidden border border-slate-400 bg-white">
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
          sentence: "This text animates with gradual spacing",
        }}
        component={WordsGradualSpacing}
        durationInFrames={100}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
      />
    </div>
  );
};
