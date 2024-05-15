import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Plugins } from '@capacitor/core';
import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';



const { BiometricAuth } = Plugins;

@Injectable()

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(){
    
  }

  

  logout() {
    
  }


  authenticateWithBiometrics(): Promise<boolean> {
    console.log("authenticationpart enter");

    return new Promise((resolve, reject) => {
      console.log("authenticationpart return part");

      BiometricAuth['authenticate']().then(result => {
        if (result.success) {
          console.log("authenticationpart success");

          resolve(true); // Biometric authentication successful
        } else {
          console.log("authenticationpart error");

          reject(result.error); // Biometric authentication failed
        }
      }).catch(error => {
        reject(error); // Error occurred during biometric authentication
      });
    });
  }


  async performBiometricVerificatin(){
    const result = await NativeBiometric.isAvailable();
    console.log("performinsert");
    if(!result.isAvailable) return;
  
    const isFaceID = result.biometryType == BiometryType.FACE_ID;
    console.log("performinsert");
  
    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => true)
      .catch(() => false);
  
    if(!verified) return;
    console.log("performinsert");
  
    
  }
}
