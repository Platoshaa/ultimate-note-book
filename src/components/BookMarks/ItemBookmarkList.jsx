import AddButton from "./AddButton";
import BookMark from "./Bookmark/BookMark";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

const ItemBookMarkList = ({
  data,
  bookmark,
  addClick,
  isParent,
  click,
  rename,
}) => {
  const handleKeypress = (ev) => {
    if (Number(ev.charCode) === 13) {
      click(ev);
    }
  };

  return (
    <div className="bookmarkPlank">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          if (item.id !== undefined) {
            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <BookMark
                      style={
                        bookmark == item.id
                          ? { filter: "brightness(0.6)" }
                          : { filter: "brightness(1)" }
                      }
                      className={
                        isParent ? "itemParent item" : "item itemChild"
                      }
                      onClick={click}
                      rename={rename}
                      onKeyPress={handleKeypress}
                      key={item.id}
                      id={item.id}
                    >
                      {item.name}
                    </BookMark>
                  </div>
                )}
              </Draggable>
            );
          }
        })}

      {!bookmark && (
        <AddButton
          className={isParent ? "itemParent item" : "item itemChild"}
          onClick={addClick}
        />
      )}
    </div>
  );
};

export default ItemBookMarkList;
