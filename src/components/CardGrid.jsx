import Card from "./Card";

function CardGrid({cards, onCardClick}){
    return (
        <div className="card-grid">
            {cards.map((card) => {
                <Card
                key={card.id}
                id={card.id}
                name={card.name}
                imageUrl={card.imageUrl}
                onClick={onCardClick}
                />
            })}
        </div>
    )
}

export default CardGrid;