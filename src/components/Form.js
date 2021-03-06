import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  state = {
    errMessage: null
  }
  handleFormSubmit = async (event, requestType, articleID) => {
    event.preventDefault();

    const postObj = {
      title: event.target.elements.title.value,
      content: event.target.elements.content.value
    };

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };

    if (requestType === "post") {
      await axios
        .post("http://127.0.0.1:8000/api/create/", postObj)
        .then(res => {
          if (res.status === 201) {
            this.props.history.push(`/posts`);
          }
        }).catch(err => {
          if(err) {
            this.setState({
              errMessage: 'you have to be an admin user to create a post!'
            })
          }
        })
        ;
    } else if (requestType === "put") {
      await axios
        .put(`http://127.0.0.1:8000/api/${articleID}/update/`, postObj)
        .then(res => {
          if (res.status === 200) {
            this.props.history.push(`/`);
          }
        });
    }
  };

  render() {
    const {errMessage} = this.state;
    return (
      <div>
        {errMessage && <p style={{color: 'red'}}>{errMessage}</p>}
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <FormItem label="Title">
            <Input name="title" placeholder="Put a title here" />
          </FormItem>
          <FormItem label="Content">
            <Input name="content" placeholder="Enter some content ..." />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default withRouter(connect(mapStateToProps)(CustomForm));
