import Loading from "../shared/Loading";

interface IDiscoverChangesProps {
  onCancel: () => void;
  isOpened?: boolean;
  startingLoader: boolean;
}

export default function DiscoverChanges({
  onCancel,
  isOpened = false,
  startingLoader = false,
}: IDiscoverChangesProps) {
  return (
    <div
      className="flex justify-between items-center gap-2 rounded-md bg-primary text-white p-2 text-[0.8rem] md:text-[1rem] absolute right-[50%] translate-x-[50%] min-w-[90%] md:min-w-[30rem] z-50"
      style={{
        bottom: isOpened ? "2%" : "-100%",
        display: isOpened ? "flex" : "none",
      }}
    >
      <h4>قمت ببعض التعديلات هل تريد حفظها؟</h4>
      <div className="flex flex-row-reverse gap-2 font-normal text-primary-dark text-[0.8rem]">
        <button
          tabIndex={1}
          disabled={startingLoader}
          className="px-4 py-0.5 bg-white cursor-pointer rounded-md shadow-[3px_3px_0_0_rgb(0,0,0)] transition hover:shadow-none hover:scale-95"
        >
          {startingLoader ? <Loading /> : "حفظ"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
          className="px-4 py-0.5 bg-white cursor-pointer rounded-md shadow-[3px_3px_0_0_rgb(0,0,0)] transition hover:shadow-none hover:scale-95"
        >
          تجاهل
        </button>
      </div>
    </div>
  );
}
