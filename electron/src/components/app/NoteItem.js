import React, { useContext } from "react";
import { Segment, Card, Label } from "semantic-ui-react";
import AppContext from "../../context/appContext";

const NoteItem = () => {
  const state = useContext(AppContext);
  const { notes } = state;

  return (
    <Segment
      className="NoteInput"
      inverted
      style={{
        width: "100%",
        maxHeight: "65vh",
        overflowY: "scroll",
        backgroundColor: "#FDD543",
      }}
    >
      {notes.map((i, k) => {
        return (
          <Segment
            raised
            key={k}
            style={{
              backgroundColor: "#C9BF77",
            }}
          >
            {i.importance && (
              <Label
                color={
                  i.importance === "Lv.1"
                    ? "grey"
                    : i.importance === "Lv.2"
                    ? "blue"
                    : i.importance === "Lv.3"
                    ? "orange"
                    : i.importance === "Lv.4"
                    ? "red"
                    : null
                }
                attached="top right"
                content={i.importance}
              />
            )}

            <Label
              size="tiny"
              color="black"
              attached="bottom left"
              content={i.date}
            />

            <Card
              header={i.title}
              description={i.content}
              style={{
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: "#F2F2EF",
              }}
            />
          </Segment>
        );
      })}
    </Segment>
  );
};

export default NoteItem;
