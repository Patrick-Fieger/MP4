#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>
#include <Bridge.h>
#include <HttpClient.h>

#define PN532_IRQ   (6)
#define PN532_RESET (3)

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

void setup(void) {

  pinMode(13, OUTPUT);
  
  Serial.begin(115200);
  Serial.println("Hello!");
  
  nfc.begin();
  Bridge.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
    while(!versiondata)
    {
      uint32_t versiondata = nfc.getFirmwareVersion();
      if (! versiondata)
     {
    Serial.println("Didn't find PN53x board Motherfucker");
    delay (400);
    }
  }
  
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  nfc.SAMConfig();
  
  Serial.println("Waiting for an ISO14443A Card ...");
}

void loop(void) {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  
  uint8_t uidLength;                        

  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  if (success) {
    
    Serial.println("Found an ISO14443A card");
    Serial.print("size: "+ sizeof(uid));
    Serial.println("");
    Serial.print("  UID Length: ");
    Serial.print(uidLength, DEC);
    Serial.println(" bytes");

    String getParam = "";
    
    Serial.print("  UID Value: ");
    nfc.PrintHex(uid, uidLength);
    Serial.println("-------");
    for(int i = 0; i <= uidLength; i++){
      Serial.print(i);
      Serial.print(" - ergibt: ");
      Serial.print(uid[i]);
      
      getParam += uid[i];
      
      Serial.println("");
    }
    Serial.print("Param: ");
    Serial.print(getParam);
    Serial.println("");
    Serial.println("----- HTTP REQUEST ------------");

    digitalWrite(13, HIGH);
    
    HttpClient client;
    client.get("http://46.101.241.120:3000/arduino?id="+getParam);
    //client.get("http://kaz.kochab.uberspace.de/MP3/api/test?id="+getParam);
    while (client.available()) {
      char c = client.read();
      Serial.print(c);
    }

    
    Serial.println("---- // HTTP REQUEST ------------");
    Serial.println("");
        
    if (uidLength == 4)
    {
      Serial.println("Seems to be a Mifare Classic card (4 byte UID)");
      Serial.println("Trying to authenticate block 4 with default KEYA value");
      uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };
      
      success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 4, 0, keya);
	  
      if (success)
      {
        Serial.println("Sector 1 (Blocks 4..7) has been authenticated");
        uint8_t data[16];
		
        success = nfc.mifareclassic_ReadDataBlock(4, data);
		
        if (success)
        {
          Serial.println("Reading Block 4:");
          nfc.PrintHexChar(data, 16);
          Serial.println("");
          delay(1000);
        }
        else
        {
          Serial.println("Ooops ... unable to read the requested block.  Try another key?");
        }
      }
      else
      {
        Serial.println("Ooops ... authentication failed: Try another key?");
      }
    }
    
    if (uidLength == 7)
    {
      Serial.println("Seems to be a Mifare Ultralight tag (7 byte UID)");

      Serial.println("Reading page 4");
      uint8_t data[32];
      success = nfc.mifareultralight_ReadPage (4, data);
      if (success)
      {
        nfc.PrintHexChar(data, 4);
        Serial.println("");
        
        delay(1000);
      }
      else
      {
        Serial.println("Ooops ... unable to read the requested page!?");
      }
    }
  }
}

