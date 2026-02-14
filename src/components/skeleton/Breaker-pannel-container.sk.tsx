export default function BreakerPannelContainer() {
  return Array.from({ length: 8 }).map((_, Idx) => {
    return (
      <div key={Idx} className="animate-pulse bg-white rounded-md rounded-bl-none rounded-br-none shadow-[0_2px_5px_rgb(0,0,0,0.1)] border border-primary flex-1 min-w-64">
        <h1 className="w-[80%]  p-4 py-2 my-2 mx-6 rounded bg-gray-300"></h1>
        <header className="flex flex-col gap-2 px-2">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </header>
      </div>
    );
  });
}

function CardSkeleton() {
  return (
    <div className="flex items-start gap-2 px-2 py-1  shadow-sm bg-white rounded-sm">
      <span className="w-12 h-12  rounded-full bg-gray-300"></span>
      <div className="w-full space-y-2 my-auto">
        <h2 className="w-16 h-2 bg-gray-300"></h2>
        <h6 className="w-20 h-3 bg-gray-300"></h6>
      </div>
    </div>
  );
}
