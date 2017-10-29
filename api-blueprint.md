FORMAT: 1A

# Bizguid

Bizguid API allowing client applications to get information about ukrainian enterprises

# Bizguid API Root [/api]

Use this route to access bizguid API

# Group Enterprises

Resources related to getting enterprises in the API.

## Enterprise Collection [/enterprises]

### List All Enterprises [GET] [/?{offset}{&amount}]

+ Parameters
    
        +offset:5 (optional,number) - Start point of list
            +Default: 0
        +amount:10 (optional,number) - Amount of Enterprises
            +Default: 100
    
+ Response 200 (application/json)
    
    + Headers
    
            x-total-count: 9001
            x-response-time: 283.124ms
           
    + Body
    
            [
                {
                    "_id": "59ed26260e0742b928d1b1b9",
                    "slug": "palmyradent",
                    "name": "ПАЛЬМІРА ДЕНТ, ПП",
                    "emails": [
                        "palmyradent@mail.ru"
                    ],
                    "regionName": "г. Полтава",
                    "phones": "+38 (0532) 509979"
                }
            ]
            
### Single specific Enterprise [GET] [/{slug}]

+ Parameters
    
        +slug:intergarant-sk (required,string) - Slug of enterprise
    
+ Response 200 (application/json)
    
    + Headers
    
            x-response-time: 88.442ms
           
    + Body
    
            {
                "_id": "59ed263b0e0742b928d1e02d",
                "slug": "intergarant-sk",
                "name": "ІНТЕРГАРАНТ, СТРАХОВА КОМПАНІЯ, ПрАТ",
                "logo": "18306.jpeg",
                "description": "ПрАТ «СК« Інтергарант »є членом Асоціації« Страховий бізнес України »з моменту її створення;\r\n\r\nМісія компанії безпосередньо пов'язана з місцем і роллю, яку займає страхування в розвиненому суспільстві, забезпечуючи потрібний рівень захисту, впевненості та стабільності для всіх його суб'єктів.\r\n\r\nОсновна мета компанії - максимальне задоволення страхових інтересів і потреб клієнтів у страховому захисті. Через діяльність, спрямовану на досягнення цієї мети, компанія сприятиме розвитку страхової культури у населення, керівництва підприємств і організацій. У своїй діяльності компанія орієнтована на пріоритет інтересів її клієнтів і забезпечення ефективного розвитку страхового бізнесу, як основи гарантій виконання взятих страхових зобов'язань і задоволення інтересів акціонерів компанії.\r\n\r\nДіяльність компанії спрямована на надання класичних страхових послуг, інноваційний розвиток, поліпшення страхового сервісу. Компанія забезпечує індивідуальний підхід до клієнтів, простоту і зручність страхового обслуговування як при продажу послуг, так і при оформленні страхових виплат.\r\n\r\nЗасновники компанії: юридичні та фізичні особи. Компанія з 2007р. виступає як правонаступник майнових прав та обов'язків Закритого акціонерного товариства Страхова компанія «Укргаз».\r\n\r\nКомпанія належить до страхових компаній, які працюють у сфері ризикового страхування. Стратегія роботи компанії передбачає діяльність на широкому страховому полі, як компанія універсального плану.\r\n\r\nКлієнтами компанії є як юридичні, так і фізичні особи, серед яких є відомі підприємства різних галузей народного господарства і різних за масштабом своєї діяльності.\r\n\r\nКомпанія пропонує своїм клієнтам широкий вибір страхових продуктів в рамках добровільного та обов'язкового страхування. Всі страхові продукти відпрацьовані на практиці вітчизняного і міжнародного страхового ринку.\r\n\r\nКомпанія досвідчений персонал на всіх рівнях управління, що дозволяє професійно, швидко та відповідально вирішувати всі питання страхового захисту, має налагоджену систему взаємодії з експертними структурами, технічним та медичним асистансу.\r\n",
                "emails": [
                    "centre@intergarant.com"
                ],
                "phones": "+38 (044) 2386405",
                "postAddress": "04053 г. Киев, ул. Кудрявская, 13-19 оф. 3",
                "faxes": "+38 (044) 2386400",
                "contactPeople": {
                    "director": "Гнатенко Татьяна Владимировна",
                    "accountant": "Ковальчук Наталія Миколаївна"
                },
                "openHours": {
                    "Mon-Fri": "08:00 - 17:00",
                    "Sat-Sun": "Выходные"
                },
                "employeesNumber": 29,
                "yearOfFoundation": "1995",
                "bankDetails": {
                    "companyRegistrationNumber": 23703520,
                    "bank": "ПАТ &quot;БРОКБIЗНЕСБАНК&quot; м. Київ",
                    "MFO": "300249",
                    "INN": "265030417700"
                },
                "productsAndOffers": "Автострахование / Страхование от несчастных случаев / Страхование здоровья на случай болезни / Страхование ответственности перед третьими лицами / Страхование от несчастных случаев на транспорте / Обязательное личное страхование работников ведомственной и местной пожарной охраны и членов добровольных пожарных дружин (команд)",
                "categoriesId": [
                    "746",
                    "59ed26240e0742b928d19347",
                    "59ed26240e0742b928d19346",
                    "59ed26240e0742b928d19340",
                    "748",
                    "59ed26240e0742b928d19348",
                    "1460"
                ],
                "companyRegionsId": [
                    "59ed26230e0742b928d1922e",
                    "59ed26230e0742b928d19238",
                    "59ed26220e0742b928d18f7c",
                    "59ed26220e0742b928d18f7b"
                ]
            }

### Search by Categories and Regions [GET] [/search?{categoryIds}{&regionIds}{&offset}{&amount}]

+ Parameters
    
        +categoryIds:59ed26240e0742b928d19351,59ed26240e0742b928d1927a (optional,ObjectId) - Categories of Enterprises coma separated
        +regionIds:59ed26230e0742b928d1922e,59ed26230e0742b928d19230 (optional,ObjectId) - Regions of Enterprises coma separated
        +offset:5 (optional,number) - Start point of list
            +Default: 0
        +amount:10 (optional,number) - Amount of Enterprises
            +Default: 100
    
+ Response 200 (application/json)
    
    + Headers
            
            x-total-count: 251
            x-response-time: 942.162ms
           
    + Body
    
            [
                {
                    "_id": "59ed26260e0742b928d1ba6b",
                    "slug": "patyvir",
                    "name": "ЯВІР-КРЗ, ПуАТ",
                    "emails": [
                        "yvir@emitent.net.ua"
                    ],
                    "phones": "+38 (044) 3620122",
                    "productsAndOffers": "Офисная мебель / Столы обычные / Столы / Надстройки для столов / Шкафы / Шкафы-купе / Кухни / Двери / Окна / Тарные ящики / Деревянные двери и окна",
                    "categoriesId": [
                        "175",
                        "59ed26240e0742b928d1927c",
                        "59ed26240e0742b928d1927a",
                        "59ed26240e0742b928d1925f",
                        "767",
                        "59ed26240e0742b928d19351",
                        "59ed26240e0742b928d1934f",
                        "59ed26240e0742b928d1934e",
                        "1460"
                    ],
                    "companyRegionsId": [
                        "59ed26230e0742b928d1922e",
                        "59ed26230e0742b928d19230",
                        "59ed26220e0742b928d18f7c",
                        "59ed26220e0742b928d18f7b"
                    ]
                }
            ]
            
### Search by Text [GET] [/text-search/{text}?{offset}{&amount}]

+ Parameters
    
        +text:ІНТЕРГАРАНТ (optional,String) - Text from search field
            +Default: ''
        +offset:5 (optional,number) - Start point of list
            +Default: 0
        +amount:10 (optional,number) - Amount of Enterprises
            +Default: 100
    
+ Response 200 (application/json)
    
    + Headers
            
            x-total-count: 1
            x-response-time: 174.390ms
           
    + Body
    
            [
                {
                    "_id": "59ed26260e0742b928d1b91d",
                    "slug": "intergarant-sk",
                    "name": "ІНТЕРГАРАНТ, СТРАХОВА КОМПАНІЯ, ПрАТ",
                    "emails": [
                        "centre@intergarant.com"
                    ],
                    "phones": "+38 (044) 2386405",
                    "productsAndOffers": "Автострахование / Страхование от несчастных случаев / Страхование здоровья на случай болезни / Страхование ответственности перед третьими лицами / Страхование от несчастных случаев на транспорте / Обязательное личное страхование работников ведомственной и местной пожарной охраны и членов добровольных пожарных дружин (команд)",
                    "categoriesId": [
                        "746",
                        "59ed26240e0742b928d19347",
                        "59ed26240e0742b928d19346",
                        "59ed26240e0742b928d19340",
                        "748",
                        "59ed26240e0742b928d19348",
                        "1460"
                    ],
                    "companyRegionsId": [
                        "59ed26230e0742b928d1922e",
                        "59ed26230e0742b928d19238",
                        "59ed26220e0742b928d18f7c",
                        "59ed26220e0742b928d18f7b"
                    ],
                    "score": 1.875
                }
            ]
            
# Group Regions

Resources related to getting regions in the API.

## Regions Collection [/regions]

### List All Region related to parent [GET] [/?{id}]

Return Ukraine by default.

+ Parameters
    
        +id:59ed26220e0742b928d18f7c (required,ObjectId) - Id of parent region
      
+ Response 200 (application/json)
    
    + Headers
    
            x-response-time: 87.973ms
           
    + Body
      
           [
               {
                   "_id": "59ed26230e0742b928d18f7d",
                   "slug": "autonomous republic crimea",
                   "name": "АР Крим"
               }
           ]
           
# Group Categories

Resources related to getting categories in the API.

## Categories Collection [/categories]

### List All Categories related to parent [GET] [/?{id}]

Return list of top level categories.

+ Parameters
    
        +id:59ed26240e0742b928d1924f (required,ObjectId) - Id of parent category
      
+ Response 200 (application/json)
    
    + Headers
    
            x-response-time: 89.619ms
           
    + Body
      
             [
                 {
                     "_id": "59ed26240e0742b928d1924f",
                     "slug": "mining and development quarries",
                     "name": "Добувна промисловість і розроблення кар'єрів"
                 }
             ]
            