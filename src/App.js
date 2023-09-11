import React from "react"
import "./App.css"
import Die from "./components/die"
import { nanoid } from "nanoid"




export default function App() {
    let [dice, setDice] = React.useState(allMewDice())
    let [tenzies, setTenzies] = React.useState(false)
    let [start, setStart] = React.useState(false)
    let [rolls, setRolls] = React.useState(0)

    React.useEffect(() => {
        let allHeld = dice.every((ele) => {
            return ele.isHeld
        })
        let firstDice = dice[0].value
        let allSameValue = dice.every((ele) => {
            return ele.value === firstDice
        })
        if (allHeld && allSameValue) setTenzies(true)
    }, [dice])



    function allMewDice() {
        const newArray = []
        for (let index = 0; index < 10; index++) {
            newArray.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return newArray
    }



    function roll() {
        if (!tenzies) {
            setDice((preDice => {
                return preDice.map(dice => {
                    return dice.isHeld ? dice : {
                        id: nanoid(),
                        value: Math.ceil(Math.random() * 6),
                        isHeld: false
                    }
                })
            }))
            if (start) {
                setRolls((preRolls) => {
                    return preRolls + 1
                })
            }
        } else {
            setTenzies(false)
            setDice(allMewDice())
            setRolls(0)
        }
    }
    function holdDice(id) {
        setDice((preDice => {
            return preDice.map(dice => {
                return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
            })
        }))
    }

    function startGame() {
        setStart(true)
        setDice(allMewDice())
    }
    function exit() {
        setStart(false)
        setTenzies(false)
    }




    let dices = dice.map((item) => <Die
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        holdDice={() => holdDice(item.id)}
    />)

    return (
        <div className="app">
            {tenzies && <div className="win">You Won !</div>}
            <main>
                <div className="title">
                    <h1>Tenzies</h1>
                    <h3>Roll until all dice are the same.Click each die to freeze it at it's current value between rolls </h3>
                </div>

                {!start ?
                    <button onClick={startGame} className="start">Start game</button>
                    :
                    <div className="dice">
                        <h3 className="rolls">Number of Rolls: {rolls}</h3>
                        <div className="die-con">
                            {dices}
                        </div>
                        <div className="controls">
                            {tenzies ? <button onClick={exit} className="exit">Exit</button> : null}
                            <button
                                className="roll"
                                onClick={roll}
                            >
                                {tenzies ? "New game" : "Roll"}
                            </button>
                        </div>
                    </div>
                }
            </main>

        </div>
    )
}
