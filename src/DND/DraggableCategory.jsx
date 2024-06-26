import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";
import DraggableSubCategory from "@/DND/DraggableSubCategory.jsx";
import { DragOverlay } from "@dnd-kit/core";

const DraggableCategory = ({ category, isDragOverlay }) => {
  const { isDragging, active, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category?.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transformOrigin: "0 0 ",
    transition
  };

  return (
    category && <div
      className={cn(
        "h-[500px] w-[450px] border border-black flex flex-col items-start justify-around p-4 gap-4",
        isDragOverlay && "border-dashed",
        isDragging && "opacity-30"
      )}
      {...(!isDragOverlay && { ref: setNodeRef })}
      {...(!isDragOverlay && { style: style })}
    >
      <div className={"flex items-center justify-around w-full"}>
        <p>{category?.id}</p>
        <div
          className={"w-12 h-10 border border-black flex items-center justify-center cursor-grab"}
          {...(!isDragOverlay && listeners)}
          {...(!isDragOverlay && attributes)}
        >
          Drag
        </div>
      </div>
      <div className={"h-full w-full overflow-auto"}>
        {/*<SortableContext items={category?.items} strategy={rectSortingStrategy}>*/}
          <div className={"border border-black flex flex-col gap-2 p-4 "}>
            {
              category?.items.map((subCat) => (
                <DraggableSubCategory subCat={subCat} key={subCat.id} />
              ))
            }
          </div>
        {/*</SortableContext>*/}
        {/*<DragOverlay>*/}
        {/*  {active?.id ? (*/}
        {/*    <DraggableSubCategory isDragOverlay subCat={category?.items[0]} /> //for testing we are showing item 0 as overlay.*/}
        {/*  ) : null}*/}
        {/*</DragOverlay>*/}
      </div>
    </div>
  );
};

DraggableCategory.propTypes = {
  category: PropTypes.object,
  isDragOverlay: PropTypes.bool.isRequired
};

export default DraggableCategory;