const CONTENIDO = {
    peliculas: [
        {
            "titulo": "Constantine",
            "id": 1,
            "tipo": "pelicula",
            "imagen": "./images/constantine.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/M8APRgAXguc?si=qVLg2wAuZet4njch'></iframe>",
            "duracion": "2h 1min",
            "genero": ["Acción", "Fantasía"],
            "actores": [
                { "nombre": "Keanu Reeves", "wikipedia": "https://en.wikipedia.org/wiki/Keanu_Reeves" },
                { "nombre": "Rachel Weisz", "wikipedia": "https://en.wikipedia.org/wiki/Rachel_Weisz" },
                { "nombre": "Shia LaBeouf", "wikipedia": "https://en.wikipedia.org/wiki/Shia_LaBeouf" },
                { "nombre": "Djimon Hounsou", "wikipedia": "https://en.wikipedia.org/wiki/Djimon_Hounsou" },
                { "nombre": "Tilda Swinton", "wikipedia": "https://en.wikipedia.org/wiki/Tilda_Swinton" }
            ],
            "resumen": "John Constantine, con la capacidad de ver demonios y ángeles, lucha contra fuerzas oscuras."
        },
        {
            "titulo": "Búsqueda Implacable 3",
            "id": 2,
            "tipo": "pelicula",
            "imagen": "./images/implacable.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/cwfDP4rB94Q?si=gaL8ttUNbvn80Lar'></iframe>",
            "duracion": "1h 49min",
            "genero": ["Acción"],
            "actores": [
                { "nombre": "Liam Neeson", "wikipedia": "https://es.wikipedia.org/wiki/Liam_Neeson" },
                { "nombre": "Maggie Grace", "wikipedia": "https://es.wikipedia.org/wiki/Maggie_Grace" },
                { "nombre": "Famke Janssen", "wikipedia": "https://es.wikipedia.org/wiki/Famke_Janssen" },
                { "nombre": "Forest Whitaker", "wikipedia": "https://es.wikipedia.org/wiki/Forest_Whitaker" },
                { "nombre": "Dougray Scott", "wikipedia": "https://en.wikipedia.org/wiki/Dougray_Scott" },
                { "nombre": "Jon Gries", "wikipedia": "https://en.wikipedia.org/wiki/Jon_Gries" },
                { "nombre": "Leland Orser", "wikipedia": "https://en.wikipedia.org/wiki/Leland_Orser" },
                { "nombre": "Jonny Weston", "wikipedia": "https://en.wikipedia.org/wiki/Jonny_Weston" },
                { "nombre": "Andrew Howard", "wikipedia": "https://en.wikipedia.org/wiki/Andrew_Howard" }
            ],
            "resumen": "La reconciliación de Bryan Mills se ve truncada tras el asesinato de su exesposa. Acusado injustamente, huye de la policía, el FBI y la CIA mientras busca a los verdaderos culpables."
        },
        {
            "titulo": "Deadpool & Wolverine",
            "id": 3,
            "tipo": "pelicula",
            "imagen": "./images/deadpool.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/UzFZR2dRsSY?si=1On3OxWeqv_ra7o2'></iframe>",
            "duracion": "2h 8min",
            "genero": ["Acción", "Comedia", "Superhéroes"],
            "actores": [
                { "nombre": "Ryan Reynolds", "wikipedia": "https://en.wikipedia.org/wiki/Ryan_Reynolds" },
                { "nombre": "Hugh Jackman", "wikipedia": "https://en.wikipedia.org/wiki/Hugh_Jackman" },
                { "nombre": "Emma Corrin", "wikipedia": "https://en.wikipedia.org/wiki/Emma_Corrin" },
                { "nombre": "Morena Baccarin", "wikipedia": "https://en.wikipedia.org/wiki/Morena_Baccarin" }
            ],
            "resumen": "Deadpool recluta a Wolverine para detener una amenaza del Universo Marvel."
        },
        {
            "titulo": "Super Mario Bros: La Película",
            "id": 4,
            "tipo": "pelicula",
            "imagen": "./images/marioBros.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/SvJwEiy2Wok?si=_R5UspCzfUUt9eki'></iframe>",
            "duracion": "1h 32min",
            "genero": ["Aventura", "Comedia"],
            "actores": [
                { "nombre": "Chris Pratt", "wikipedia": "https://en.wikipedia.org/wiki/Chris_Pratt" },
                { "nombre": "Anya Taylor-Joy", "wikipedia": "https://en.wikipedia.org/wiki/Anya_Taylor-Joy" },
                { "nombre": "Charlie Day", "wikipedia": "https://en.wikipedia.org/wiki/Charlie_Day" },
                { "nombre": "Jack Black", "wikipedia": "https://en.wikipedia.org/wiki/Jack_Black" },
                { "nombre": "Seth Rogen", "wikipedia": "https://en.wikipedia.org/wiki/Seth_Rogen" }
            ],
            "resumen": "Mario y Luigi viajan a un mundo paralelo para rescatar a la Princesa Peach.",
        },
        {
            "titulo": "Animales Fantásticos y dónde encontrarlos",
            "id": 5,
            "tipo": "pelicula",
            "imagen": "./images/animales.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/W45vhTxKeQE?si=sqkovX41QkMdpzcg'></iframe>",
            "duracion": "2h 13min",
            "genero": ["Fantasía", "Aventura"],
            "actores": [
                { "nombre": "Eddie Redmayne", "wikipedia": "https://en.wikipedia.org/wiki/Eddie_Redmayne" },
                { "nombre": "Katherine Waterston", "wikipedia": "https://en.wikipedia.org/wiki/Katherine_Waterston" },
                { "nombre": "Dan Fogler", "wikipedia": "https://en.wikipedia.org/wiki/Dan_Fogler" },
                { "nombre": "Colin Farrell", "wikipedia": "https://en.wikipedia.org/wiki/Colin_Farrell" },
                { "nombre": "Ezra Miller", "wikipedia": "https://en.wikipedia.org/wiki/Ezra_Miller" }
            ],
            "resumen": "Newt Scamander llega a Nueva York y criaturas mágicas se liberan por accidente."
        },
        {
            "titulo": "Toy Story 2",
            "id": 6,
            "tipo": "pelicula",
            "imagen": "./images/toyStory2.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/8xiXSo5xjjE?si=GwLN-d-DZTH_VEUq'></iframe>",
            "duracion": "1h 32min",
            "genero": ["Aventura", "Comedia"],
            "actores": [
                { "nombre": "Tom Hanks", "wikipedia": "https://en.wikipedia.org/wiki/Tom_Hanks" },
                { "nombre": "Tim Allen", "wikipedia": "https://en.wikipedia.org/wiki/Tim_Allen" },
                { "nombre": "Joan Cusack", "wikipedia": "https://en.wikipedia.org/wiki/Joan_Cusack" }
            ],
            "resumen": "Woody es secuestrado por un coleccionista; Buzz y sus amigos inician una misión para rescatarlo."
        },
        {
            "titulo": "Godzilla x Kong: El nuevo imperio",
            "id": 7,
            "tipo": "pelicula",
            "imagen": "./images/Godzilla-y-Kong-Portada.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/rmoneJ_797s?si=0xrcZSInpQ_uwxkd'></iframe>",
            "duracion": "1h 55min",
            "genero": ["Monstruos", "Acción", "Ciencia Ficción"],
            "actores": [
                { "nombre": "Rebecca Hall", "wikipedia": "https://en.wikipedia.org/wiki/Rebecca_Hall" },
                { "nombre": "Dan Stevens", "wikipedia": "https://en.wikipedia.org/wiki/Dan_Stevens" },
                { "nombre": "Brian Tyree Henry", "wikipedia": "https://en.wikipedia.org/wiki/Brian_Tyree_Henry" },
                { "nombre": "Kaylee Hottle", "wikipedia": "https://en.wikipedia.org/wiki/Kaylee_Hottle" }
            ],
            "resumen": "Secuela de Godzilla vs. Kong, donde los gigantes titanes y humanos enfrentan nuevas amenazas."
        },
        {
            "titulo": "Lilo y Stitch",
            "id": 8,
            "tipo": "pelicula",
            "imagen": "./images/lilo2.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/9JIyINjMfcc?si=iOhyN0Xwv1ZqTcCy'></iframe>",
            "duracion": "1h 48min",
            "genero": ["Comedia", "Ciencia Ficción"],
            "actores": [
                { "nombre": "Maia Kealoha", "wikipedia": "https://en.wikipedia.org/wiki/Maia_Kealoha" },
                { "nombre": "Sydney Agudong", "wikipedia": "https://en.wikipedia.org/wiki/Sydney_Agudong" },
                { "nombre": "Zach Galifianakis", "wikipedia": "https://en.wikipedia.org/wiki/Zach_Galifianakis" },
                { "nombre": "Billy Magnussen", "wikipedia": "https://en.wikipedia.org/wiki/Billy_Magnussen" },
                { "nombre": "Chris Sanders", "wikipedia": "https://en.wikipedia.org/wiki/Chris_Sanders" },
                { "nombre": "Tia Carrere", "wikipedia": "https://en.wikipedia.org/wiki/Tia_Carrere" },
                { "nombre": "Courtney B. Vance", "wikipedia": "https://en.wikipedia.org/wiki/Courtney_B._Vance" },
                { "nombre": "Amy Hill", "wikipedia": "https://en.wikipedia.org/wiki/Amy_Hill" },
                { "nombre": "Hannah Waddingham", "wikipedia": "https://en.wikipedia.org/wiki/Hannah_Waddingham" }
            ],
            "resumen": "Lilo es una niña hawaiana solitaria que adopta a un perro que en realidad es un extraterrestre travieso que se esconde de unos cazadores intergalácticos.",
        }
    ],
    series: [
        {
            "titulo": "Los Simpsons",
            "id": 1,
            "tipo": "serie",
            "imagen": "./images/simpsons.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/Fy781dK59e0?si=80rvkpXI3IvkswnW'></iframe>",
            "genero": ["Comedia", "Familiar"],
            "actores": [
                { "nombre": "Dan Castellaneta", "wikipedia": "https://en.wikipedia.org/wiki/Dan_Castellaneta" },
                { "nombre": "Julie Kavner", "wikipedia": "https://en.wikipedia.org/wiki/Julie_Kavner" },
                { "nombre": "Nancy Cartwright", "wikipedia": "https://en.wikipedia.org/wiki/Nancy_Cartwright" },
                { "nombre": "Yeardley Smith", "wikipedia": "https://en.wikipedia.org/wiki/Yeardley_Smith" }
            ],
            "resumen": "La serie animada sigue las desventuras de una familia disfuncional en la ciudad de Springfield.",
            "temporadas": [
                { "numero": 1, "capitulos": 13 },
                { "numero": 2, "capitulos": 22 },
                { "numero": 3, "capitulos": 24 },
                { "numero": 4, "capitulos": 22 },
                { "numero": 5, "capitulos": 22 },
                { "numero": 6, "capitulos": 22 },
                { "numero": 7, "capitulos": 25 },
                { "numero": 8, "capitulos": 25 },
                { "numero": 9, "capitulos": 25 },
                { "numero": 10, "capitulos": 23 },
                { "numero": 11, "capitulos": 22 },
                { "numero": 12, "capitulos": 22 },
                { "numero": 13, "capitulos": 22 },
                { "numero": 14, "capitulos": 22 },
                { "numero": 15, "capitulos": 22 },
                { "numero": 16, "capitulos": 22 },
                { "numero": 17, "capitulos": 22 },
                { "numero": 18, "capitulos": 22 },
                { "numero": 19, "capitulos": 20 },
                { "numero": 20, "capitulos": 22 },
                { "numero": 21, "capitulos": 23 },
                { "numero": 22, "capitulos": 22 },
                { "numero": 23, "capitulos": 22 },
                { "numero": 24, "capitulos": 22 },
                { "numero": 25, "capitulos": 22 },
                { "numero": 26, "capitulos": 22 },
                { "numero": 27, "capitulos": 22 },
                { "numero": 28, "capitulos": 22 },
                { "numero": 29, "capitulos": 22 },
                { "numero": 30, "capitulos": 22 },
                { "numero": 31, "capitulos": 22 },
                { "numero": 32, "capitulos": 22 },
                { "numero": 33, "capitulos": 22 },
                { "numero": 34, "capitulos": 22 },
                { "numero": 35, "capitulos": 18 },
                { "numero": 36, "capitulos": 18 },
            ]
        },
        {
            "titulo": "El Eternauta",
            "id": 2,
            "tipo": "serie",
            "imagen": "./images/eternauta.jpeg",
            "iframe": "<iframe src='https://www.youtube.com/embed/ykLTd5aTa88?si=oR4l8QVCQS4ALl7D'></iframe>",
            "genero": ["Ciencia Ficción"],
            "actores": [
                { "nombre": "Ricardo Darín", "wikipedia": "https://es.wikipedia.org/wiki/Ricardo_Darín" },
                { "nombre": "Carla Peterson", "wikipedia": "https://es.wikipedia.org/wiki/Carla_Peterson" },
                { "nombre": "César Troncoso", "wikipedia": "https://es.wikipedia.org/wiki/C%C3%A9sar_Troncoso" },
                { "nombre": "Andrea Pietra", "wikipedia": "https://es.wikipedia.org/wiki/Andrea_Pietra" },
                { "nombre": "Ariel Staltari", "wikipedia": "https://es.wikipedia.org/wiki/Ariel_Staltari" },
                { "nombre": "Marcelo Subiotto", "wikipedia": "https://es.wikipedia.org/wiki/Marcelo_Subiotto" }
            ],
            "resumen": "Basada en la historieta de Oesterheld, cuenta cómo una familia sobrevive a una nevada tóxica en Buenos Aires mientras enfrentan una invasión extraterrestre.",
            "temporadas": [
                {
                    "numero": 1,
                    "capitulos": 6
                }
            ]
        },
        {
            "titulo": "Breaking Bad",
            "id": 3,
            "tipo": "serie",
            "imagen": "./images/breakingBad.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/V8WQhxHEmMc?si=8gG4Vqg08V8Ba8hQ'></iframe>",
            "genero": ["Crimen", "Drama", "Suspenso"],
            "actores": [
                { "nombre": "Bryan Cranston", "wikipedia": "https://en.wikipedia.org/wiki/Bryan_Cranston" },
                { "nombre": "Aaron Paul", "wikipedia": "https://en.wikipedia.org/wiki/Aaron_Paul" },
                { "nombre": "Anna Gunn", "wikipedia": "https://en.wikipedia.org/wiki/Anna_Gunn" }
            ],
            "resumen": "Un profesor de química con cáncer terminal entra en el mundo de las metanfetaminas para asegurar el futuro de su familia.",
            "temporadas": [
                { "numero": 1, "capitulos": 7 },
                { "numero": 2, "capitulos": 13 },
                { "numero": 3, "capitulos": 13 },
                { "numero": 4, "capitulos": 13 },
                { "numero": 5, "capitulos": 16 }
            ]
        },
        {
            "titulo": "Grey's Anatomy",
            "id": 4,
            "tipo": "serie",
            "imagen": "./images/grey.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/8G4jvn-ncPE?si=Ycj6gy6DQ1eWQh6a'></iframe>",
            "genero": ["Drama", "Medicina"],
            "actores": [
                { "nombre": "Ellen Pompeo", "wikipedia": "https://en.wikipedia.org/wiki/Ellen_Pompeo" },
                { "nombre": "Sandra Oh", "wikipedia": "https://en.wikipedia.org/wiki/Sandra_Oh" },
                { "nombre": "Chandra Wilson", "wikipedia": "https://en.wikipedia.org/wiki/Chandra_Wilson" },
                { "nombre": "James Pickens Jr.", "wikipedia": "https://en.wikipedia.org/wiki/James_Pickens_Jr." },
                { "nombre": "Patrick Dempsey", "wikipedia": "https://en.wikipedia.org/wiki/Patrick_Dempsey" }
            ],
            "resumen": "Drama médico centrado en la Dra. Meredith Grey y sus colegas en un hospital de Seattle que atraviesan desafíos personales y profesionales.",
            "temporadas": [
                { "numero": 1, "capitulos": 9 },
                { "numero": 2, "capitulos": 27 },
                { "numero": 3, "capitulos": 25 },
                { "numero": 4, "capitulos": 17 },
                { "numero": 5, "capitulos": 24 },
                { "numero": 6, "capitulos": 24 },
                { "numero": 7, "capitulos": 22 },
                { "numero": 8, "capitulos": 24 },
                { "numero": 9, "capitulos": 24 },
                { "numero": 10, "capitulos": 24 },
                { "numero": 11, "capitulos": 25 },
                { "numero": 12, "capitulos": 24 },
                { "numero": 13, "capitulos": 24 },
                { "numero": 14, "capitulos": 24 },
                { "numero": 15, "capitulos": 25 },
                { "numero": 16, "capitulos": 21 },
                { "numero": 17, "capitulos": 17 },
                { "numero": 18, "capitulos": 20 },
                { "numero": 19, "capitulos": 20 },
                { "numero": 20, "capitulos": 10 },
                { "numero": 21, "capitulos": 18 }
            ]
        },
        {
            "titulo": "Better Call Saul",
            "id": 5,
            "tipo": "serie",
            "imagen": "./images/saul.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/HN4oydykJFc?si=ITc5PFRmsdqBDpbg'></iframe>",
            "genero": ["Drama", "Thriller"],
            "actores": [
                { "nombre": "Bob Odenkirk", "wikipedia": "https://en.wikipedia.org/wiki/Bob_Odenkirk" },
                { "nombre": "Rhea Seehorn", "wikipedia": "https://en.wikipedia.org/wiki/Rhea_Seehorn" },
                { "nombre": "Jonathan Banks", "wikipedia": "https://en.wikipedia.org/wiki/Jonathan_Banks" },
                { "nombre": "Patrick Fabian", "wikipedia": "https://en.wikipedia.org/wiki/Patrick_Fabian" },
                { "nombre": "Michael Mando", "wikipedia": "https://en.wikipedia.org/wiki/Michael_Mando" }
            ],
            "resumen": "Precuela de Breaking Bad que sigue la transformación de Jimmy McGill en el abogado Saul Goodman, explorando relaciones, familia y crimen.",
            "temporadas": [
                { "numero": 1, "capitulos": 10 },
                { "numero": 2, "capitulos": 10 },
                { "numero": 3, "capitulos": 10 },
                { "numero": 4, "capitulos": 10 },
                { "numero": 5, "capitulos": 10 },
                { "numero": 6, "capitulos": 13 }
            ]
        },
        {
            "titulo": "Ginny & Georgia",
            "id": 6,
            "tipo": "serie",
            "imagen": "./images/GIINYPORT.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/H2ZPt8LNrVs?si=YZoxJK_g8o2rz1d9'></iframe>",
            "genero": ["Drama", "Cine Romántico"],
            "actores": [
                { "nombre": "Brianne Howey", "wikipedia": "https://en.wikipedia.org/wiki/Brianne_Howey" },
                { "nombre": "Antonia Gentry", "wikipedia": "https://en.wikipedia.org/wiki/Antonia_Gentry" },
                { "nombre": "Felix Mallard", "wikipedia": "https://en.wikipedia.org/wiki/Felix_Mallard" },
                { "nombre": "Diesel La Torraca", "wikipedia": "https://en.wikipedia.org/wiki/Diesel_La_Torraca" },
                { "nombre": "Sara Waisglass", "wikipedia": "https://en.wikipedia.org/wiki/Sara_Waisglass" },
                { "nombre": "Jennifer Robertson", "wikipedia": "https://en.wikipedia.org/wiki/Jennifer_Robertson" },
                { "nombre": "Scott Porter", "wikipedia": "https://en.wikipedia.org/wiki/Scott_Porter" },
                { "nombre": "Raymond Ablack", "wikipedia": "https://en.wikipedia.org/wiki/Raymond_Ablack" }
            ],
            "resumen": "Ginny, una adolescente de 15 años, navega por la vida con su madre Georgia, una mujer de 30 años que ha tenido una vida complicada. Juntas enfrentan los desafíos de la familia, el amor y la amistad.",
            "temporadas": [
                { "numero": 1, "capitulos": 10 },
                { "numero": 2, "capitulos": 10 },
                { "numero": 3, "capitulos": 10 },
            ]
        },
        {
            "titulo": "Atrapados",
            "id": 7,
            "tipo": "serie",
            "imagen": "./images/atrapad.webp",
            "iframe": "<iframe src='https://www.youtube.com/embed/qFRyYnmZCk8?si=iLh9EM5gKUYpkFni'></iframe>",
            "genero": ["Suspenso", "Thriller"],
            "actores": [
                { "nombre": "Soledad Villamil", "wikipedia": "https://es.wikipedia.org/wiki/Soledad_Villamil" },
                { "nombre": "Alberto Ammann", "wikipedia": "https://es.wikipedia.org/wiki/Alberto_Ammann" },
                { "nombre": "Juan Minujín", "wikipedia": "https://es.wikipedia.org/wiki/Juan_Minuj%C3%ADn" },
                { "nombre": "Matías Recalt", "wikipedia": "https://es.wikipedia.org/wiki/Mat%C3%ADas_Recalt" },
                { "nombre": "Carmela Rivero", "wikipedia": "https://es.wikipedia.org/wiki/Carmela_Rivero" },
                { "nombre": "Mike Amigorena", "wikipedia": "https://es.wikipedia.org/wiki/Mike_Amigorena" },
                { "nombre": "Fernán Mirás", "wikipedia": "https://es.wikipedia.org/wiki/Fern%C3%A1n_Mir%C3%A1s" }
            ],
            "resumen": "Un grupo de policías investiga un caso de desaparición en un pueblo remoto de la Patagonia argentina, enfrentándose a secretos oscuros y tensiones locales.",
            "temporadas": [
                { "numero": 1, "capitulos": 6 }
            ]
        },
        {
            "titulo": "Stranger Things",
            "id": 8,
            "tipo": "serie",
            "imagen": "./images/stranger.jpg",
            "iframe": "<iframe src='https://www.youtube.com/embed/FY1-YF0VqIM?si=x6c8IITM5VgzAur-'></iframe>",
            "genero": ["Aventura", "Cine de Terror", "Ciencia Ficción"],
            "actores": [
                { "nombre": "Winona Ryder", "wikipedia": "https://en.wikipedia.org/wiki/Winona_Ryder" },
                { "nombre": "David Harbour", "wikipedia": "https://en.wikipedia.org/wiki/David_Harbour" },
                { "nombre": "Finn Wolfhard", "wikipedia": "https://en.wikipedia.org/wiki/Finn_Wolfhard" },
                { "nombre": "Millie Bobby Brown", "wikipedia": "https://en.wikipedia.org/wiki/Millie_Bobby_Brown" },
                { "nombre": "Gaten Matarazzo", "wikipedia": "https://en.wikipedia.org/wiki/Gaten_Matarazzo" },
                { "nombre": "Caleb McLaughlin", "wikipedia": "https://en.wikipedia.org/wiki/Caleb_McLaughlin" },
                { "nombre": "Natalia Dyer", "wikipedia": "https://en.wikipedia.org/wiki/Natalia_Dyer" },
                { "nombre": "Charlie Heaton", "wikipedia": "https://en.wikipedia.org/wiki/Charlie_Heaton" },
                { "nombre": "Cara Buono", "wikipedia": "https://en.wikipedia.org/wiki/Cara_Buono" },
                { "nombre": "Matthew Modine", "wikipedia": "https://en.wikipedia.org/wiki/Matthew_Modine" },
                { "nombre": "Noah Schnapp", "wikipedia": "https://en.wikipedia.org/wiki/Noah_Schnapp" },
                { "nombre": "Joe Keery", "wikipedia": "https://en.wikipedia.org/wiki/Joe_Keery" },
                { "nombre": "Sadie Sink", "wikipedia": "https://en.wikipedia.org/wiki/Sadie_Sink" },
                { "nombre": "Dacre Montgomery", "wikipedia": "https://en.wikipedia.org/wiki/Dacre_Montgomery" },
                { "nombre": "Sean Astin", "wikipedia": "https://en.wikipedia.org/wiki/Sean_Astin" },
                { "nombre": "Paul Reiser", "wikipedia": "https://en.wikipedia.org/wiki/Paul_Reiser" }
            ],
            "resumen": "En la década de 1980, un grupo de niños en un pueblo de Indiana enfrenta fenómenos sobrenaturales y experimentos secretos del gobierno mientras buscan a su amigo desaparecido.",
            "temporadas": [
                { "numero": 1, "capitulos": 8 },
                { "numero": 2, "capitulos": 9 },
                { "numero": 3, "capitulos": 8 },
                { "numero": 4, "capitulos": 9 }
            ]
        }
    ]
};