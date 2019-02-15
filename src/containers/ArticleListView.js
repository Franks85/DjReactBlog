import React, { Fragment } from "react";
import axios from "axios";
import Articles from "../components/Article";
import CustomForm from "../components/Form";
import { connect } from "react-redux";

class ArticleList extends React.Component {
  state = {
    articles: []
  };

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({
        articles: res.data.results
      });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();
    }
  }

  render() {
    return (
      <div>
        <Articles data={this.state.articles} /> <br />
        {this.props.isAuthenticated && (
          <Fragment>
            <h2> Create an article </h2>
            <CustomForm requestType="post" articleID={null} btnText="Create" />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token
  };
};

export default connect(mapStateToProps)(ArticleList);
