import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";

const DraggableSubCategory = ({ subCat, isDragOverlay }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: subCat?.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };

  return (
    subCat && <div
      className={cn(
        "w-full border border-black py-1",
        isDragOverlay && "border-dashed",
        isDragging && "opacity-30"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      <div className={"flex items-center justify-around w-full"}>
        <p>{subCat?.id}</p>
        <div
          className={"w-12 h-8 border border-black flex items-center justify-center cursor-grab"}
          {...(!isDragOverlay && listeners)}
          {...(!isDragOverlay && attributes)}
        >
          Drag
        </div>
      </div>
    </div>
  );
};

DraggableSubCategory.propTypes = {
  subCat: PropTypes.object,
  isDragOverlay: PropTypes.bool
};

export default DraggableSubCategory;