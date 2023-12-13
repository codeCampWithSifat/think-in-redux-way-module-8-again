import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content = null;
  // decide what to render
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = (
      <>
        {" "}
        <Error message="There Was An Error" />
      </>
    );
  }

  if (!isLoading && !isError && videos.length === 0) {
    content = (
      <>
        <Error message="No Videos Found" />
      </>
    );
  }

  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return <>{content}</>;
}
