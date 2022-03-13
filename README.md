# Hoşgeldiniz
Bu, yandex disk dosyalarınızı api aracılığıyla web sayfanızda göstermenizi sağlayan bir web uygulamasıdır.

# Yandex Web Api Nasıl Çekilir

## Projeyi Clone Edin
    git clone https://github.com/bgryks18/yandex-api.git
## Auth Kodunuzu Girin
    cd yandex-api
 ile projenin içine girin.
     /store/index.js
içindeki token bilgisine kendi token bilginizi girin.

## Token Alma
Yandex disk dosyalarımıza erişmek için token almak gerekir. 
- Yandex hesabınıza girdikten sonra şu adrese girin: https://yandex.com/dev/disk/poligon/
- Get OAuth-Token butonuna tıklayın. Kutucuğun içine token gelecek. Bu token ile api isteği atabileceksiniz.

## Headers
Tokenı kullanabilmek için headers parametresi olarak şunları vermeliyiz:
| **Parametre**  | **Değer**  |
| ------------ | ------------ |
|  Accept  | application/json  |
| Authorization  | Token  |

## Metodlar
Token’ı aldıktan sonra o sayfadaki metodları kullanabiliriz.

 - GET v1/disk
	URL:  https://cloud-api.yandex.net/v1/disk

	Sistem ve sosyal medya dizin yapısını gösterir.
	Burdan 200 ile dönen sonuçta sosyal ağlar ile paylaştığı dosyaları, ekran görünütleri, yazıcı taramaları, telefon kamerasından çekip yükledikleri ve kullanıcının bilgileri getirilir.  
İstersek fields parametresine istediğimiz property’i belirterek sadece onu döndürebiliriz. 

	Örneğin:  
	https://cloud-api.yandex.net/v1/disk?fields=user şeklinde istek gönderirsek, bize sadece user objesini data içerisinde döndürür:
    
    	{
    	“user”: {
	    	“country”: “tr”,
	    	“login”: “Username”,
	    	“display_name”: “UserDisplayName”,
	    	“uid”: “1234567890”
    	 }
    	}

	https://cloud-api.yandex.net/v1/disk?fields=user.uid şeklinde istek gönderirsek bize user objesini içinde sadece user id olacak şekilde döndürür:

	   {
		“user”: {
		 “uid”: “1234567890”
		}
	   }
 - GET v1/disk/resources
	 URL: https://cloud-api.yandex.net/v1/disk/resources
	 
	 Klasör dizinlerini gösterir.  
  
	Burda dosya yolu belirtmek zorundayız aksi halde bize 400 hatası döndürür.  
	Yanlış bir dizin yolu belirtirsek 404 hatası döndürür.  
	File yazılırsa içinde items arrayi olmaz. Klasör yazılırsa, _embedded objesi içinde, klasörün içindeki dosya ve klasörleri kapsayan items arrayi olur.  
	  
	Ana dizini belirtmek için path parametresini ?path=/ ya da ?path=disk:/ şeklinde tanımlayabiliriz.

	URL: https://cloud-api.yandex.net/v1/disk/resources?path=FOLDER
	
	| URL | Request |
	|--|--|
	|/resources|400 Error|
	|/resources?path=YANLIS_DOSYA_YOLU|404 Error|
	|/resources?path=/|200 Ok|
	
	**/resources?path=/ isteği sonucu 200 ile dönen sonuç:**

	    {  
	    "_embedded": {
	    "sort": "",
	    "items": [/*Bu dizinin içindeki dosya ve klasörler*/],
	    "offset": 0,
	    "path": "disk:/",
	    "total": 6
	    },
	    "name": "disk",
	    "exif": {},
	    "resource_id": "Bu dizinin Unique Kodu",
	    "created": "2012-04-04T20:00:00+00:00",
	    "modified": "2012-04-04T20:00:00+00:00",
	    "path": "disk:/",
	    "comment_ids": {},
	    "type": "dir",
	    "revision": 1345952494586107  
	    }

	“type” propertylerinden klasör mü yoksa dosya mı olduğunu anlayabiliyoruz.
	Dosyalara “file” propertylerinden indirme linki oluşturabiliyoruz.
	“path” propertylerinden dosyanın ya da klasörün yolunu görebiliyoruz.

 - GET v1/disk/resources/downloads
URL:  https://cloud-api.yandex.net/v1/disk/resources/downloads?path=FILE

	Dosya veya klasörleri indirmemizi sağlar.  
	Klasörleri zipleyerek indirir.  
	Dosyaları direkt indirir.  
  
	Gönderdiğimiz isteğin 200 cevabında bize bir obje döner.  
	Bu objenin “href” propertysi indirme linkidir.  

	Path değeri için “/” veya “disk:/” yani ana dizin verilirse, 200 cevabı döner ancak “href” propertysi bize boş döner ve dolayısıyla indiremeyiz.  

	Yanlış bir yol girersek 404 hatası döner.
	
	**İstek:** /resources/downloads?path=/
	
	**Sonuç:** 200 Ok:
	
		{
		“href”: “”,
		  “method”: “GET”,
		 “templated”: false
		}
		
  	**İstek:** /resources/downloads?path=YANLIS_DOSYA_YOLU
	
	**Sonuç:** 404 Error:
	
	**İstek:** /resources/downloads?path=DIZIN
	
	**Sonuç:** 200 Ok:
	
		{
		“href”: “https://downloader.disk...”,
		  “method”: “GET”,
		 “templated”: false
		}
 - GET v1/disk/resources/files
	URL: https://cloud-api.yandex.net/v1/disk/resources/files

	Klasörleri döndürmez, bütün dosyaları döndürür.
	Dosyaların yolunu “path” propertysi ile görebiliriz.
	“file”propertysi ile dosyayı indirebiliriz.

**Not**: 403 hatası almanız durumunda yandex hesabınızın ayarlarını gözden geçirin.
