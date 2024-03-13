import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";

const DraggableCategory = ({ category, isDragOverlay }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };

  return (
    <div
      className={cn(
        "h-[500px] w-[450px] border border-black flex flow-row items-start justify-around p-8",
        isDragOverlay && "border-dashed",
        isDragging && "opacity-30"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      <p>{category.id}</p>
      <div
        className={"w-12 h-10 border border-black flex items-center justify-center cursor-grab"}
        {...(!isDragOverlay && listeners)}
        {...(!isDragOverlay && attributes)}
      >
        Drag
      </div>
    </div>
  );
};

DraggableCategory.propTypes = {
  category: PropTypes.object.isRequired,
  isDragOverlay: PropTypes.bool.isRequired
};

export default DraggableCategory;