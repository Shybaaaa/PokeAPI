// https://pokeapi.co/api/v2/
const API_URL = 'https://pokeapi.co/api/v2/pokemon/?lang=5&offset=0&limit=1302'
const resultUl = document.getElementById('result')

function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}
function strUcFirst(a) {
    return (a+'').charAt(0).toUpperCase() + (a+'').substr(1);
}

function fetchAPI() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const { results } = data
            results.forEach(pokemon => {
                // console.log(pokemon.name)
                const item = document.createElement('a')
                item.classList.add('p-4', 'w-10/12', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md', 'm-4')
                const url = pokemon.url
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const { types, sprites } = data
                        item.href = `pokemon.html?id=${data.id}`
                        const newElement = document.createElement('p')
                        newElement.innerText = `${pokemon.name} - #${data.id}`
                        newElement.classList.add('text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900')
                        item.appendChild(newElement)
                        const div = document.createElement('div')
                        div.classList.add('aspect-h-1/2', 'aspect-w-1/2', 'overflow-hidden', 'rounded-md', 'bg-gray-100/50', 'lg:aspect-none', 'group-hover:opacity-75', 'lg:h-80')
                        const img = document.createElement('img')
                        img.src = sprites.front_default ? sprites.front_default : 'https://via.placeholder.com/150'
                        img.classList.add('h-auto', 'w-[90%]', 'object-cover', 'object-center', 'lg:h-[90%]', 'lg:w-[90%]')
                        div.appendChild(img)
                        item.appendChild(div)
                        types.map(type => {
                            const li = document.createElement('li')
                            li.innerText = `${type.type.name}`
                            li.classList.add('text-sm', 'text-gray-500', 'font-medium', 'tracking-tight')
                            item.appendChild(li)
                        })
                    })
                    .catch(error => console.error(error))
                // item.innerText = pokemon.name
                resultUl.appendChild(item)
            })
        })
        .catch(error => console.error(error))
}

function loadPokemon(id)
{
    const pokeName = document.getElementById('pokeName')
    const pokeType = document.getElementById('pokeType')
    const pokeSprite = document.getElementById('pokeSprite')
    const pokeAbilities = document.getElementById('pokeStats')
    const card = document.getElementById('card')

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            const { types, sprites, abilities } = data

            fetch(data.species.url) // Permet
                .then(response => response.json())
                .then(data => {
                    pokeName.innerText = data.names[4].name
                    card.classList.add(`bg-${data.color.name}-200`)
                })

            types.map(type => {
                const p = document.createElement('p')

                fetch(type.type.url)
                    .then(response => response.json())
                    .then(data => {
                        p.innerText = data.names[3].name
                    })
                pokeType.appendChild(p)
            })
            pokeSprite.src = sprites.front_default ? sprites.front_default : 'https://via.placeholder.com/150'

            abilities.map(ability => {
                const div = document.createElement('div')
                const p = document.createElement('p')
                const dps = document.createElement('p')

                fetch(ability.ability.url)
                    .then(response => response.json())
                    .then(data => {
                        p.innerText = data.names[3].name
                    })

                dps.innerText = `??? DPS`
                div.appendChild(p)
                div.appendChild(dps)
                pokeAbilities.appendChild(div).className = 'flex justify-between mx-3'
            })

        })
        .catch(error => console.error(error))
}