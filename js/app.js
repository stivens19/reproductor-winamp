    const playlist=document.getElementById('playlist');
    const controls=document.getElementById('controls');
    const nameMusic=document.getElementById('name-music');
    //Botones
    const btnplay=document.getElementById('play');
    const btnpause=document.getElementById('pause');
    const btnstop=document.getElementById('stop');

    const btnDesplegar=document.getElementById('desplegar');
    const btnDesplegarRem=document.getElementById('desplegar-rem');
    btnDesplegar.addEventListener('click',desplegarControles);
    btnDesplegarRem.addEventListener('click',desplegarControlesRem)
    var estador=0;
    function desplegarControlesRem() {
        const controlesFileRem=document.getElementById('controlesFileRem');
        if (estador===0) {
            controlesFileRem.classList.remove('sin-desplegar');
            controlesFileRem.classList.add('.controles-files-desplegable');
            estador=1;
        }else if(estador===1){
            controlesFileRem.classList.remove('.controles-files-desplegable');
            controlesFileRem.classList.add('sin-desplegar');
            estador=0;
        }
    }
    var  estado=0;
    function desplegarControles() {
        const controlesFile=document.getElementById('controlesFile');
        if (estado===0) {
            controlesFile.classList.remove('sin-desplegar');
            controlesFile.classList.add('.controles-files-desplegable');
            estado=1;
        }else if(estado===1){
            controlesFile.classList.remove('.controles-files-desplegable');
            controlesFile.classList.add('sin-desplegar');
            estado=0;
        }
    }

    document.addEventListener('DOMContentLoaded',cargarMusica)
    function cargarMusica() {
        fetch('assets/musicJSON/rock.json')
                .then(function(res) {
                    return res.json();
                })
                .then(function (data) {
                    let html='';
                    data.forEach(music => {
                        html+=`<li class="music" id="music">
                        <input type="text" value="${music.url}" style="display:none">
                        <input type="text" value="${music.nombre}" style="display:none">
                        <input type="text" value="${music.artista}" style="display:none">
                        <a href="#" class="music-enlace">${music.nombre}-${music.artista}</a>
                    </li>`;
                        playlist.innerHTML=html;
                    });
                    
                })
                .catch(function (error) {
                    console.log(error)
                })
    }
    
    playlist.addEventListener('dblclick',reproducirMusica);

    function reproducirMusica(e) {
        if (e.target.classList.contains('music-enlace')) {
            let urlM=e.target.parentElement.children[0].value;
            let nombreM=e.target.parentElement.children[1].value;
            let nombreA=e.target.parentElement.children[2].value;
            controls.innerHTML=`<audio src="${urlM}" autoplay><input type="text" value="${urlM}" style="display:none"></audio>`;
            nameMusic.innerHTML=`${nombreM}--${nombreA}`
            siguienteAutomatico()
            musicaTocando();
            exitoReproduce();
        }
        
    }

    function musicaTocando(){
        let cantmusic=playlist.children.length;
        let musicAudio=controls.children[0].children[0].value;
        for (let i = 0; i < cantmusic; i++) {
            let valueMusica=playlist.children[i].children[0].value;
            playlist.children[i].classList.remove('color-tocando')
            playlist.children[i].classList.remove('color-seleccionado')
            if (musicAudio===valueMusica) {
                let musica = playlist.children[i];
                musica.classList.add('color-tocando');
            }
            
            
        }
    }

    btnpause.addEventListener('click',pausarMusica);
    btnplay.addEventListener('click',playMusica);
    btnstop.addEventListener('click',stopMusica);
    function pausarMusica() {
        let audioMusica=controls.children[0];
        audioMusica.pause();
    }
    function playMusica() {
        let audioMusica=controls.children[0];
        audioMusica.play();
    }
    function stopMusica() {
        let audioMusica=controls.children[0];
        audioMusica.pause();
        audioMusica.currentTime=0;
    }

    //para siguiente y atras
    const botonesControl=document.getElementById('botones-control');
    botonesControl.addEventListener('click',controlar);

    function controlar(e) {
        let audioMusica=controls.children[0].children[0];
        let audioUrl=audioMusica.value;
    // console.log(audioMusica);
        //console.log(playlist.children);
        //console.log(audioMusica);
        let musicArray=Array.from(playlist.children);
        
        if (e.target.classList.contains('btn-next')) {
            //console.log(musicArray);
            musicArray.forEach(limusic => {
            // console.log(limusic.children[0].value);
                if (limusic.children[0].value===audioUrl) {
                    let siguienteMusica=limusic.nextSibling.children[0].value;
                    let nombreMusic=limusic.nextSibling.children[1].value;
                    let nombreArtista=limusic.nextSibling.children[2].value;
                    
                    siguienteAtras(siguienteMusica,nombreMusic,nombreArtista);
                }
            
            });
        } else if(e.target.classList.contains('btn-back')){
            musicArray.forEach(limusic => {
                if (limusic.children[0].value===audioUrl) {
                    let previaMusica=limusic.previousElementSibling.children[0].value;
                    let nombreMusic=limusic.previousElementSibling.children[1].value;
                    let nombreArtista=limusic.previousElementSibling.children[2].value;
                    
                    siguienteAtras(previaMusica,nombreMusic,nombreArtista)
                }
                
            });
        }

    }
    function siguienteAtras(musica,nombremusica,artista){
        controls.innerHTML=`<audio src="${musica}" autoplay><input type="text" value="${musica}" style="display:none"></audio>`;
        nameMusic.innerHTML=`${nombremusica}--${artista}`
        siguienteAutomatico()
        musicaTocando();
        exitoReproduce();
        
    }

    function siguienteAutomatico(){
        let audioEtiqueta=controls.children[0];
        
        audioEtiqueta.addEventListener('ended',()=>{
            let audioUrl=audioEtiqueta.children[0].value;
            //console.log(audioUrl);
            let musicArray=Array.from(playlist.children);
            musicArray.forEach(limusic => {
                if (limusic.children[0].value===audioUrl) {
                    let siguienteMusica=limusic.nextSibling.children[0].value;
                    let nombreMusic=limusic.nextSibling.children[1].value;
                    let nombreArtista=limusic.nextSibling.children[2].value;
                    
                    siguienteAtras(siguienteMusica,nombreMusic,nombreArtista);
                    //exitoReproduce()
                }
            });
        });
    
    }

    //volumen
    const volumen=document.getElementById('volumen');
    volumen.addEventListener("change",function(ev){
        let audioEtiqueta=controls.children[0];
        audioEtiqueta.volume=ev.currentTarget.value;
    },true);


    const inputFile=document.getElementById('files');
    inputFile.addEventListener('change', cargaListaMusicaFile);

    const inputFile2=document.getElementById('files2');
    inputFile2.addEventListener('change', cargaListaMusicaFile);
    //Para subida de musica
    function cargaListaMusicaFile(evt) {
        let files = evt.target.files; 
        if(evt.target.id==='files'){
            playlist.innerHTML='';
        }
        
        for (let i = 0, f; f = files[i]; i++) {

        let reader = new FileReader();

        reader.onload = (function(elFile) {
            return function(e) {
            var li = document.createElement('li');
            li.className='music';
            li.id='music';
            li.innerHTML=`
                        <input type="text" value="${e.target.result}" style="display:none">
                        <input type="text" value="${elFile.name}" style="display:none">
                        <input type="text" value="cargado local" style="display:none">
                        <a href="#" class="music-enlace">${elFile.name}-cargado local</a>
            `;

                playlist.appendChild(li);
            };
        })(f);
            reader.readAsDataURL(f);
        }
        }

        const btnRemoverTodo=document.getElementById('rem-all');
        btnRemoverTodo.addEventListener('click',borrarTodo)
        function borrarTodo() {
            let num=playlist.children.length*1;
            let rpt=confirm('Esta seguro de eliminar todas las canciones?');
            if (rpt == true) {
                playlist.innerHTML='';
            }
            
    }

    const filedir=document.getElementById("files-dir")
    filedir.addEventListener("change",cargaListaMusicaFile);

    playlist.addEventListener('click',seleccionarBorrar);
    let estadom=0;
    function seleccionarBorrar(e){
        
        let musics =playlist.children.length;
        let element=e.target.parentElement;
        if(e.target.parentElement.classList.contains('music')){
            if (estadom===0) {
                for (let i = 0; i < musics; i++) {
                    if (playlist.children[i].id==='borrar') {
                        playlist.children[i].classList.remove('color-seleccionado')
                        playlist.children[i].id='';
                    }
                    
                }
                element.id='borrar';
                element.classList.add('color-seleccionado');

                estadom=1;
            }else if(estadom===1){
                for (let i = 0; i < musics; i++) {
                    if (playlist.children[i].id==='borrar') {
                        playlist.children[i].classList.remove('color-seleccionado')
                        playlist.children[i].id='';
                    }
                    
                }
                element.id='borrar';
                element.classList.add('color-seleccionado');
                estadom=0;
            }
        }

    }

    const btnBorrarMusica=document.getElementById('rem-music');

    btnBorrarMusica.addEventListener('click',borrarMusicaSeleccionada);

    function borrarMusicaSeleccionada() {
        let musics =playlist.children.length;
        for (let i = 0; i < musics; i++) {
            if (playlist.children[i].id==='borrar') {
                let rpt=confirm(`Esta seguro de borrar la cancion ${playlist.children[i].children[1].value}`);
                if (rpt===true) {
                    playlist.removeChild(playlist.children[i]);
                }
                
            }
            
        }
    }

    function exitoReproduce() {
        const tiempo=document.getElementById('tiemporecorrer');
        tiempo.value=0;
        let musicar=controls.children[0];
        musicar.currentTime=0;
        tiempo.addEventListener("change",function(ev){
            let audioEtiqueta=controls.children[0];
            audioEtiqueta.currentTime=ev.currentTarget.value;
        },true);

        window.addEventListener('load',reproduciendoM);
        function reproduciendoM() {
            tiempo.max = musicar.duration;
            tiempo.value = musicar.currentTime;
        }
        musicar.ontimeupdate = function(){
            const crono=document.getElementById('crono');
            tiempo.max = musicar.duration;
            tiempo.value = musicar.currentTime;
            let tiempoCrono=Math.round(musicar.currentTime)*1;
            if (tiempoCrono>=60) {
                let minuto=Math.round(tiempoCrono/60);
                let segundo=tiempoCrono%60;
                crono.innerHTML=`${minuto}:${segundo}`;
            }else{
                crono.innerHTML=`00:${tiempoCrono}`;
            }
        }
    }

