window.onload = () => {
    let baseUrl = 'http://localhost:3031/api/movies/'

    let query = new URLSearchParams(location.search);

    if (query.has('idPelicula')) {
        /* Edito pelicula */
        let pelicula = query.get('idPelicula')


        document.querySelector("#agregarPelicula").style.display = "none"

        //Traigo los datos de la API
        fetch(baseUrl + pelicula)
            .then(res => res.json())
            .then(peli => {
                document.getElementById('title').value = peli.data.title
                document.getElementById('rating').value = parseFloat(peli.data.rating)
                document.getElementById('awards').value = parseInt(peli.data.awards)
                document.getElementById('release_date').value = moment(peli.data.release_date).format('YYYY-MM-DD')
                document.getElementById('length').value = parseInt(peli.data.length)
                document.getElementById('genre_id').value = parseInt(peli.data.genre_id)
            })

        document.getElementById("editarPelicula").addEventListener("click", function (e) {
            e.preventDefault()
            let form = {
                title: document.getElementById("title").value,
                rating: document.getElementById("rating").value,
                awards: document.getElementById("awards").value,
                release_date: document.getElementById("release_date").value,
                length: document.getElementById("length").value,
                genre_id: document.getElementById('genre_id').value
            }
            //Guardo los datos
            fetch(`${baseUrl}update/${idPelicula}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)

            }).then(res => res.json()).then(respuesta => {
                console.log(respuesta)
                alert('¡Pelicula guardada!')
            })

        })


        document.getElementById("borrarPelicula").addEventListener("click", function (e) {
            e.preventDefault()
            if (confirm('¿Está seguro que quiere borrar esta película?')) {
                //Borro la pelicula
                fetch(`${baseUrl}delete/${idPelicula}`, {
                    method: "DELETE"
                }).then(res => res.json()).then(respuesta => {
                    console.log(respuesta)
                    alert('¡Pelicula borrada!')
                })
            }
        })

    } else {
        //Crear pelicula
        document.querySelector("#editarPelicula").style.display = "none"
        document.querySelector("#borrarPelicula").style.display = "none"
        document.getElementById("agregarPelicula").addEventListener("click", function (e) {
            e.preventDefault();

            let form = {
                title: document.getElementById("title").value,
                rating: document.getElementById("rating").value,
                awards: document.getElementById("awards").value,
                release_date: document.getElementById("release_date").value,
                length: document.getElementById("length").value,
                genre_id: 5
            }
            //Creo la pelicula y la guardo
            fetch(`${baseUrl}create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)

            }).then(res => res.json()).then(() => {

                alert('¡La película fue creada!')
            })
        })

    }


}