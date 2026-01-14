import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const ModelContext = createContext<any>(null);

function Open({
  children,
  opens: openWindowName,
}: {
  children: ReactNode;
  opens: string;
}) {
  const { open } = useContext(ModelContext);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Close({ children }: { children: React.ReactNode }) {
  const { close } = useContext(ModelContext);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: () => close() });
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const { openName } = useContext(ModelContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="flex justify-center items-center fixed inset-0 bg-[rgba(0,0,0,.4)] z-100">
      <div className="w-[90vw] md:w-fit p-4 rounded-sm bg-white">
        {children}
      </div>
    </div>,
    document.body
  );
}

const Model = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const open = setOpenName;

  const value = {
    close,
    open,
    openName,
  };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};

Model.Open = Open;
Model.Close = Close;
Model.Window = Window;

export default Model;
