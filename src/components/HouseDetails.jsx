export const HouseDetails = ({house}) => {
    return <>
        <div className="p-4 bg-slate-800 rounded">
            <h2>Nom: {house.name}</h2>
            <p>Taille: {house.size}</p>
            {
                house.owner ? <div>
                    <p>Propriétaire: {house.owner.firstName} {house.owner.lastName}</p>
                    <p>Contact: {house.owner.email}</p>
                </div>
                : <p>Pas de propriétaire</p>
            }
        </div>
    </>
}