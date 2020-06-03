import { Component } from "react";

export default class POST extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      header: this.props.header,
      body: this.props.body,
    };
  }
  componentDidMount() {
    this._postSurvey();
  }
  /* _postSurvey = async () => {
    fetch(url, {
      method: "POST",
      headers: this.state.header,
      body: this.state.body,
    }).then( );
  };
*/
  render() {
    return null;
  }
}
