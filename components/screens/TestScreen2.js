import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  requireNativeComponent,
  findNodeHandle,
  NativeModules,
  Platform,
  Button,
  PermissionsAndroid,
  View,
  StyleSheet,
} from 'react-native';
import NavigationHeader from '../component/NavigationHeader';
import MapSearchHeader from '../component/MapSearchHeader';
//import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
let REST_API_KEY = '';
const DaumMapManager =
  Platform.OS === 'ios'
    ? NativeModules.DaumMapManager
    : NativeModules.DaumMapModule;

//requireNativeComponent: view 부르는 함수
const DaumMap = requireNativeComponent('DaumMap', TestScreen2, {
  nativeOnly: {
    onMarkerSelect: true,
    onMarkerPress: true,
    onRegionChange: true,
  },
});

export default class TestScreen2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissionGranted: false,
      //ios_latitude: '',
      //ios_longitude: '',
    };
  }

  // 현재 디바이스의 위치 권한 여부 검사
  async componentDidMount() {
    console.log('componentDidMount');
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: this.props.PermissionsAndroidTitle,
            message: this.props.PermissionsAndroidMessage,
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({permissionGranted: true});
        } else {
          this.setState({permissionGranted: false});
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS 면.. ?
      //if (hasLocationPermission) {
      // Geolocation.getCurrentPosition(
      //   position => {
      //     console.log(
      //       'pos!:' +
      //         position.coords.latitude +
      //         ',' +
      //         position.coords.longitude,
      //     );
      //     this.setState({
      //       // ios_latitude: position.coords.latitude,
      //       // ios_longitude: position.coords.longitude,
      //       ios_latitude: '37.403104',
      //       ios_longitude: '127.110941',
      //     });
      //   },
      //   error => {
      //     // See error code charts below.
      //     console.log('err:' + error.code, error.message);
      //   },
      //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      // );
      // // }
      this.setState({permissionGranted: true});
    }
  }

  render() {
    console.log('render');
    if (this.state.permissionGranted) {
      return (
        <View style={styles.container}>
          <MapSearchHeader navigation={this.props.navigation} />
          <Button title="현재위치" />
          <DaumMap
            {...this.props}
            //latitude={this.state.ios_latitude}
            //longitude={this.state.ios_longitude}
            style={[{width: '100%', height: '100%'}, this.props.style]}
            ref={(ref) => {
              this.map = ref;
            }}
            onMarkerSelect={this._onMarkerSelect}
            onMarkerPress={this._onMarkerPress}
            onMarkerMoved={this._onMarkerMoved}
            onRegionChange={this._onRegionChange}
            onUpdateCurrentLocation={this._onUpdateCurrentLocation}
            onUpdateCurrentHeading={this._onUpdateCurrentHeading}
          />

          {/* <View style={{position: 'absolute'}}>
            <MapSearchHeader />
          </View> */}
        </View>
      );
    } else {
      return <View style={{flex: 1}}>{this.props.permissionDeniedView}</View>;
    }
  }

  _onMarkerSelect = (event) => {
    if (this.props.onMarkerSelect != undefined) {
      this.props.onMarkerSelect(event.nativeEvent);
    }
  };

  _onMarkerPress = (event) => {
    if (this.props.onMarkerPress != undefined) {
      this.props.onMarkerPress(event.nativeEvent);
    }
  };

  _onMarkerMoved = (event) => {
    if (this.props.onMarkerMoved != undefined) {
      this.props.onMarkerMoved(event.nativeEvent);
    }
  };

  _onRegionChange = (event) => {
    if (this.props.onRegionChange != undefined) {
      this.props.onRegionChange(event.nativeEvent);
    }
  };

  _onUpdateCurrentLocation = (event) => {
    console.log(
      '_onUpdateCurrentLocation호출/ location 값:',
      this.props.onUpdateCurrentLocation,
    );

    if (this.props.onUpdateCurrentLocation != undefined) {
      this.props.onUpdateCurrentLocation(event.nativeEvent);
    }
  };

  _onUpdateCurrentHeading = (event) => {
    if (this.props.onUpdateCurrentHeading != undefined) {
      this.props.onUpdateCurrentHeading(event.nativeEvent);
    }
  };

  /************************************************************************************************
   * Daum Map Function
   ************************************************************************************************/
  clearMapCache() {
    DaumMapManager.clearMapCache(findNodeHandle(this.map));
  }

  /************************************************************************************************
   * Daum Local API
   ************************************************************************************************/
  // REST API Key
  static setRestApiKey(apiKey) {
    REST_API_KEY = apiKey;
  }

  // 주소 검색
  // https://developers.kakao.com/docs/restapi/local#주소-검색
  static serachAddress(query, page = 1, size = 10) {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (query == undefined || query == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '검색할 주소를 입력 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('search/address.json', {
      query: query,
      page: page,
      size: size > 30 ? 30 : size,
    });

    return requestDaumAPI(url, option);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.clearMapCache;
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  // }

  // 좌표 → 행정구역정보 변환
  // https://developers.kakao.com/docs/restapi/local#좌표-행정구역정보-변환
  static getCoordToRegionArea(
    latitude,
    longitude,
    input_coord = 'WGS84',
    output_coord = 'WGS84',
    lang = 'ko',
  ) {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (latitude == undefined || latitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '위도 값을 입력 해 주세요.'});
      });
    }
    if (longitude == undefined || longitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '경도 값을 입력 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('geo/coord2regioncode.json', {
      x: longitude,
      y: latitude,
      input_coord: input_coord,
      output_coord: output_coord,
      lang: lang,
    });

    return requestDaumAPI(url, option);
  }

  // 좌표 → 주소 변환
  // https://developers.kakao.com/docs/restapi/local#좌표-주소-변환
  static getCoordToAddress(latitude, longitude, input_coord = 'WGS84') {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (latitude == undefined || latitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '위도 값을 입력 해 주세요.'});
      });
    }
    if (longitude == undefined || longitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '경도 값을 입력 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('geo/coord2address.json', {
      x: longitude,
      y: latitude,
      input_coord: input_coord,
    });

    return requestDaumAPI(url, option);
  }

  // 좌표계 변환
  // https://developers.kakao.com/docs/restapi/local#좌표계-변환
  static transCoord(
    latitude,
    longitude,
    input_coord = 'WGS84',
    output_coord = 'WGS84',
  ) {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (latitude == undefined || latitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '위도 값을 입력 해 주세요.'});
      });
    }
    if (longitude == undefined || longitude == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '경도 값을 입력 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('geo/transcoord.json', {
      x: longitude,
      y: latitude,
      input_coord: input_coord,
      output_coord: output_coord,
    });

    return requestDaumAPI(url, option);
  }

  // 키워드로 장소 검색
  // https://developers.kakao.com/docs/restapi/local#키워드로-장소-검색
  static searchKeyword(
    query,
    category = '',
    latitude = undefined,
    longitude = undefined,
    radius = 500,
    page = 1,
    size = 15,
    sort = 'accuracy',
  ) {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (query == undefined || query == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '검색어를 입력 해 주세요.'});
      });
    }
    if (sort != 'accuracy' && sort != 'distance') {
      sort = 'accuracy';
    }

    let params = {
      query: query,
      page: page > 45 ? 45 : page,
      size: size > 15 ? 15 : size,
      sort: sort,
    };

    if (category != undefined && category != '') {
      // 카테고리 그룹 코드. 결과를 카테고리로 필터링을 원하는 경우 사용
      params.category_group_code = category;
    }
    if (latitude != undefined) {
      // 중심 좌표의 Y값 혹은 latitude. 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
      params.y = latitude;
    }
    if (longitude != undefined) {
      // 중심 좌표의 X값 혹은 longitude. 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
      params.x = longitude;
    }
    if (radius != undefined) {
      // 중심 좌표부터의 반경거리. 특정 지역을 중심으로 검색하려고 할 경우 중심좌표로 쓰일 x,y와 함께 사용. 단위 meter
      if (radius >= 0 && radius <= 20000) {
        params.radius = radius;
      }
    } else {
      return new Promise(function (resolve, reject) {
        reject({message: '반경 거리는 20km 이내로 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('search/keyword.json', params);

    return requestDaumAPI(url, option);
  }

  // 카테고리로 장소 검색
  // https://developers.kakao.com/docs/restapi/local#카테고리로-장소-검색
  static searchCategory(
    category,
    latitude = undefined,
    longitude = undefined,
    radius = 500,
    page = 1,
    size = 15,
    sort = 'accuracy',
  ) {
    if (REST_API_KEY == '') {
      return new Promise(function (resolve, reject) {
        reject({message: 'Daum Rest API Key가 필요합니다.'});
      });
    }
    if (category == undefined || category == '') {
      return new Promise(function (resolve, reject) {
        reject({message: '카테고리를 입력 해 주세요.'});
      });
    }
    if (latitude == undefined || longitude == undefined) {
      return new Promise(function (resolve, reject) {
        reject({message: '위경도를 입력 해 주세요.'});
      });
    }

    let params = {
      category_group_code: category,
      page: page > 45 ? 45 : page,
      size: size > 15 ? 15 : size,
      sort: sort,
    };

    if (latitude != undefined) {
      // 중심 좌표의 Y값 혹은 latitude. 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
      params.y = latitude;
    }
    if (longitude != undefined) {
      // 중심 좌표의 X값 혹은 longitude. 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
      params.x = longitude;
    }
    if (radius != undefined) {
      // 중심 좌표부터의 반경거리. 특정 지역을 중심으로 검색하려고 할 경우 중심좌표로 쓰일 x,y와 함께 사용. 단위 meter
      if (radius >= 0 && radius <= 20000) {
        params.radius = radius;
      }
    } else {
      return new Promise(function (resolve, reject) {
        reject({message: '반경 거리는 20km 이내로 해 주세요.'});
      });
    }

    let option = makeRequestHeader();
    let url = makeRequestURL('search/category.json', params);

    return requestDaumAPI(url, option);
  }
}

function makeRequestHeader() {
  let option = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'KakaoAK ' + REST_API_KEY,
    },
  };

  return option;
}

function makeRequestURL(url, params) {
  if (params != undefined && typeof params === 'object') {
    let paramUrl = '';
    for (let key in params) {
      let concatStr = paramUrl.length == 0 ? '?' : '&';
      paramUrl += concatStr + key + '=' + params[key];
    }

    url += paramUrl;
  }

  return url;
}

function requestDaumAPI(url, option) {
  return new Promise(function (success, failed) {
    var errorFlag = false;

    fetch('https://dapi.kakao.com/v2/local/' + url, option)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          failed({message: 'Server request error'});
        }
      })
      .then((responseJson) => {
        if (!errorFlag) success(responseJson);
      })
      .catch((error) => {
        errorFlag = true;
        failed(error);
      });
  });
}

TestScreen2.propTypes = {
  onMarkerSelect: PropTypes.func,
  onMarkerPress: PropTypes.func,
  onRegionChange: PropTypes.func,
  onUpdateCurrentLocation: PropTypes.func,
  onUpdateCurrentHeading: PropTypes.func,
};

TestScreen2.defaultProps = {
  style: {},
  isTracking: false,
  isCompass: false,
  isCurrentMarker: true,

  permissionDeniedView: null,
  PermissionsAndroidTitle: '권한 요청',
  PermissionsAndroidMessage: '지도 표시를 위해 권한을 허용 해 주세요.',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
});
