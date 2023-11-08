### Patika VakıfBank Fullstack dev. Bitirme projesi

#Kurulum

Repoyu bilgisayarınıza kaydettikten sonra backend için ilgili paketlerin yüklü olduğundan emin olun.(dotnet etc.)
terminalden migration dosyanız yoksa Vk.Data dizinine gelip 

dotnet ef migrations add Initial -s ../VkApi/ 

komutunu çalıştırın.

ardındand bi üst dizine çıkıp ;

dotnet ef database update --project  "./Vk.Data" --startup-project "./VkApi"

komutu ile migration işleminizi tamamlayın.

Önyüzün olduğu dizinde terminale npm install komutu ile gerekli kütüphaneleri indirin. Npm start ile başlıyabilir. (Nodejs gerekli.)


###Backend Api Dökümantasyonu

#/vk/api/v1/Addreses get()

input beklemeden adminin bütün adreslere ulaşmasını sağlar;

#/vk/api/v1/Addreses post()

userid'si verilmiş usera adress eklemeye yarar;

örnek json;
```javascript
{
  "userId": 0,
  "addressLine1": "string",
  "addressLine2": "string",
  "city": "string",
  "county": "string",
  "postalCode": "string"
}
```


