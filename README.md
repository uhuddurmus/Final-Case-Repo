### Patika VakıfBank Fullstack dev. Bitirme projesi

### Kurulum

Repoyu bilgisayarınıza kaydettikten sonra backend için ilgili paketlerin yüklü olduğundan emin olun.(dotnet etc.)
terminalden migration dosyanız yoksa Vk.Data dizinine gelip 

dotnet ef migrations add Initial -s ../VkApi/ 

komutunu çalıştırın.

ardındand bi üst dizine çıkıp ;

dotnet ef database update --project  "./Vk.Data" --startup-project "./VkApi"

komutu ile migration işleminizi tamamlayın.

Önyüzün olduğu dizinde terminale npm install komutu ile gerekli kütüphaneleri indirin. Npm start ile başlıyabilir. (Nodejs gerekli.)

### Statüler

    pending yeni olusturmus siparis
    
    active ödenmis siparis
    
    done tamamlanmıs siparis 


### Parametreler

isteklerde time değişkeni numberdir;

    time 0 default all
    time 1 günlük
    time 2 aylık
    time 3 yıllık


### Backend Api Dökümantasyonu

### Token

### /vk/api/v1/Token
```javascript
{
  "email": "string",
  "password": "string"
}
```
bilgilerini verdiğimizin userın jwt tokenini oluştur bu token ile bütün işlemler yapılır.

### /vk/api/v1/Token/getUserInfo

Userın detaylı verisini verir

### /vk/api/v1/Token/getAdressInfo

Userın adress bilgisini verir.

### /vk/api/v1/Token/GetProductsByParameter?ProductBrand=asd&ProductType=asd&Gain=10&Tax=10

Parametreler ile product datasını filtreleyip döner vergi ve kâr ekler.

### /vk/api/v1/Token/GetProduct

Parametreler ile id'si verilen product datasını döner vergi ve kâr ekler.

### /vk/api/v1/Token/getReport/{time}

tokenden usera ait siparişlerin raporlarını getirir time parametresine göre günlük yıllık veya aylık getirebilir

### /vk/api/v1/Token/GetOrdersByParameter?Status=active&Description=text&Name=text&time=1

tokenden usera ait siparişlerini filtreleyip getirir time parametresine göre günlük yıllık veya aylık getirebilir.


### Adres

Örnek Adres ; 


```javascript
{
    "id": 0,
    "userId": 0,
    "addressLine1": "string",
    "addressLine2": "string",
    "city": "string",
    "county": "string",
    "postalCode": "string"
}
```

### /vk/api/v1/Addreses get()

input beklemeden adminin bütün adreslere ulaşmasını sağlar;

### /vk/api/v1/Addreses post()

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
### /vk/api/v1/Addreses/{id} get()

id'si verilen adresi getirir;

### /vk/api/v1/Addreses/{id} put()

id'si verilen adresi günceller;

güncelleme datası aşağıdaki gibi olmalıdır;

```javascript
{
{
  "userId": 0,
  "addressLine1": "string",
  "addressLine2": "string",
  "city": "string",
  "county": "string",
  "postalCode": "string"
}
}
```

### /vk/api/v1/Addreses/ByUserId/1 delete()

id'si verilen userin adresini verir;

### Messages

Örnek Mesaj;

```javascript
{
    {
      "id": 0,
      "userId": 0,
      "userName": "string",
      "text": "string",
      "roomName": "string"
    }
}
```
/chatHub pathi üzerinden SignalR yardımı ile chat gerçekleştirilir.

chate yazdıklarınız dbye kaydolur.

### /vk/api/v1/Messages/GetMessageByRoomName?roomName={roomname}

Oda numarası verilen odadaki geçmiş mesajları getirir.

### /vk/api/v1/Messages/2

idsi verilen mesajı dbden siler.

### Orderes

Örnek order tipi aşağıdaki gibidir;

```javascript
{
    {
      "id": 0,
      "userId": 0,
      "productId": 0,
      "name": "string",
      "description": "string",
      "price": 0,
      "pictureUrl": "string",
      "productType": "string",
      "productBrand": "string",
      "piece": 0,
      "status": "string",
      "paymentMethod": "string",
      "insertDate": "2023-11-08T14:57:13.389Z"
    }
}
```

### /vk/api/v1/Orderes get()

Admine bütün siparişleri getirir.

### /vk/api/v1/Orderes post()

Sipariş oluşturulur.
```javascript
{
{
  "userId": 0,
  "productId": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "pictureUrl": "string",
  "productType": "string",
  "productBrand": "string",
  "piece": 0,
  "status": "string",
  "paymentMethod": "string"
}
}
```


### /vk/api/v1/Orderes/{id} get()

id'si verilen siparişleri getirir.

### /vk/api/v1/Orderes/{id} delete()

id'si verilen siparişleri siler.

### /vk/api/v1/Orderes/updateOrder/{id}/{piece} delete()

id'si verilen siparişin statüsünü günceller.


### Payment



### /vk/api/v1/Payment/paymentCard post()

idsi verilen orderın statüsünü değiştirmek için kullanılır.

### /vk/api/v1/Payment/Eft post()

idsi verilen usera eft ile cüzdan bakiyesi eklemek için kullanılır.

ispayment true giderse bakiye eksiltilir.

### Products

Örnek product aşağıdaki gibidir;

```javascript
{
{
      "id": 0,
      "name": "string",
      "description": "string",
      "price": 0,
      "pictureUrl": "string",
      "productType": "string",
      "productBrand": "string",
      "piece": 0
}
}
```

### /vk/api/v1/Products get()

Sadece admin kullanabilir bütün productları getirir

### /vk/api/v1/Products post()

Product eklemek için kullanılır.

```javascript
{
  "name": "string",
  "description": "string",
  "price": 0,
  "pictureUrl": "string",
  "productType": "string",
  "productBrand": "string",
  "piece": 0
}
```
### /vk/api/v1/Products/id get()

Id'si verilen productu getirmek için kullanılır.

### /vk/api/v1/Products/id put()

Id'si verilen productu güncellemek için kullanılır.

### /vk/api/v1/Products/id delete()

Id'si verilen productu silmek için kullanılır.

### /vk/api/v1/Products/UpdateProductPiece 

Id'si verilen productun stok sayısını güncellemek için kullanılır.


### Users

örnek user;

```javascript
{
      "id": 0,
      "email": "string",
      "password": "string",
      "fullName": "string",
      "profit": 0,
      "role": "string",
      "credit": 0,
      "addresses": [
        {
          "id": 0,
          "userId": 0,
          "addressLine1": "string",
          "addressLine2": "string",
          "city": "string",
          "county": "string",
          "postalCode": "string"
        }
      ],
      "orders": [
        {
          "id": 0,
          "userId": 0,
          "productId": 0,
          "name": "string",
          "description": "string",
          "price": 0,
          "pictureUrl": "string",
          "productType": "string",
          "productBrand": "string",
          "piece": 0,
          "status": "string",
          "paymentMethod": "string",
          "insertDate": "2023-11-08T15:42:42.384Z"
        }
      ]
    }
```


### /vk/api/v1/Users get()

admine userları getirir

### /vk/api/v1/Users post ()

user oluşturmamıza yarar

örnek json
```javascript
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "profit": 0,
  "role": "string",
  "credit": 0
}
```

### /vk/api/v1/Users/{id} get ()

idsi verilen userı getirir.

### /vk/api/v1/Users/{id} put ()

idsi verilen userı günceller.

### /vk/api/v1/Users/{id} delete ()

idsi verilen userı siler.



