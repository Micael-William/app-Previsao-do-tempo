const form = document.querySelector('.formulario')

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const cidade = evento.target['busca_cidade'].value

    buscaCidade(cidade)

})


const nomeCidade = document.querySelector('.cidade')
const temperatura = document.querySelector('.temperatura')
const umidade = document.querySelector('.umidade')
const descricao = document.querySelector('.descricao')
const imagemDescricao = document.querySelector('.img')
const velocidadeVento = document.querySelector('.vento')
const tempoAtual = document.querySelector('.tempo')



async function buscaCidade(cidade){
    const chave = '9c7067bdfe6ec29dd648ff4e22584141'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chave}&lang=pt_br`
    const busca = await fetch(url)
    .then(resposta => resposta)
    .then(dados => dados.json())

    nomeCidade.innerText = `Tempo em ${busca.name}`
    
    temperatura.innerText =  Math.floor(` ${busca.main.temp}`) + '°C'

    umidade.innerText = `Umidade ${busca.main.humidity}%`

    descricao.innerText = `${busca.weather[0].description}`

    imagemDescricao.src = `https://openweathermap.org/img/wn/${busca.weather[0].icon}.png`
    
    console.log(busca)
}




