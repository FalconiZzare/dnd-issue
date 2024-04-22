import { useState } from "react";
import { DnDItems } from "@/constants/DnDConstants.js";
import DraggableCategory from "@/DND/DraggableCategory.jsx";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const DnDLayout = () => {
  const [activeId, setActiveId] = useState(null);
  const [categories, setCategories] = useState([...DnDItems]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const getIndex = (id) => {
    if (activeId)
      return categories.findIndex((e) => e.id === id);

    return -1
  };

  const handleCatDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleCatDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over?.id) {
      // const categoryCopy = JSON.parse(JSON.stringify(categories));
      //
      // const removedCategory = categoryCopy.splice(getIndex(active.id), 1);
      // categoryCopy.splice(getIndex(over.id), 0, removedCategory[0]);
      // setCategories(categoryCopy)

      setCategories((items) => {
        const oldIndex = items.findIndex(category => category.id === active.id);
        const newIndex = items.findIndex(category => category.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      })

    }

    setActiveId(null);
  };

  const handleCatDragCancel = () => {
    setActiveId(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over?.id) return;

    //more things to be written but the layouts should not behave like this as I've seen in the examples
  }

  return (
    <div className={"flex w-full items-center justify-center px-2 py-8"}>
      <DndContext
        onDragStart={handleCatDragStart}
        onDragEnd={handleCatDragEnd}
        onDragCancel={handleCatDragCancel}
        // onDragOver={handleDragOver}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <div className={"grid grid-cols-4 w-full place-items-center gap-x-4 gap-y-6"}>
          <SortableContext items={categories} strategy={rectSortingStrategy}>

            {
              categories.map((category) => (
                <DraggableCategory key={category.id} category={category} isDragOverlay={false} />
              ))
            }

      </SortableContext>
      <DragOverlay adjustScale dropAnimation={{ duration: 400 }}>
        {activeId ? (
          <DraggableCategory isDragOverlay category={categories[getIndex(activeId)]} />
        ) : null}
      </DragOverlay>
        </div>
    </DndContext>
</div>
)
  ;
};

export default DnDLayout;