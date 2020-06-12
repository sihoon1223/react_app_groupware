//
//  ShowMap.m
//  mobileBizApp
//
//  Created by kimsihoon on 2020/06/11.
//
#import <AVFoundation/AVFoundation.h>
#import "ShowMap.h"

@import AVFoundation;

@interface ShowMap () {
  MTMapView *_mapView;
  BOOL isMapRotationUsing;
}
@end

@implementation ShowMap

- (void)viewDidLoad {
  [super viewDidLoad];
  isMapRotationUsing = NO;
  // create _mapView
  _mapView = [[MTMapView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), CGRectGetHeight(self.view.frame))];
  _mapView.baseMapType = MTMapTypeHybrid;
  NSLog(@".....! 호출dasd2");
  [self.view addSubview:_mapView];
  
}

- (void)viewWillDisappear:(BOOL)animated {
  if (_mapView != nil) {
    _mapView = nil;
  }
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showKakaoMap:(RCTResponseSenderBlock)callback) {
  AVAudioSession *session = [AVAudioSession sharedInstance]; //예제 코드 따온거 의미x
  NSLog(@"showKakaoMap");
  callback(@[[NSNull null], @([session outputVolume])]);
}



@end
