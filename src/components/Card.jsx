function Card({id, name, imageUrl, onClick}){
    return (
        <div className="card" onClick={() => onClick(id)}>
            <img src={imageUrl} alt={name} />
            <p>{name}</p>
        </div>
    );
}

export default Card;