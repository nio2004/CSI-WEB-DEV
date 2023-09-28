import { useState } from 'react'
import Card from './Card'

function Cards(){
    const [items, setItems] = useState([
        { id: 1, img: '/img/trevor.png', stat: "" },
        { id: 1, img: '/img/trevor.png', stat: "" },
        { id: 2, img: 'img/assassin_creed.png', stat: "" },
        { id: 2, img: 'img/assassin_creed.png', stat: "" },
        { id: 3, img: '/img/gta4.png', stat: "" },
        { id: 3, img: '/img/gta4.png', stat: "" },
        { id: 4, img: '/img/watch_dogs.png', stat: "" },
        { id: 4, img: '/img/watch_dogs.png', stat: "" },
        { id: 5, img: '/img/clash_royal.png', stat: "" },
        { id: 5, img: '/img/clash_royal.png', stat: "" },
        { id: 6, img: '/img/god-of-war-ragnarok-kratos.png', stat: "" },
        { id: 6, img: '/img/god-of-war-ragnarok-kratos.png', stat: "" },
        { id: 7, img: '/img/cyberpunk.png', stat: "" },
        { id: 7, img: '/img/cyberpunk.png', stat: "" },
        { id: 8, img: '/img/cyberpunk-2.png', stat: "" },
        { id: 8, img: '/img/cyberpunk-2.png', stat: "" }
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1)

    function check(current){
        if(items[current].id === items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 1000)
        }
    }

    function handleClick(id){
        if(prev === -1){
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }

    return (
        <div className="container">
            { items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            )) }
        </div>
    )
}

export default Cards