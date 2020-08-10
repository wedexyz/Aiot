#include <Wire.h>
#include <ESP8266WiFi.h>                                              
#include <FirebaseArduino.h>   
#include <Adafruit_MLX90614.h>

#define FIREBASE_HOST "megaboth007.firebaseio.com"                  
#define FIREBASE_AUTH "0hpnoqJQ5lQBFfnfWrSfplWa3ugIb71e4yO9ZZGN"                  
#define WIFI_SSID "dataku"                                          
#define WIFI_PASSWORD "widiwinata"    


Adafruit_MLX90614 mlx = Adafruit_MLX90614(); 
 int trigPin = D5;  
 int echoPin = D6;  
 int distance;
 long duration;

int ledPin1 = D3;   
int ledPin2 = D4;   
int ledPin3 = D7;   
int ledPin4 = D8; 

void setup() {
  
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                      
  Serial.print("Connecting to ");
  while (WiFi.status() != WL_CONNECTED) {
    //Serial.print(".");
   delay(500);
  }
   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);  
}


void dimer(){
  for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
    analogWrite(ledPin1, fadeValue);
    analogWrite(ledPin2, fadeValue);
    analogWrite(ledPin3, fadeValue);
    analogWrite(ledPin4, fadeValue);
    delay(25);
  }

  for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
    analogWrite(ledPin1, fadeValue);
    analogWrite(ledPin2, fadeValue);
    analogWrite(ledPin3, fadeValue);
    analogWrite(ledPin4, fadeValue);
    delay(25);
  }
  
  
}

void ultrasonic(){              
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT); 
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance= duration*0.034/2;
  Firebase.setFloat("Jarak", distance);
  }
void sensorsuhu(){           
  mlx.begin();  
  Firebase.setFloat("Ambientc", mlx.readAmbientTempC());
  Firebase.setFloat("Ambientf", mlx.readAmbientTempF());
  Firebase.setFloat("Suhuc", mlx.readObjectTempC());
  Firebase.setFloat("Suhuf", mlx.readObjectTempF());
  }
void loop() {
  sensorsuhu();
  ultrasonic();
 
  if (distance < 5 ){
    dimer();
    }
  
  
  Serial.print("jarak = ");Serial.print(distance);Serial.println("*Cm");
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempC()); 
  Serial.print("*C\tObject = "); Serial.print(mlx.readObjectTempC()); Serial.println("*C");
  Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF()); 
  Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); Serial.println("*F");
  
  
 


  
 }
