$(document).ready(() => {
    let imagem = null;
    let descricao = null;
    let nome = null;
    let descricaoUmidade = null;
    let descricaoTemperatura = null;
    let descricaoTemperaturaMinima = null;
    let descricaoTemperaturaMaxima = null;
    let verificarCampo = $('#cidade').val();
    
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    function esconderElemento(){
        if(verificarCampo == ''){
           $('.secao-tempo').addClass('esconder-secao-tempo')
           $('.secao-descricao').addClass('esconder-secao-descricao')
        }
    }

    esconderElemento();
    
    function verificarTemperatura(evento){
        evento.preventDefault();
        let campoCidade = $('#cidade').val()

        if(campoCidade != ""){
            $('.secao-tempo').removeClass('esconder-secao-tempo')
            $('.secao-descricao').removeClass('esconder-secao-descricao')
            $('.container-campos').css('height','55vh')
            
            const chave = '9c7067bdfe6ec29dd648ff4e22584141'
            
            $.get('http://api.openweathermap.org/data/2.5/weather?q=' + campoCidade + '&units=metric&appid=' + chave + '&lang=pt_br', (data) => {
                const imagemTemperatura = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
                const legenda = data.weather[0].description
                const cidade = data.name
                const umidade = data.main.humidity
                const temperatura = data.main.temp
                const temperaturaMinima = Math.floor(data.main.temp_min)
                const temperaturaMaxima = Math.floor(data.main.temp_max)
                const graus = data.main.temp + '°C';

                imagem = imagemTemperatura;
                descricao = legenda;
                nome =  '<i class="bi bi-geo-alt-fill"></i>' + cidade +', ' + data.sys.country;
                descricaoUmidade = umidade;
                descricaoTemperatura = temperatura;
                descricaoTemperaturaMinima = '<i class="bi bi-thermometer-snow temp-minima"></i>' + temperaturaMinima + '°C';
                descricaoTemperaturaMaxima = '<i class="bi bi-thermometer-sun temp-maxima"></i>' + temperaturaMaxima + '°C';
    
                console.log(data)

                if(descricao == "céu limpo")
                {
                    $('#logo-temperatura').attr('src',imagem);
                }
                else if (descricao == "algumas nuvens")
                {
                    $('#logo-temperatura').attr('src', '/assets/img/01d.png'); 
                }
                else 
                {
                    $('#logo-temperatura').attr('src', '/assets/img/01d.png'); 
                }
        
                $('#graus').html(graus)
                $('#descricao-cidade').html(nome);
                $('.descricao-data').html(dataFormatada)
                $('#temperatura').html(descricao);
                $('#umidade').html(descricaoUmidade);
                $('#temperatura-minima').html(descricaoTemperaturaMinima);
                $('#temperatura-maxima').html(descricaoTemperaturaMaxima);

                $('#cidade').val('')
            })
        } else {
            return alert("Você precisa digitar uma cidade.");
        }
    }

    $('form').submit(verificarTemperatura)
})
