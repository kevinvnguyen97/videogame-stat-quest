import { Box } from "@chakra-ui/react";

type YouTubeIFrameProps = {
  videoId: string;
  width?: string | number;
  height?: string | number;
};
export const YouTubeIFrame = (props: YouTubeIFrameProps) => {
  const { videoId, width, height } = props;
  return (
    <Box>
      <iframe
        id={videoId}
        typeof="text/html"
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    </Box>
  );
};
