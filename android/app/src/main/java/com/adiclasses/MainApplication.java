package com.adiclasses;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.maps.MapsPackage;
//import com.rnfs.RNFSPackage;
// import com.RNFetchBlob.RNFetchBlobPackage;
// import com.pritesh.calldetection.CallDetectionManager;
import com.pritesh.calldetection.CallDetectionManager;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList( 
          new MainReactPackage(),
            new BackgroundTimerPackage(),
            new RNViewShotPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new MapsPackage(),
            // new RNFSPackage(),
            // new RNFetchBlobPackage(),
            // new CallDetectionManager(),
            new CallDetectionManager(MainApplication.this),
            new RNImmediatePhoneCallPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
