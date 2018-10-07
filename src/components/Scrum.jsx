import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : null,

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : null,
  padding: grid,
  width: 250
});

class Scrum extends Component {
  filterTasks = status => this.props.tasks.filter(
      task => task.status == status
    ).map(task => ({id: task.id, name:task.name, body:task.body}));

  getStatus = id => id=='plan'?0:(id=='process'?1:2);

  onDragEnd = event => { //обработчки конца перемещения получает источник и приемник
      const { source, destination } = event;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId !== destination.droppableId) {
          this.props.changeStatus({id: event.draggableId, status:this.getStatus(destination.droppableId)});
      }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let data ={
      plan: this.filterTasks(0),
      process: this.filterTasks(1),
      completed: this.filterTasks(2)
    };

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="plan">
          {(provided, snapshot) => ( 
            <div className="list-group-item m-1"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              <h4>План</h4>
              {data.plan.map((item, index) => (
                  <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                          <div className="list-group-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                              )}>
                              {item.name}
                          </div>
                      )}
                  </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="process">
          {(provided, snapshot) => (
            <div className="list-group-item m-1"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              <h4>В процессе</h4>
              {data.process.map((item, index) => (
                  <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                          <div className="list-group-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                              )}>
                              {item.name}
                          </div>
                      )}
                  </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed">
          {(provided, snapshot) => (
            <div className="list-group-item m-1"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              <h4>Готово</h4>
              {data.completed.map((item, index) => (
                  <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                          <div className="list-group-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                              )}>
                              {item.name}
                          </div>
                      )}
                  </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    </DragDropContext>
    );
  }
}

export default connect(
  state => ({tasks : state.tasks}),
  dispatch => ({
    changeStatus: payload => dispatch({type: 'CHANGE_STATUS', payload})})
)(Scrum);