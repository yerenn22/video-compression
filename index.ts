#!/usr/bin/env bun

import { spawn } from "child_process";

function compressVideo(
  inputFilePath: string,
  outputFilePath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i", inputFilePath,
      "-vf", "scale=1080:1920",
      "-r", "60",
      "-c:v", "h264_videotoolbox",
      outputFilePath,
    ]);

    let duration = 0;
    let timeProcessed = 0;

    ffmpeg.stderr.on("data", (data: Buffer) => {
      const output = data.toString();

      const durationMatch = output.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);

      if (durationMatch) {
        const hours = parseInt(durationMatch[1], 10);
        const minutes = parseInt(durationMatch[2], 10);
        const seconds = parseFloat(durationMatch[3]);

        duration = hours * 3600 + minutes * 60 + seconds;
      }

      const timeMatch = output.match(/time=(\d+):(\d+):(\d+\.\d+)/);

      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const seconds = parseFloat(timeMatch[3]);

        timeProcessed = hours * 3600 + minutes * 60 + seconds;

        const percent = (timeProcessed / duration) * 100;

        if (!isNaN(percent)) {
          process.stdout.write(
            `\rcompession progress: ${percent.toFixed(2)}%\r`,
          );
        }
      }
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log("\nvideo compression complete");

        resolve();
      } else {
        reject(new Error(`FFmpeg process exited with code ${code}`));
      }
    });

    ffmpeg.on("error", (error) => {
      reject(new Error(`failed to start FFmpeg process: ${error.message}`));
    });
  });
}

const args = process.argv.slice(2);

if (args.includes("--help")) {
  console.log(`
usage: bun compress-video.ts <inputPath> <outputPath>

arguments:
  <inputPath>    the path to the input video file
  <outputPath>   the path to save the compressed video file

example:
  bun compress-video.ts /path/to/input_video.mov /path/to/output_video_1080p.mov

description:
  this script compresses a 4K 60fps video down to 1080p 60fps using FFmpeg with hardware acceleration (h264_videotoolbox for macOS)
  the script also provides a progress indicator in the terminal
`);
  process.exit(0); // Выход после отображения помощи
}

if (args.length < 2) {
  console.error("please, provide both input and output file paths");
  console.error("use --help for more information");

  process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

compressVideo(inputPath, outputPath)
  .then(() => {
    console.log("video compression finished successfully");
  })
  .catch((error) => {
    console.error("an error occurred:", error.message);
  });
