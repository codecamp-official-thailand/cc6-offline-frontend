import React, { Component } from 'react';
import { Button, Row, Col, List, Input } from 'antd';

export class TodoItem extends Component {
    state = {
        inputValue: "",
        isEdit: false,
    };

    doneFn = () => {
        const { todo, editTodo } = this.props;
        const { isEdit, inputValue } = this.state;

        editTodo(todo.id, inputValue);
        this.setState({ isEdit: !isEdit });
    };

    render() {
        const { todo, editTodo, deleteTodo } = this.props;
        const { isEdit } = this.state;

        return (
            <List.Item>
                <div style={{ width: '100%' }}>
                    {!isEdit ?
                        (
                            <Row style={{ width: '100%' }}>
                                <Col span={16}>
                                    <Row justify="start">
                                        {todo.task}
                                    </Row>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        type="primary"
                                        onClick={() => this.setState({ isEdit: !isEdit, inputValue: todo.task })}
                                    >
                                        Edit
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        type="danger"
                                        onClick={() => deleteTodo(todo.id)}
                                    >Delete</Button>
                                </Col>
                            </Row>
                        )
                        :
                        (
                            <Row>
                                <Col span={20}>
                                    <Input
                                        value={this.state.inputValue}
                                        onChange={(e) => this.setState({ inputValue: e.target.value })}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button
                                        style={{ backgroundColor: "orange" }}
                                        onClick={this.doneFn}>Done</Button>
                                </Col>
                            </Row>
                        )}
                </div>
            </List.Item>
        );
    }
}

export default TodoItem;
