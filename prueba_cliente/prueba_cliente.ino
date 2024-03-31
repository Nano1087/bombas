#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;

// Sustituir por los datos de vuestro WiFi
#include "data.h"
String url = "http://192.168.1.4:3000/respuestaesp8266/";
int Motor = 2;
boolean Estado = false;
void setup(){

   pinMode(Motor, OUTPUT);
  digitalWrite(Motor, 0);
  const uint32_t TiempoEsperaWifi = 5000;
  WiFiServer servidor(80);
  Serial.begin(115200);
  delay(10);

  // Conectar WiFi
  wifiMulti.addAP(ssid_1, password_1);
  wifiMulti.addAP(ssid_2, password_2);

  WiFi.mode(WIFI_STA);
  Serial.print("Conectando a Wifi ..");
  while (wifiMulti.run(TiempoEsperaWifi) != WL_CONNECTED) {
    Serial.print(".");
  }
  Serial.println(".. Conectado");
  Serial.print("SSID: ");
  Serial.print(WiFi.SSID());
  Serial.print(" ID: ");
  Serial.println(WiFi.localIP());

 servidor.begin();
}

void MotorOn(){
  digitalWrite(Motor, HIGH);
  Serial.println("Motor encenddio");
}
void MotorOff(){
  digitalWrite(Motor,LOW);
  Serial.println("Motor apagado");
}

void loop(){

  HTTPClient http;
  WiFiClient client;

  if (http.begin(client, url)) //Iniciar conexión
  {
    Serial.print("[HTTP] GET...\n");
    int httpCode = http.POST("");  // Realizar petición
    Serial.print("[enviando peticion\n");

    if (httpCode > 0) {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String respuesta = http.getString();  // Obtener respuesta
        Serial.println(respuesta);  // Mostrar respuesta por serial
          if (respuesta == "encender"){
        Serial.println("El motor 1 ha encedido");
        MotorOn();
          }
  
          if (respuesta == "apagar"){
           Serial.println("El motor 1 ha apagado");
        MotorOff();
        }
      }
    }
    else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }
  else {
    Serial.printf("[HTTP} Unable to connect\n");
  }

  delay(30000);


}
