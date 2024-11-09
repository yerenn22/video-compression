# Video Compression Tool

A lightweight Node.js script for compressing video files from 4K 60fps to 1080p 60fps using FFmpeg with hardware acceleration (specifically `h264_videotoolbox` for macOS). The script includes a terminal-based progress indicator to keep you updated on the compression status.

## Features

- Compresses video from 4K resolution to 1080p while maintaining 60fps.
- Utilizes FFmpeg's hardware acceleration for faster processing on macOS.
- Displays real-time compression progress in the terminal.
- Simple and user-friendly command-line interface.

## Prerequisites

- **Bun.js**: Ensure you have [Bun](https://bun.sh/) installed.
- **FFmpeg**: Make sure FFmpeg is installed and accessible in your system's PATH.
- **macOS**: The script leverages `h264_videotoolbox`, which is optimized for macOS.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/video-compression.git
   cd video-compression
   ```

2. Ensure Bun is installed. Follow the instructions on [Bun's official site](https://bun.sh/).

3. Ensure FFmpeg is installed. You can install it via [Homebrew](https://brew.sh/) with:
   ```bash
   brew install ffmpeg
   ```

## Usage

To compress a video, run the script with Bun:

```bash
bun index.ts <inputPath> <outputPath>
```

### Arguments

- `<inputPath>`: The path to the input video file.
- `<outputPath>`: The path to save the compressed video file.

### Example

```bash
bun index.ts /path/to/input_video.mov /path/to/output_video_1080p.mov
```

### Help

For detailed information, run:

```bash
bun index.ts --help
```

**Output:**

```
usage: bun index.ts <inputPath> <outputPath>

arguments:
  <inputPath>    the path to the input video file
  <outputPath>   the path to save the compressed video file

example:
  bun index.ts /path/to/input_video.mov /path/to/output_video_1080p.mov

description:
  this script compresses a 4K 60fps video down to 1080p 60fps using FFmpeg with hardware acceleration (h264_videotoolbox for macOS)
  the script also provides a progress indicator in the terminal
```

## How It Works

The script uses FFmpeg to compress the input video, applying the following settings:
- Video scaling to `1080:1920` resolution.
- Frame rate set to `60fps`.
- Hardware acceleration via `h264_videotoolbox`.

During processing, a progress indicator updates in real-time to show the percentage of the video that has been processed.

## Error Handling

If an error occurs during the process, the script will output an error message to the console. Ensure:
- The input file path is valid.
- FFmpeg is correctly installed and available in the system PATH.
- Bun is set up properly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## Author

- Yeren Kalibek / yerenn22
- [yerenn22](https://github.com/yerenn22)
