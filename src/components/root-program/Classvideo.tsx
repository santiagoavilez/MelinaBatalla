
import { $lessonsatom } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";
import { AlertCircleIcon } from "lucide-react";



export default function Classvideo({ videoId, lessonId }: {
    videoId: string;
    lessonId: number;
}) {

    const lessonsArray = useStore($lessonsatom);
    const isAvailable = lessonsArray[lessonId - 1]?.isCompleted || lessonId === 0;
    console.log('isAvailable', isAvailable);

    return (
        <>
            {isAvailable ? <div
                data-name={"video-iframe"}
                data-lesson-id={lessonId}
                data-video-id={videoId}
                className="w-full"
            >
                <iframe
                    id={`panda-${videoId}`}
                    title="clase de video"
                    src={`https://player-vz-c8120ef3-31f.tv.pandavideo.com/embed/?v=${videoId}`}
                    className="w-full aspect-video rounded-lg"
                    allowFullScreen

                ></iframe>
            </div>
                :
                <div id="alert-video" className="w-full aspect-video  bg-marmol rounded-lg">
                    <div
                        className="w-full md:text-2xl flex md:flex-col gap-2 justify-center text-center items-center h-full p-4 md:px-20"
                    >
                        <AlertCircleIcon className="text-red-500  w-1/4 h-1/4" />
                        Debes completar la leccion anterior para poder ver este video
                    </div>
                </div>}
        </>
    )
}



