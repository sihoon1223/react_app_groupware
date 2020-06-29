import {Component} from 'react';

class Get extends Component {
  /* 컴포넌트 생성시 */
  /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
    };
    //console.log('호출', this.props.dataType);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await fetch(this.state.url);
      const responseJson = await response.json();

      //부모에게 다시 전달
      this.props.dataFromChild(this.props.dataType, responseJson);
    } catch (error) {
      console.error('Get.js -> getData() error!\n', error);
    }
  };
  render() {
    return null;
  }
}
export default Get;
