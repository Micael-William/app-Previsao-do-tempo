const botao = document.getElementById('botao')
const campoCidade = document.getElementById('cidade')
const temperaturaMaxima = document.getElementById('temperatura-maxima')
const temperaturaMinima = document.getElementById('temperatura-minima')
const logoClima = document.getElementById('logo-temperatura')
const descricaoCidade = document.getElementById('descricao-cidade')
const umidadeTempo = document.getElementById('umidade')
const descricaoTemperatura = document.getElementById('temperatura')

botao.addEventListener('click', campoBuscaCidade)



async function campoBuscaCidade () {
    
    const cidade = campoCidade.value

    const chave = '9c7067bdfe6ec29dd648ff4e22584141'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chave}&lang=pt_br`
    const busca = await fetch(url)
    .then(resposta => resposta)
    .then(dados => dados.json())
    .finally(final => final)

    
    const imagem_temperatura = `http://openweathermap.org/img/wn/${busca.weather[0].icon}.png`
    const descricao_temperatura = `${busca.weather[0].description}`
    const nome_da_cidade = busca.name
    const temperatura_minima = ` Temperatura minima ${Math.floor(busca.main.temp_min)} °c`
    const temperatura_maxima = ` Temperatura máxima ${Math.floor(busca.main.temp_max)} °c`
    const umidade = ` Umidade ${busca.main.humidity} %`
    const temperatura = `${busca.main.temp} °c`


    
    logoClima.src = imagem_temperatura
    descricaoTemperatura.innerText = temperatura
    descricaoCidade.innerText = nome_da_cidade
    temperaturaMaxima.innerText = temperatura_maxima
    temperaturaMinima.innerText = temperatura_minima
    umidadeTempo.innerText = umidade
    descricaoTemperatura.innerText = descricao_temperatura

    if (cidade) {
        campoCidade.value = ''
    }

    console.log(busca)
}
