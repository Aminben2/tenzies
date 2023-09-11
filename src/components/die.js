export default function Die(props) {
    return (
        <div onClick={props.holdDice} className={props.isHeld ? "die die-held" : "die"}>
            <h1>{props.value}</h1>
        </div>
    )
}