import React from 'react';
import './App.css';
import axios from './config/axios.setup';
import { notification, Input, Row, Col, Button, List, Descriptions } from 'antd';
import TodoItem from './components/TodoItem/TodoItem';

class App extends React.Component {

  state = {
    todoList: [],
    inputValue: ""
  };

  fetchTodo = async () => {
    const response = await axios.get("/todos");
    console.log(response);
    this.setState({
      todoList: response.data
    });
  };

  deleteTodo = (id) => {
    axios.delete(`/todos/${id}`)
      .then(res => {
        notification.success({
          message: `ลบ Todo id: ${id} เรียบร้อยแล้ว`
        });

        this.fetchTodo();
      })
      .catch(err => {
        notification.error({
          message: `something went wrong`
        });
      });

  };

  editTodo = (id, updatedTodo) => {
    axios.patch(`/todos/${id}`, { task: updatedTodo })
      .then(res => {
        notification.success({
          message: `Edit ${id}`,
        });

        this.fetchTodo();
      })
      .catch(err => {
        notification.error({
          message: `Edit ${id}`,
        });
      });
  };

  addTodo = () => {
    const { inputValue } = this.state;

    axios.post("/todos", { task: inputValue })
      .then(res => {
        console.log("ok");
        notification.success({
          placement: 'bottomRight',
          message: `เพิ่ม ${inputValue} แล้วน๊ะจ๊ะ`,
          duration: 1
        });
        this.fetchTodo();
      })
      .catch(err => {
        console.log("error");
      });

    this.setState({ inputValue: "" });
  };

  componentDidMount() {
    this.fetchTodo();
  }

  render() {
    const { inputValue, todoList } = this.state;

    return (
      <div className="App" >
        <br />
        <br />
        <br />
        <Row justify="center">
          <Col span={8}>
            <Input
              value={inputValue}
              onChange={(e) => this.setState({ inputValue: e.target.value })} />
          </Col>
          <Col span={2}>
            <Button onClick={this.addTodo}>Add Todo</Button>
          </Col>
        </Row>
        <Row style={{ margin: '20px' }} justify="center">
          <Col style={{ width: "100%" }} span={16}>
            <List
              header={<div>This is TodoList</div>}
              bordered
              dataSource={todoList}
              renderItem={todo => (
                <TodoItem
                  todo={todo}
                  editTodo={this.editTodo}
                  deleteTodo={this.deleteTodo}
                />
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;